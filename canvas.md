# Canvas CP1 — Trợ lý Discord có căn cứ

> Mỗi dòng chỉ trả lời một ý. Các số có `[ ]` phải được nhóm kiểm tra lại trước khi nộp. Không chép nguyên file dữ liệu Discord vào repo public.

1. **Track + đề:** B · Trợ lý Discord — B1: tối ưu trợ lý hiện có, tập trung vào câu hỏi deadline/quy trình nộp bài có nguồn chính thức.

2. **Job executor:** Học viên đang ở Discord, cần xác nhận deadline hoặc quy trình nộp bài trước khi tiếp tục làm/nộp lab.

3. **Pain:** Khi hỏi thông tin vận hành trên Discord, học viên có thể nhận câu trả lời dài, thiếu nguồn hoặc bị đoán; nếu tin sai, bạn có thể nộp muộn hoặc làm sai quy trình.

4. **Bằng chứng đầu:**
   - Data pack có `1.092` tin nhắn, gồm `779` tin của người dùng và `313` tin của bot; `307` tin người dùng có mention bot. *Nguồn:* `data/discord-pack/README.md`; cần bổ sung các `msg_id` minh hoạ và cách đếm nhóm câu hỏi logistics.
   - Quét sơ bộ các tin người dùng theo nhóm từ khoá deadline/hạn/nộp/điểm danh/standup/XP/ticket/link cho thấy `208` tin có tín hiệu logistics. Đây chỉ là số sơ bộ; nhóm sẽ rà nhãn thủ công và chốt số thật trong evidence log.

5. **Lát cắt MỘT CÂU:** Học viên hỏi deadline hoặc quy trình nộp bài · AI quyết định câu trả lời có căn cứ chính thức hay không · nếu có thì trả lời ngắn kèm nguồn, nếu không thì hỏi lại hoặc chuyển TA/Mod · học viên không nhận deadline sai.

6. **AI tự làm đến đâu:** *Tự* nhận diện intent và trả lời case logistics khi tìm được nguồn chính thức rõ ràng. *Không tự* đoán khi nguồn thiếu/mâu thuẫn, không xác nhận dữ liệu cá nhân, không quyết định gia hạn hay điểm số; khi đó phải nêu giới hạn và chuyển TA/Mod. *Lý do:* sai thông tin deadline có cost-of-error cao hơn chi phí chờ người thật xác nhận. **Willing users ngoài nhóm:** `[Tên 1]`, `[Tên 2]`, `[Tên 3]`.

7. **Phân công:** `[Thành viên 4]` — chốt hướng B1, tổng hợp Canvas, viết job/pain/lát cắt · `[Thành viên 2]` — mining evidence + log đếm · `[Thành viên 3]` — prototype + flow demo · `Văn Thành Huy` — đội trưởng, kiểm tra repo, trình bày và nộp CP1.

## Checklist trước khi nộp

- [ ] Điền tên nhóm, phòng, tên/mã thành viên.
- [ ] Thay `[Tên]` bằng người thật; xác nhận ít nhất 2 willing users ngoài nhóm.
- [ ] Rà thủ công số `208`, bổ sung phương pháp đếm và ít nhất 1–2 `msg_id`.
- [ ] Đội trưởng có link repo public và nộp đúng thông tin theo form CP1.
