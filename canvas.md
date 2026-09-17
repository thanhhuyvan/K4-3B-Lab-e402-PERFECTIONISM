# Canvas CP1 — Bản tin Discord hỗ trợ TA/Mod

> Mỗi dòng chỉ trả lời một ý. Dữ liệu survey đã được ẩn danh trước khi đưa vào repo public.

1. **Track + đề:** B · Trợ lý Discord — B2: cải tiến bản tin cuối ngày để TA/Mod xử lý câu hỏi tồn nhanh hơn.

2. **Job executor:** TA/Mod cuối ngày đang cần rà các câu hỏi Discord chưa được giải quyết để ưu tiên trả lời đúng vấn đề.

3. **Pain:** Câu hỏi học viên bị trôi giữa nhiều tin nhắn; bản tin hiện tại có thể bỏ sót, nhóm sai hoặc đánh dấu đã phản hồi dù chưa chắc đã xử lý xong, khiến TA mất thời gian lọc.

4. **Bằng chứng đầu:**
   - Data pack có `1.092` tin nhắn, gồm `779` tin người dùng và `313` tin bot; `307` tin có mention bot. *Nguồn:* `data/discord-pack/README.md`.
   - `k4_daily_reports.md` có 4 bản tin baseline với lỗi thật: chèn chuỗi “nguồn tham chiếu” giữa từ, tóm tắt bị cắt cụt và trạng thái “đã phản hồi” chưa được kiểm chứng.
   - Survey ẩn danh `n=12` (`Survay.csv`): `12/12` từng gặp tình trạng câu hỏi bị trôi; `9/12` phải nhắn lại hoặc DM; `9/12` cho biết mất từ 1 giờ trở lên; `8/12` thấy bot trả lời dài/lan man. *Cách đếm:* nhóm theo đúng lựa chọn trong từng câu hỏi của file survey.

5. **Lát cắt MỘT CÂU:** Một TA xem bản tin cuối ngày · cần biết câu hỏi nào chưa được giải quyết sau 4 giờ · AI lọc, nhóm chủ đề và xếp ưu tiên câu hỏi tồn · TA có danh sách ngắn kèm link để xử lý trước.

6. **AI tự làm đến đâu:** *Tự* lọc câu hỏi, nhóm cách hỏi tương tự, tóm tắt, xếp ưu tiên và gắn link tin nguồn. *Không tự* kết luận đã xử lý chỉ vì có reply, không nêu tên học viên công khai và không tự gửi DM/tag; TA duyệt trước khi đăng. *Lý do:* bản tin sai làm TA bỏ sót vấn đề hoặc làm lộ thông tin; người thật giữ quyết định cuối. **Willing users ngoài nhóm:** Nguyễn Thị Lê Na, Phạm Đình Bảo Khôi, Nguyễn Hữu Thành.

7. **Phân công:** `Lê Thị Duyên` — chốt hướng B2, tổng hợp Canvas, viết job/pain/lát cắt · `Nguyễn Đức Đông` — mining bản tin và log lỗi · `Bùi Quốc Việt` — prototype bản tin + flow demo · `Văn Thành Huy` — đội trưởng, kiểm tra repo, trình bày và nộp CP1.
