# AI SPEC — Bản tin Discord ưu tiên câu hỏi tồn · Nhóm PERFECTIONISM · Track B2

Hướng: [ ] A — VLearn  [x] B — Trợ lý Học viên  [ ] C — Làn mở
Loại: [x] Tối ưu tính năng có sẵn  [ ] Tính năng mới

## §1. User & Job

- **Job executor + workflow:** Cuối ngày, TA/Mod mở bản tin, đọc danh sách câu hỏi còn cần người xử lý, ưu tiên mục có ảnh hưởng lớn, rồi trả lời trong Discord.
- **Core JTBD:** Khi nhiều tin nhắn trôi nhanh, TA muốn biết câu hỏi nào còn tồn và nên xử lý trước, để không phải đọc lại toàn bộ kênh.
- **Problem statement:** Câu hỏi học viên dễ bị trôi giữa thông báo, trao đổi và phản hồi bot. TA mất thời gian lọc; một câu hỏi chưa được giải quyết có thể bị hiểu nhầm là xong.
- **Evidence:**
  - Survey ẩn danh `n=12`, file gốc giữ local, số liệu tổng hợp trong [canvas.md](canvas.md): `12/12` gặp tình trạng câu hỏi bị trôi; `9/12` mất từ 1 giờ trở lên; `9/12` phải nhắn lại hoặc DM; `8/12` thấy bot trả lời dài/lan man.
  - Data pack có `1.092` tin nhắn, gồm `779` tin người dùng, `313` tin bot và `307` tin mention bot. Log baseline có lỗi tóm tắt cắt cụt, chèn nguồn giữa từ và trạng thái phản hồi chưa được kiểm chứng. Xem [canvas.md](canvas.md).
  - Năm ví dụ đã ẩn danh, có thể truy lại qua case trong [eval/golden-set.json](eval/golden-set.json): `CASE-03` lỗi CUDA vẫn xảy ra sau khi giảm batch size; `CASE-05` hỏi hạn nộp trong ngày; `CASE-09` mất kết nối GPU; `CASE-15` bot đã trả lời nhưng người học vẫn kẹt; `CASE-17` kẹt lab hơn 5 giờ. Các câu này đều cần TA xem, không tự trả lời thay TA.

## §2. Impact & quyết định chọn

| Ứng viên | Bằng chứng nhu cầu | Tần suất / chi phí mỗi lần | Khả thi trong hackathon | Quyết định |
|---|---|---|---|---|
| Bản tin ưu tiên câu hỏi tồn cho TA | `12/12` gặp tin bị trôi; `9/12` mất ≥1 giờ | Xảy ra ít nhất hằng tuần với toàn bộ mẫu; TA phải đọc lại kênh | Cao: dùng batch tin nhắn và người duyệt cuối | **Chọn** |
| Bot trả lời trực tiếp mọi câu hỏi | `8/12` đã thấy bot dài/lan man | Trả lời sai có thể làm người học làm sai hoặc tin nhầm | Thấp: thiếu nguồn chuẩn và rủi ro cao | Loại |
| Tra cứu trạng thái cá nhân | Có nhu cầu nhưng chưa có bằng chứng định lượng riêng | Rủi ro lộ dữ liệu, phân quyền phức tạp | Thấp | Loại |

- **Ứng viên đã loại:** Bot trả lời trực tiếp bị loại vì khảo sát đã chỉ ra vấn đề dài/lan man và MVP chưa có cơ chế kiểm chứng nguồn. Tra cứu trạng thái cá nhân bị loại vì cần quyền dữ liệu ngoài phạm vi.
- **Ứng viên chọn:** Bản tin ưu tiên câu hỏi tồn. Nó trực tiếp giảm bước lọc của TA, còn quyết định trả lời và xác nhận đã xử lý vẫn do người thật giữ.

## §3. Giải pháp tương tự đã nghiên cứu

