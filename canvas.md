# Canvas CP1 — Bản tin Discord hỗ trợ TA/Mod

> Mỗi dòng chỉ trả lời một ý. Các số có `[ ]` phải được nhóm kiểm tra lại trước khi nộp. Không chép nguyên file dữ liệu Discord vào repo public.

1. **Track + đề:** B · Trợ lý Discord — B2: cải tiến bản tin cuối ngày để TA/Mod xử lý câu hỏi tồn nhanh hơn.

2. **Job executor:** TA/Mod cuối ngày đang cần rà các câu hỏi Discord chưa được giải quyết để ưu tiên trả lời đúng vấn đề.

3. **Pain:** Câu hỏi học viên bị trôi giữa nhiều tin nhắn; bản tin hiện tại có thể bỏ sót, nhóm sai hoặc đánh dấu đã phản hồi dù chưa chắc đã xử lý xong, khiến TA mất thời gian lọc.

4. **Bằng chứng đầu:**
   - Data pack có `1.092` tin nhắn, gồm `779` tin người dùng và `313` tin bot; `307` tin có mention bot. *Nguồn:* `data/discord-pack/README.md`.
   - `k4_daily_reports.md` có 4 bản tin baseline với lỗi thật: chèn chuỗi “nguồn tham chiếu” giữa từ, tóm tắt bị cắt cụt và trạng thái “đã phản hồi” chưa được kiểm chứng. Cần bổ sung `msg_id` và bảng đếm lỗi.

5. **Lát cắt MỘT CÂU:** Một TA xem bản tin cuối ngày · cần biết câu hỏi nào chưa được giải quyết sau 4 giờ · AI lọc, nhóm chủ đề và xếp ưu tiên câu hỏi tồn · TA có danh sách ngắn kèm link để xử lý trước.

6. **AI tự làm đến đâu:** *Tự* lọc câu hỏi, nhóm cách hỏi tương tự, tóm tắt, xếp ưu tiên và gắn link tin nguồn. *Không tự* kết luận đã xử lý chỉ vì có reply, không nêu tên học viên công khai và không tự gửi DM/tag; TA duyệt trước khi đăng. *Lý do:* bản tin sai làm TA bỏ sót vấn đề hoặc làm lộ thông tin; người thật giữ quyết định cuối. **Willing users ngoài nhóm:** `[Tên 1]`, `[Tên 2]`, `[Tên 3]`.

7. **Phân công:** `[Thành viên 4]` — chốt hướng B2, tổng hợp Canvas, viết job/pain/lát cắt · `[Thành viên 2]` — mining bản tin và log lỗi · `[Thành viên 3]` — prototype bản tin + flow demo · `Văn Thành Huy` — đội trưởng, kiểm tra repo, trình bày và nộp CP1.

## Checklist trước khi nộp

- [ ] Điền tên nhóm, phòng, tên/mã thành viên.
- [ ] Thay `[Tên]` bằng người thật; xác nhận ít nhất 2 willing users ngoài nhóm.
- [ ] Rà thủ công số `208`, bổ sung phương pháp đếm và ít nhất 1–2 `msg_id`.
- [ ] Đội trưởng có link repo public và nộp đúng thông tin theo form CP1.
