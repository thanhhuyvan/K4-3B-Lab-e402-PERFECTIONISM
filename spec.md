# AI SPEC — Bản tin Discord hỗ trợ TA/Mod · Nhóm [XX] · Zone [X]

Hướng: [ ] A — VLearn  [x] B — Trợ lý Học viên  [ ] C — Làn mở
Loại: [ ] Tối ưu tính năng có sẵn  [x] Tính năng mới

## §1. User & Job

- Job executor + workflow: TA/Mod cuối ngày cần rà câu hỏi Discord chưa được giải quyết → mở bản tin → chọn câu hỏi ưu tiên → bấm link để xử lý.
- Core JTBD: Khi kết thúc một ngày nhiều tin nhắn, TA muốn biết câu hỏi nào còn tồn và chủ đề nào nóng để xử lý đúng thứ tự mà không phải đọc lại toàn bộ Discord.
- Problem statement: Bản tin hiện có thể bỏ sót, nhóm sai, bị cắt cụt hoặc đánh dấu đã phản hồi khi chưa xác nhận xử lý xong.
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
- Ứng viên chọn + lý do: B2, vì có bản tin baseline đang chạy và các lỗi cụ thể để so sánh trước/sau.

## §3. Giải pháp tương tự đã nghiên cứu

- [Sản phẩm 1]: [flow / đáng học / đáng né / mình khác gì]
- [Sản phẩm 2]: [flow / đáng học / đáng né / mình khác gì]

## §4. Thiết kế

- Lát cắt một câu: Một TA xem bản tin cuối ngày; AI lọc, nhóm và xếp ưu tiên câu hỏi chưa được giải quyết sau 4 giờ; TA nhận danh sách ngắn kèm link để xử lý.
- Non-goals:
  1. Không nêu tên/định danh học viên trong bản tin công khai.
  2. Không coi một reply là bằng chứng chắc chắn câu hỏi đã được giải quyết.
  3. Không tự động gửi DM/tag học viên khi chưa có người duyệt.
- Mức prototype nhắm tới: [ ] Sketch  [x] Mock  [ ] Working
- Phần thật/mock: AI phân loại và quyết định phản hồi là thật; giao diện, nguồn mẫu và kết nối Discord có thể mock.
- Automation: [ ] augment  [x] conditional  [ ] automate. AI tự lọc/nhóm/xếp ưu tiên; TA duyệt bản tin và quyết định phản hồi vì việc đánh dấu “đã xử lý” hoặc tag người dùng có thể gây bỏ sót và làm phiền.

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