- **Discord Forum Channels:** Forum tổ chức thảo luận thành post và tag để nội dung bớt bị chôn trong luồng chat. B2 học cách gom chủ đề, nhưng không thay Discord bằng forum; B2 chỉ lập danh sách việc cho TA từ luồng có sẵn. Nguồn: [Discord Support](https://support.discord.com/hc/en-us/articles/6208479917079-Forum-Channels-FAQ).
- **Slack AI:** Slack AI hỗ trợ tóm tắt hội thoại và daily recap, đồng thời cho phép quay về chi tiết hội thoại. B2 học nguyên tắc tóm tắt phải truy được ngữ cảnh, nhưng đầu ra của B2 là triage cho TA chứ không phải bản tóm tắt chung. Nguồn: [Slack Help](https://slack.com/help/articles/25076892548883-Guide-to-AI-features-in-Slack).

## §4. Thiết kế

- **Lát cắt một câu:** Một TA mở bản tin cuối ngày, AI phân loại và xếp mức ưu tiên cho các câu hỏi tồn, để TA có danh sách ngắn cần xử lý trước.
- **Non-goals:**
  1. Không tự gửi DM, tag hoặc trả lời thay TA.
  2. Không kết luận một câu đã giải quyết chỉ vì có bot hoặc người khác reply.
  3. Không lưu hay công khai tên học viên trong artifact nộp bài.
  4. Không kết nối Discord production trong MVP.
- **Mức prototype:** [ ] Sketch  [ ] Mock  [x] Working. `POST /api/demo-analyze` tự nạp batch từ Discord simulator ở backend, gọi Gemini thật và hiển thị danh sách. CSV chỉ là implementation detail của adapter local, TA không upload file. Discord production, xác thực và đồng bộ liên tục là mock/chưa làm.
- **Automation:** [ ] augment  [x] conditional  [ ] automate. AI chỉ đề xuất `cần xem / cần xác minh / không cần` và độ quan trọng; TA quyết định xử lý. Core gồm AI triage, policy rủi ro hẹp và verifier AI cho batch từ 2 tin trở lên. Cost of error: bỏ sót case khẩn có thể làm người học kẹt; gắn nhầm ưu tiên chỉ tốn thêm thời gian rà soát, nên mọi case chưa chắc được hiện để người thật quyết định.

### §4b. Nguyên tắc HAX/PAIR

| Nguyên tắc | Áp cụ thể vào prototype |
|---|---|
| HAX G2 — Make clear what the system can do | UI mô tả đầu ra chỉ là triage, không phải câu trả lời chính thức hay quyết định đã xử lý. |
| HAX G10 — Scope services when in doubt | `uncertain` không có độ quan trọng và yêu cầu TA xem lại thay vì đoán. |
| HAX G11 — Make clear why the system did what it did | Mỗi mục có lý do ngắn, nguồn kênh, thời gian và trace nội bộ (AI/policy/verifier) để TA rà lại ngữ cảnh. |
| HAX G8 — Support efficient correction | TA cập nhật trạng thái đã xem/đã xử lý và chạy lại batch; contract tách rõ trạng thái, ưu tiên, lý do. |
| PAIR 2.1 — Set expectations | Từ đầu flow nói rõ AI chỉ lọc danh sách, TA giữ quyết định cuối. |
| PAIR 5.1 — Interpret feedback carefully | Validation sẽ ghi hành vi, chỗ do dự và quote, không chỉ hỏi người dùng có thích hay không. |

## §5. Kiểu lỗi — bốn lớp chỗ khó và kịch bản

| Lớp khó | Case | Hành vi đúng cần thấy |
|---|---|---|
| Thiếu ngữ cảnh / không đủ căn cứ | CASE-11: “Cái này làm sao”; CASE-12: không mở được file nào | `cần xác minh`, không gán ưu tiên |
| Mơ hồ hoặc ngoài phạm vi | CASE-13: quy chế học bổng; CASE-14: hạn bảo vệ đồ án chưa rõ loại | `cần xác minh`, nêu cần hỏi lại |
| Bot đã reply nhưng người học vẫn kẹt | CASE-15: cài torch vẫn lỗi; CASE-16: reset key vẫn 401 | `cần xem`, ưu tiên cao để TA can thiệp |
| Khẩn cấp ảnh hưởng tiến độ / quy chế | CASE-17: kẹt lab >5 giờ; CASE-18: nộp muộn có bị trừ điểm | `cần xem`, ưu tiên cao |
| Hiếm và không thuộc công việc TA | CASE-19: prompt injection; CASE-20: xin quyền repo; CASE-21: phishing; CASE-22: poll ngoài lề | `không cần`, không đưa vào danh sách hành động |

Golden set có 22 case: 10 case phát triển từ chatlog, 8 case khó và 4 case hiếm. Chi tiết trong [eval/golden-set.json](eval/golden-set.json).

## §6. Bốn đường đi của trải nghiệm

- **Happy path:** Câu hỏi kỹ thuật hoặc deadline có đủ ngữ cảnh, AI gắn `cần xem`, mức ưu tiên phù hợp và lý do ngắn. Ví dụ `CASE-03`.
- **Low-confidence:** Tin thiếu file, nền tảng hoặc nghĩa của thuật ngữ, AI gắn `cần xác minh`; TA hỏi lại trước khi kết luận. Ví dụ `CASE-11` và `CASE-12`.
- **Failure / không căn cứ:** Input không phải yêu cầu học tập hoặc chứa injection, AI gắn `không cần`, không lộ prompt hay dữ liệu. Ví dụ `CASE-19`.
- **Correction:** TA cập nhật trạng thái đã xem/đã xử lý, hoặc chạy lại batch khi có tin mới; log runtime và trace giúp truy lỗi API/contract. CSV chỉ là adapter test nội bộ, không phải bước của TA.
- **Ngoài phạm vi:** Quy chế trường hoặc quyền repo không được trả lời thay bằng nội dung bịa; chuyển `cần xác minh` hoặc `không cần` theo ngữ cảnh. Ví dụ `CASE-13`, `CASE-20`.
- **Đặc thù domain:** Deadline, hạ tầng GPU, lỗi kỹ thuật và tình huống bot đã trả lời nhưng người học vẫn kẹt cần ưu tiên cao. Ví dụ `CASE-05`, `CASE-09`, `CASE-15`.

## §7. Kiểm thử

### Chiều chất lượng

| Chiều | Pass/fail có thể kiểm |
|---|---|
| Quyết định triage | Khớp `needs_attention` và `review_state` với nhãn kỳ vọng của case |
| Mức ưu tiên | Với mục cần xem, khớp `high/medium/low`; `uncertain` và `no_attention` phải `importance=null` |
| An toàn contract | Không API error; không case bị prefilter làm mất khỏi kết quả; injection/out-of-scope không thành câu hỏi ưu tiên |

- **Golden set:** 22 case cố định trong [eval/golden-set.json](eval/golden-set.json), gồm 10 case chatlog, 8 case khó và 4 case hiếm.
- **Quality bar, chốt tại CP4:** “Đạt khi **≥75%** case khớp đồng thời quyết định, trạng thái và mức ưu tiên, **0 API error** và **0 case bị prefilter làm mất**.” Bar này không thay đổi sau CP4.

| Lượt chạy | Kết quả nghiêm ngặt | Đối chiếu bar | Ghi chú |
|---|---:|---|---|
| Run-02 | 4/22, 18,2% | Không đạt | Baseline trước sửa prefilter/context |
| Run-04 | 16/22, 72,7% | **Chưa đạt, thiếu 1 case** | 0 API error, 0 case mất do prefilter |
| Run-05 | **21/22, 95,5%** | **Đạt** | 0 API error, 0 case mất do prefilter; chạy sau CP3 |

Run-04 là bằng chứng đã nộp CP3: đủ 22 case, có 6 case fail và chưa đạt bar. Sau CP3, Run-05 giữ nguyên golden set, comparator và quality bar, đạt 21/22; lỗi còn lại là CASE-15 được nhận đúng là cần xem nhưng bị hạ ưu tiên từ cao xuống vừa. Xem [eval/run-04-current.md](eval/run-04-current.md), [eval/run-05-current.md](eval/run-05-current.md) và [eval/failure-log-run-05.md](eval/failure-log-run-05.md). Không dùng Run-05 để ghi ngược số liệu CP3.

## §8. Phân công & kế hoạch

| Người | Phần chịu trách nhiệm tại CP4/CP5 |
|---|---|
| Văn Thành Huy | Technical decision, tích hợp AI/API, chạy end-to-end, demo và nộp |
| Nguyễn Đức Đông | Evidence, mining, kiểm tra golden set và failure log |
| Bùi Quốc Việt | Prototype/UI, flow demo 1 case chuẩn và 1 case khó |
| Lê Thị Duyên | Canvas/spec, impact, validation script và slide narrative |

- **Willing users:** Nguyễn Thị Lê Na, Phạm Đình Bảo Khôi, Nguyễn Hữu Thành đã được khai tại [canvas.md](canvas.md). Khi test, nhóm chỉ ghi vai trò/tên theo sự đồng ý của người thử.
- **Validation tối nay:** Mỗi người ngoài nhóm dùng thử 10 phút với task “tìm những câu cần TA xử lý trước trong bản tin”. Ghi hành động đầu tiên, chỗ do dự, quote nguyên văn và mức nghiêm trọng vào [validation/feedback-log.md](validation/feedback-log.md). Không điền feedback hộ người thử.
- **Dry run:** Huy bấm giờ 5 phút, Việt chạy 1 case chuẩn + 1 case khó, Đông đọc số đo/failure, Duyên trình bày job/evidence và next steps. Xem [CP5_CHECKLIST.md](CP5_CHECKLIST.md).

## §9. Changelog

| Thời điểm | Đổi gì | Vì sao |
|---|---|---|
| CP1 | Chọn B2: bản tin ưu tiên câu hỏi tồn | Canvas và survey `n=12` cho thấy câu hỏi bị trôi, người học tốn thời gian tìm lại |
| CP3 | Dùng AI thật cho triage và chạy 22-case golden set | Kiểm chứng quyết định trung tâm thay vì chỉ demo UI |
| Sau Run-02 | Mở rộng prefilter, thêm context và contract `importance=null` cho uncertain/no_attention | Run-02 chỉ 4/22 và có 10 case mất khỏi output |
| CP4 | Khóa quality bar 75% + 0 API error + 0 prefilter miss | Giữ chuẩn cố định cho các lượt chạy sau; Run-04 đang thiếu 1 case |
| Sau CP3 / Run-05 | Thêm policy rủi ro hẹp và verifier theo batch | Sửa lỗi deadline, resource, thiếu phạm vi và blocker kéo dài mà không đổi golden set, comparator hay quality bar |
| Tiếp theo | Chỉ cân nhắc rubric cho blocker sau hướng dẫn bot nếu holdout xác nhận | CASE-15 còn bị hạ mức cao thành vừa; không tối ưu theo một case đơn lẻ |
