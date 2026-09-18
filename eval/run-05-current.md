# Run-05 — policy rủi ro hẹp + verifier theo batch

**Ngày chạy:** 18/09/2026
**Model:** `gemini-3.5-flash-lite`
**Phạm vi:** 22 case trong `golden-set.json`, chạy từng case qua MVP hiện tại.
**Chuẩn đạt:** khớp đồng thời `needs_attention`, `review_state` và `importance`; với `uncertain`/`no_attention`, contract yêu cầu `importance=null`.

## Thay đổi được kiểm soát

- Bổ sung policy hẹp, áp dụng độc lập với ID test: deadline/rủi ro điểm số, truy cập tài nguyên, câu hỏi thiếu phạm vi, và blocker kéo dài.
- Thêm lớp verifier AI cho batch dashboard từ 2 tin trở lên. Với request một tin (như evaluator), không gọi verifier lần hai để tránh tăng quota mà không thêm ngữ cảnh.
- Giữ nguyên `golden-set.json`, comparator và quality bar.

## Tổng hợp

| Chỉ số | Run-04 | Run-05 |
|---|---:|---:|
| Đạt nghiêm ngặt | 16 / 22 (72.7%) | **21 / 22 (95.5%)** |
| API error | 0 | **0** |
| Không có output do prefilter | 0 | **0** |

## Case chưa đạt

| Case | Kỳ vọng | MVP | Lý do |
|---|---|---|---|
| CASE-15 | cần xem / cao | cần xem / vừa | Lỗi kỹ thuật vẫn tồn tại sau hướng dẫn bot được phát hiện đúng, nhưng model hạ mức độ ưu tiên. |

## Kết luận

Run-05 vượt quality bar đã khóa (>=75%, API error = 0, prefilter miss = 0). Raw input/output chỉ nằm ở `data-local/eval-current-results.json` và không commit.
