# CP3 Checklist — PERFECTIONISM

Mục tiêu: CSV local → AI đề xuất câu cần TA xem → bảng hai cột → con người xác nhận. Không đưa API key hoặc raw Discord dataset vào Git.

## Bắt buộc trước khi nộp

- [x] Có UI chọn CSV, loading, lỗi, kết quả rỗng và sort.
- [x] Có backend local cùng origin với UI.
- [x] UI gọi AI thật, không fallback sang response demo khi API lỗi.
- [x] Key chỉ ở `.env` local; có `.env.example` không chứa key.
- [x] Parse đúng cột CSV, quote/multiline và giữ `msg_id` / server / kênh.
- [x] Giữ reply làm ngữ cảnh; không loại câu hỏi chỉ vì có reply.
- [x] Chia AI theo lô 8 candidate để không gửi toàn bộ 199 candidate trong một request.
- [x] AI output được validate: ID nguồn, summary, importance, review state và evidence IDs.
- [x] UI chỉ hiện `needs_attention=true`; `uncertain` hiện **Cần xác minh**.
- [x] Test end-to-end bằng CSV synthetic: HTTP 200, AI trả kết quả hợp lệ.
- [x] Lưu trace AI synthetic đã lọc tại `eval/run-mvp-synthetic.md`.
- [x] Chạy một case dữ liệu BTC có kiểm soát qua AI thật; trace đã lọc tại `eval/run-btc-case-01-redacted.md`.
- [x] Ghi model, thời điểm chạy, số candidate và trạng thái request trong trace; không ghi key.
- [x] Chạy lại golden set 22 case qua backend hiện tại; lượt nộp tại `eval/run-04-current.md`.
- [x] Ghi đạt/tổng, baseline, lỗi prefilter và lỗi phân loại trong `eval/run-04-current.md`.
- [ ] Quay video 30 giây: chọn CSV → loading AI thật → bảng hai cột → số đo/giới hạn.
- [ ] Kiểm tra video không lộ `.env`, API key hay toàn bộ raw dataset.
- [ ] Đọc lại diff: không có dataset, `.env`, trace nhạy cảm hoặc response demo giả làm AI.
- [ ] Commit/push code + README + eval/trace đã lọc; kiểm tra link/form nộp.

## Human loop bắt buộc trong demo

- [x] Mỗi dòng hiện thời gian chờ, summary, importance, lý do, nguồn chữ và trạng thái.
- [x] Có nhãn **Cần TA xem** hoặc **Cần xác minh**.
- [ ] Người demo nêu rõ: AI chỉ đề xuất; TA/Mod quyết định cần xử lý, không cần xử lý hoặc cần xác minh.

## Nice to have — chỉ làm khi phần bắt buộc xong

- [ ] Chạy toàn bộ dataset BTC qua AI và ghi tổng hợp theo batch.
- [ ] Tự động tạo file feedback cho TA/Mod (`msg_id`, AI đề xuất, quyết định TA, lý do).
- [ ] Tối ưu gom các câu hỏi cùng một sự cố để tránh dòng trùng lặp.
- [ ] Tăng context có chọn lọc, ví dụ tin trước/sau và reply chain sâu hơn.
- [ ] Thêm progress theo batch, nút hủy hoặc retry từng batch.
- [ ] Thêm test tự động cho parser, schema, batch và UI thật.
- [ ] Cải thiện layout mobile hoặc theme; không thay đổi scope hai cột.

## Quy tắc quyết định nhanh

1. Nếu video AI thật chưa có: làm video trước, không thêm tính năng.
2. Nếu AI lỗi/quota: quay lỗi trung thực, giữ trace và nêu giới hạn; không thay AI bằng mock.
3. Nếu chưa chạy lại 22 case: không tuyên bố 90.9% là kết quả của backend hiện tại.
4. Không push `backup/`, CSV BTC hoặc bất kỳ `.env` nào.
