# Run-02 — đo lượt đầu trên MVP hiện tại

**Ngày chạy:** 18/09/2026
**Model:** `gemini-3.5-flash-lite`
**Phạm vi:** 22 case trong `golden-set.json`, chạy từng case qua `POST /api/analyze`.
**Dữ liệu public:** chỉ giữ case ID, nhãn và kết quả; raw input/output nằm local trong `data-local/` và không commit.

## Chuẩn đạt trước khi xem kết quả

Một case **đạt nghiêm ngặt** khi hệ thống trả đủ một kết quả và đồng thời khớp cả:

1. `needs_attention`;
2. `review_state`;
3. `importance`.

Case bị prefilter loại, API lỗi hoặc thiếu output đều tính **không đạt**.

## Tổng hợp

| Chỉ số | Kết quả |
|---|---:|
| Tổng case | 22 |
| Đạt nghiêm ngặt | 4 / 22 = **18.2%** |
| Đúng quyết định + trạng thái | 8 / 22 = **36.4%** |
| Đúng mức quan trọng | 6 / 22 = **27.3%** |
| API error | 0 |
| Không có output do prefilter | 10 |

## Bảng kết quả đầy đủ

| Case | Nhóm rủi ro | Nhãn kỳ vọng | Kết quả MVP | Đạt? |
|---|---|---|---|---|
| CASE-01 | Thắc mắc onboarding | cần xem / vừa | cần xem / vừa | ✅ |
| CASE-02 | Announcement | không cần / thấp | bị lọc trước AI | ❌ |
| CASE-03 | Lỗi kỹ thuật khẩn | cần xem / cao | bị lọc trước AI | ❌ |
| CASE-04 | Resolved | không cần / thấp | bị lọc trước AI | ❌ |
| CASE-05 | Deadline | cần xem / cao | cần xem / vừa | ❌ |
| CASE-06 | Tài liệu | cần xem / vừa | cần xem / thấp | ❌ |
| CASE-07 | Resource | cần xem / vừa | bị lọc trước AI | ❌ |
| CASE-08 | Matchmaking | không cần / thấp | không cần / thấp | ✅ |
| CASE-09 | Infrastructure | cần xem / cao | cần xem / cao | ✅ |
| CASE-10 | Casual | không cần / thấp | bị lọc trước AI | ❌ |
| CASE-11 | Thiếu nguồn | cần xác minh / thấp | cần xem / thấp | ❌ |
| CASE-12 | Thiếu nguồn | cần xác minh / thấp | cần xem / vừa | ❌ |
| CASE-13 | Câu mơ hồ | cần xác minh / vừa | cần xem / thấp | ❌ |
| CASE-14 | Câu mơ hồ | cần xác minh / vừa | cần xem / vừa | ❌ |
| CASE-15 | Reply nhưng vẫn kẹt | cần xem / cao | bị lọc trước AI | ❌ |
| CASE-16 | Reply nhưng vẫn kẹt | cần xem / cao | bị lọc trước AI | ❌ |
| CASE-17 | Khẩn cấp >4h | cần xem / cao | cần xem / cao | ✅ |
| CASE-18 | Quy chế khẩn | cần xem / cao | cần xem / thấp | ❌ |
| CASE-19 | Prompt injection | không cần / thấp | bị lọc trước AI | ❌ |
| CASE-20 | Out-of-bounds | không cần / thấp | bị lọc trước AI | ❌ |
| CASE-21 | Spam/phishing | không cần / thấp | bị lọc trước AI | ❌ |
| CASE-22 | Poll cá nhân | không cần / thấp | không cần / chưa xác định | ❌ |

## Lỗi chính và bước tiếp theo

1. **Prefilter quá hẹp:** 10 case không tới AI. Đặc biệt các case không có dấu hỏi rõ, tin đã trả lời và câu hiếm đều bị mất; đây là nguyên nhân lớn nhất của false negative trong lượt đầu.
2. **Uncertain bị xếp thành needs_review:** 4 case thiếu ngữ cảnh hoặc mơ hồ bị AI trả quá tự tin.
3. **Priority chưa ổn định:** deadline/quy chế bị xếp thấp hơn kỳ vọng; đồng thời nhãn golden set đặt `low` cho một số `no_attention`, trong khi contract của MVP trả `null` cho `no_attention`.

Kết quả này là baseline trung thực để sửa ở vòng sau; không thay bằng số `20/22` của tài liệu cũ.
