# K4-3B-E402-PERFECTIONISM

## Thành viên nhóm & phân công

| Họ và tên | Mã học viên | Vai trò chính | Phần việc đảm nhiệm |
|---|---|---|---|
| [Văn Thành Huy] | [2A202602763] | Đội trưởng / Technical Decision Maker | Chốt stack và flow kỹ thuật, tích hợp prototype, kiểm tra end-to-end, commit và nộp |
| [Nguyễn Đức Đông] | [2A202602367] | Evidence | Mining Discord, khảo sát |
| [Bùi Quốc Việt] | [2A202602884] | Prototype / UI | Dựng màn hình và flow bản tin bấm được |
| [Lê Thị Duyên] | [2A202602411] | Nội dung / Spec | Chốt hướng B2, tổng hợp Canvas, viết job, pain và lát cắt |

## Dự án

- Track: B — Trợ lý Discord
- Đề: B2 — Cải tiến bản tin cuối ngày cho TA/Mod
- Trạng thái: Prototype đang phát triển

- Canvas CP1: xem [canvas.md](canvas.md)

Các thư mục còn lại chứa spec, prototype, bộ kiểm thử, validation và reflection cá nhân.

Mẫu khảo sát/phỏng vấn B2: [research/survey-template.md](research/survey-template.md)

Dữ liệu khảo sát B2: [Survay.csv](Survay.csv)

## Phân công CP2 — Flow bản tin bấm được

| Người | Việc cần hoàn thành | Output |
|---|---|---|
| Văn Thành Huy — Technical Decision Maker | Chốt công nghệ, cấu trúc màn hình, trạng thái dữ liệu; tích hợp và kiểm tra flow | Một flow chạy end-to-end, không can thiệp tay giữa chừng |
| Lê Thị Duyên — Nội dung/Spec | Chốt 3 tình huống demo và microcopy cho từng trạng thái | Case bình thường, case câu hỏi tồn, case đã reply nhưng chưa chắc đã giải quyết |
| Nguyễn Đức Đông — Evidence | Chọn ví dụ baseline, link/`msg_id`, kiểm tra bản tin mới không lặp lỗi cũ | Bộ dữ liệu mẫu an toàn, không chứa thông tin cá nhân |
| Bùi Quốc Việt — Prototype/UI | Dựng giao diện bản tin và các nút/đường dẫn tương tác | Mock bấm được từ danh sách → chi tiết → link xử lý |

### Tiêu chí hoàn thành CP2

- [ ] Có thể mở bản tin cuối ngày.
- [ ] Có danh sách câu hỏi được nhóm và xếp ưu tiên.
- [ ] Bấm được từ một mục trong bản tin tới màn hình chi tiết/link nguồn.
- [ ] Có trạng thái “chưa có phản hồi” khác với “đã reply, chưa xác nhận giải quyết”.
- [ ] Có ít nhất 3 case demo và phần mock được ghi rõ.
- [ ] Có commit CP2 trong repo.
