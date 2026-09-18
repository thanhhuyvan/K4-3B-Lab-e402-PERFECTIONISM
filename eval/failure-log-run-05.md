# Failure log — Run-05

**Lượt đo:** 18/09/2026 · `gemini-3.5-flash-lite`
**Tổng:** 22 case · 21 đạt · 1 chưa đạt · 95.5%
**API error:** 0
**Raw input/output:** chỉ lưu local, không commit.

| Case | Kỳ vọng | MVP trả | Nhóm lỗi | Hướng xử lý nếu tiếp tục |
|---|---|---|---|---|
| CASE-15 | cần xem / cao | cần xem / vừa | Đánh giá thấp mức độ blocker sau phản hồi bot | Bổ sung policy/rubric tổng quát cho “đã làm theo hướng dẫn nhưng vẫn lỗi” chỉ khi có bằng chứng tiến độ bị chặn. Cần đo lại trên tập holdout trước khi áp dụng. |

## Ghi nhận vận hành

- Verifier cho mọi request một tin làm tăng số gọi API và có thể gặp `429` khi chạy evaluator tuần tự.
- Bản hiện tại chỉ verifier các batch từ hai tin trở lên: dashboard vẫn có second pass; evaluator một tin không bị nhân đôi call.
- Không chọn lượt 20/22 trước đó làm báo cáo: Run-05 được ghi theo lượt xác nhận cuối, đủ 22 case, API error = 0.
