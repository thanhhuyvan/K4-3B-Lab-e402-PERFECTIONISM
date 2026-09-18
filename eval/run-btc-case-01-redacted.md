# Trace CP3 — BTC case 01 (đã lọc)

**Ngày chạy:** 18/09/2026  
**Model local:** `gemini-3.5-flash-lite`  
**Endpoint:** `POST /api/analyze` trên localhost  
**Mục đích:** kiểm tra AI thật với một câu hỏi từ pack BTC, không phải full evaluation.

## Phạm vi dữ liệu gửi model

- Chỉ gửi **một** candidate từ pack BTC, được tham chiếu trong trace là `BTC_CASE_01`.
- `author`, `guild` và `channel` đã thay bằng giá trị test trước khi gửi.
- Không gửi toàn bộ CSV BTC, email, API key hay raw trace.
- Thêm một dòng synthetic chỉ làm mốc thời gian +5 giờ để kiểm tra cửa sổ chờ; không phải tin BTC.
- Nội dung câu hỏi và AI summary/reason không ghi trong repo để giảm lộ nội dung Discord.

## Kết quả quan sát

```text
HTTP 200
mode=ai
total_messages=2
analyzed_candidates=1
batch_size=8
case_ref=BTC_CASE_01
needs_attention=true
review_state=needs_review
importance=medium
evidence_count=1
```

## Giới hạn

- Đây là một case được tối thiểu hóa, không đại diện cho 1,092 tin hoặc 22 case eval.
- Không dùng trace này để tuyên bố accuracy/90.9%.
- Lượt eval tiếp theo phải chạy các case đã chốt nhãn, giữ output đã lọc và ghi cả pass/fail.
