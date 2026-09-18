# Run-04 — sau khi sửa prefilter, context và contract

**Ngày chạy:** 18/09/2026
**Model:** `gemini-3.5-flash-lite`
**Phạm vi:** 22 case trong `golden-set.json`, chạy từng case qua MVP hiện tại.
**Chuẩn đạt:** khớp đồng thời `needs_attention`, `review_state` và `importance`; với `uncertain`/`no_attention`, contract yêu cầu `importance=null`.

## Những gì đã sửa sau Run-02

- Mở rộng prefilter cho câu lỗi kỹ thuật, lỗi không có dấu hỏi, deadline và resource.
- Bổ sung `input_context` của golden set thành context synthetic cho mỗi case.
- Đánh giá case bị lọc đúng là `no_attention` khi nhãn kỳ vọng là `no_attention`.
- Ép `importance=null` cho `uncertain` và `no_attention` theo contract.

## Tổng hợp

| Chỉ số | Run-02 | Run-04 |
|---|---:|---:|
| Đạt nghiêm ngặt | 4 / 22 (18.2%) | **16 / 22 (72.7%)** |
| Đúng quyết định + trạng thái | 8 / 22 | **19 / 22** |
| Đúng mức quan trọng | 6 / 22 | **17 / 22** |
| API error | 0 | **0** |
| Không có output do prefilter | 10 | **0** |

## Bảng kết quả đầy đủ

| Case | Kỳ vọng | MVP | Đạt? |
|---|---|---|---|
| CASE-01 | cần xem / vừa | cần xem / vừa | ✅ |
| CASE-02 | không cần / null | không cần / null | ✅ |
| CASE-03 | cần xem / cao | cần xem / cao | ✅ |
| CASE-04 | không cần / null | không cần / null | ✅ |
| CASE-05 | cần xem / cao | cần xem / vừa | ❌ |
| CASE-06 | cần xem / vừa | cần xem / thấp | ❌ |
| CASE-07 | cần xem / vừa | cần xem / vừa | ✅ |
| CASE-08 | không cần / null | không cần / null | ✅ |
| CASE-09 | cần xem / cao | cần xem / cao | ✅ |
| CASE-10 | không cần / null | không cần / null | ✅ |
| CASE-11 | cần xác minh / null | cần xác minh / null | ✅ |
| CASE-12 | cần xác minh / null | cần xem / vừa | ❌ |
| CASE-13 | cần xác minh / null | không cần / null | ❌ |
| CASE-14 | cần xác minh / null | cần xem / vừa | ❌ |
| CASE-15 | cần xem / cao | cần xem / cao | ✅ |
| CASE-16 | cần xem / cao | cần xem / cao | ✅ |
| CASE-17 | cần xem / cao | cần xem / cao | ✅ |
| CASE-18 | cần xem / cao | cần xem / vừa | ❌ |
| CASE-19 | không cần / null | không cần / null | ✅ |
| CASE-20 | không cần / null | không cần / null | ✅ |
| CASE-21 | không cần / null | không cần / null | ✅ |
| CASE-22 | không cần / null | không cần / null | ✅ |

## Sáu case chưa đạt

- `CASE-05`, `CASE-18`: nhận đúng là cần xem nhưng hạ mức cao xuống vừa.
- `CASE-06`: nhận đúng là cần xem nhưng hạ mức vừa xuống thấp.
- `CASE-12`, `CASE-14`: thiếu ngữ cảnh nhưng model vẫn quá tự tin là cần xem.
- `CASE-13`: câu ngoài phạm vi bị loại thành không cần thay vì cần xác minh.

Đây là lượt đo dùng để nộp CP3: số thật, đủ mọi case và không có API error. `run-02-current.md` được giữ làm baseline trước sửa.
