# Trace MVP AI thật — dữ liệu synthetic

**Ngày chạy:** 18/09/2026  
**Mục đích:** xác minh luồng end-to-end, không phải điểm đánh giá CP3.  
**Model local:** `gemini-3.5-flash-lite`  
**Endpoint:** `POST /api/analyze` trên localhost  
**Dữ liệu gửi model:** 2 dòng synthetic, không chứa CSV BTC, tên thật, email hay API key.

## Input tối thiểu

| msg_id | Thời gian | Nội dung |
|---|---|---|
| `SYN001` | 2026-09-17 10:00 | Không đăng nhập được bài lab. |
| `SYN002` | 2026-09-17 18:00 | Tin mốc thời gian. |

## Kết quả quan sát

```text
HTTP 200
mode=ai
total_messages=2
analyzed_candidates=1
batch_size=8
items=1
SYN001: needs_attention=true; review_state=needs_review;
importance=medium; evidence_ids=[SYN001]
```

## Kết luận và giới hạn

- Backend parse CSV, tạo candidate, gọi AI và validate output thành công.
- UI nhận cùng schema qua `/api/analyze`; UI chỉ hiện các mục `needs_attention=true`.
- Đây không phải kết quả trên golden set hoặc dataset BTC. Không dùng trace này để tuyên bố accuracy/90.9%.
- Trước khi nộp vẫn cần một lượt case BTC được phép sử dụng, trace đã lọc dữ liệu nhạy cảm và video thao tác AI thật.
