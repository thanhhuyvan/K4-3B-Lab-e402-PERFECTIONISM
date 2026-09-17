# AI SPEC — Trợ lý Discord có căn cứ · Nhóm [XX] · Zone [X]

Hướng: [ ] A — VLearn  [x] B — Trợ lý Học viên  [ ] C — Làn mở
Loại: [x] Tối ưu tính năng có sẵn  [ ] Tính năng mới

## §1. User & Job

- Job executor + workflow: Học viên đang hỏi deadline hoặc quy trình trên Discord → cần biết thông tin đúng để tiếp tục nộp bài/tham gia hoạt động.
- Core JTBD: Khi cần xác nhận thông tin vận hành của chương trình, học viên muốn nhận được hướng dẫn đúng và có thể kiểm tra được để không bỏ lỡ deadline hoặc làm sai quy trình.
- Problem statement: Học viên phải hỏi lại nhiều lần; câu trả lời hiện có đôi khi dài, thiếu căn cứ hoặc đoán khi chưa đủ thông tin.
- Evidence: Hoàn thiện bằng mining log và/hoặc khảo sát; không đưa dữ liệu cá nhân thật vào repo public.
  - Số liệu mining / khảo sát: [n = ?, phương pháp, kết quả]
  - ≥5 quote/ví dụ nguyên văn + msg_id: [bổ sung]

## §2. Impact & quyết định chọn

| Ứng viên | Số người | Tần suất | Chi phí mỗi lần | Khả thi | Chọn? |
|---|---:|---:|---|---|---|
| Trả lời deadline/quy trình có nguồn | [ ] | [ ] | Sai deadline/mất thời gian | Cao | Có |
| Tóm tắt câu hỏi tồn cho TA | [ ] | [ ] | TA mất thời gian lọc | Vừa | Không |
| Tra cứu trạng thái cá nhân | [ ] | [ ] | Dễ vượt quyền dữ liệu | Thấp | Không |

- Ứng viên đã loại + lý do: [bổ sung bằng số]
- Ứng viên chọn + lý do: B1, vì có pain và dữ liệu kiểm thử rõ nhất.

## §3. Giải pháp tương tự đã nghiên cứu

- [Sản phẩm 1]: [flow / đáng học / đáng né / mình khác gì]
- [Sản phẩm 2]: [flow / đáng học / đáng né / mình khác gì]

## §4. Thiết kế

- Lát cắt một câu: Một học viên hỏi deadline hoặc quy trình nộp bài; bot chỉ trả lời khi tìm được nguồn chính thức, nếu không chắc thì chuyển TA/Mod để tránh thông tin sai.
- Non-goals:
  1. Không trả lời dữ liệu cá nhân như lịch sử điểm danh của từng người.
  2. Không tự quyết định gia hạn, điểm số hoặc chính sách.
  3. Không tự động gửi DM/tag học viên khi chưa có người duyệt.
- Mức prototype nhắm tới: [ ] Sketch  [x] Mock  [ ] Working
- Phần thật/mock: AI phân loại và quyết định phản hồi là thật; giao diện, nguồn mẫu và kết nối Discord có thể mock.
- Automation: [ ] augment  [x] conditional  [ ] automate. Case có nguồn chính thức thì trả lời; case mơ hồ, mâu thuẫn hoặc ngoài quyền thì hỏi lại/chuyển TA vì sai deadline có cost-of-error cao.

### §4b. Nguyên tắc HAX/PAIR

| Nguyên tắc | Áp cụ thể vào đâu trong prototype |
|---|---|
| G1 | Màn hình mở đầu nêu rõ bot chỉ hỗ trợ thông tin chương trình có nguồn. |
| G2 | Mỗi câu trả lời logistics hiển thị nguồn và thời điểm nguồn. |
| G10 | Không đủ căn cứ thì không đoán; chuyển TA hoặc hỏi lại. |
| G11 | Hiển thị lý do bot không thể trả lời và bước tiếp theo. |
| G8/G9 | Cho phép bỏ qua, sửa câu hỏi và gửi lại. |

## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản

Hoàn thiện tối thiểu 8 kịch bản, mỗi lớp ít nhất 2 case, trong `eval/`.

## §6. Bốn đường đi của trải nghiệm

- Happy path: Có một nguồn chính thức rõ ràng → trả lời ngắn + nguồn.
- Low-confidence: Có nhiều khả năng hoặc thiếu thời gian → hỏi lại.
- Failure/không căn cứ: Không có nguồn → nói rõ giới hạn + chuyển TA.
- Correction: Người dùng sửa/bổ sung thông tin → bot chạy lại và hiển thị nguồn mới.

## §7. Kiểm thử

- Golden set: tối thiểu 20 case trong `eval/golden-set.csv`, ít nhất 10 case phát triển từ chatlog thật.
- Chiều chất lượng: factuality, relevance, safe escalation; mỗi chiều phải có tiêu chí pass/fail cụ thể.
- Quality bar: “Đạt khi ≥ [__]% case đúng và không có case logistics không nguồn nhưng bot khẳng định như sự thật.”
- Kết quả các lượt chạy: [bổ sung sau khi chạy]

## §8. Phân công & kế hoạch

- Spec: [Tên]
- Evidence: [Tên]
- Prompt/code: [Tên]
- Eval: [Tên]
- Demo: [Tên]
- Willing users: [ít nhất 2 người ngoài nhóm]

## §9. Changelog

| Thời điểm | Đổi gì | Vì sao |
|---|---|---|
| [dd/mm hh:mm] | Khởi tạo spec | Chốt Track B1 |
