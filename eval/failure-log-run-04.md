# Failure log — Run-04

**Lượt đo:** 18/09/2026 · `gemini-3.5-flash-lite`
**Tổng:** 22 case · 16 đạt · 6 chưa đạt · 72.7%
**API error:** 0
**Raw input/output:** chỉ lưu local, không commit.

## Case chưa đạt

| Case | Kỳ vọng | MVP trả | Nhóm lỗi | Hướng xử lý lượt sau |
|---|---|---|---|---|
| CASE-05 | cần xem / cao | cần xem / vừa | Hạ độ khẩn của deadline | Bổ sung quy tắc: chỉ `high` khi context có bằng chứng sát hạn hoặc hậu quả rõ; thêm few-shot deadline. |
| CASE-06 | cần xem / vừa | cần xem / thấp | Hạ mức độ của request tài liệu | Bổ sung few-shot phân biệt request tài liệu cần hỗ trợ với câu hỏi ngoài lề. |
| CASE-12 | cần xác minh / null | cần xem / vừa | Quá tự tin khi thiếu thông tin | Thêm câu bắt buộc trong prompt: thiếu tên file/platform/lỗi cụ thể → `uncertain`, `importance=null`. |
| CASE-13 | cần xác minh / null | không cần / null | Loại bỏ câu ngoài phạm vi quá sớm | Với câu có dạng câu hỏi nhưng ngoài phạm vi dữ liệu, trả `uncertain`; không tự chuyển thành `no_attention`. |
| CASE-14 | cần xác minh / null | cần xem / vừa | Quá tự tin với câu hỏi mơ hồ | Few-shot câu hỏi deadline/đồ án không chỉ rõ phạm vi → `uncertain`. |
| CASE-18 | cần xem / cao | cần xem / vừa | Hạ độ khẩn của quy chế | Thêm few-shot quy chế sát hạn; chỉ xếp `high` khi có bằng chứng thời gian/hậu quả. |

## Lỗi đã sửa trước Run-04

| Lỗi Run-02 | Cách sửa | Kết quả Run-04 |
|---|---|---|
| 10 case bị prefilter loại trước AI | Mở rộng nhận diện lỗi kỹ thuật, deadline, resource; coi prefilter `no_attention` là outcome hợp lệ cho case âm | 0 case thiếu output |
| Test không gửi context | Thêm `input_context` thành tin context synthetic cho từng case | Case bot-reply-still-stuck 15/16 đều đạt |
| `importance` lệch contract ở `no_attention`/`uncertain` | Validate ép `importance=null` theo contract | Các case âm theo contract không fail vì `low`/`null` lệch nhau |

## Quy tắc cho lượt Run-05

1. Không sửa golden set hoặc chuẩn đạt sau khi đã xem output.
2. Chỉ sửa prompt/filter theo các lỗi nêu trên.
3. Chạy lại đủ 22 case; ghi cả case xấu và API error.
4. So sánh Run-05 với Run-04: đạt/tổng, priority fail, uncertain fail và false negative.

## Quyết định hiện tại

Run-04 là số dùng cho CP3: **16/22 = 72.7%**. Không cần sửa thêm trước khi quay/nộp CP3; Run-05 là công việc cải tiến sau khi checkpoint đã được lưu.
