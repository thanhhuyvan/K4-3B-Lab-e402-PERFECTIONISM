# Hướng dẫn cho coding agent trong repo

Đọc README thư mục cá nhân liên quan; tra team/contract.md khi sửa phần tích hợp. Phân công tại team/README.md.

- Phạm vi CP3: CSV → AI phân tích câu cần chú ý → bảng hai cột. Nguồn chỉ là chữ, không mở hội thoại.
- Tôn trọng owner trong team/README.md. Nếu người dùng yêu cầu phần cá nhân, làm trong thư mục đó; thay đổi tích hợp/tài liệu chung thuộc Huy.
- Bảo toàn thay đổi local của người khác. Không tự push, merge hoặc publish khi yêu cầu chỉ là chỉnh local/review.
- Không đưa pack BTC hoặc secrets vào repo. Kiểm tra staged diff, không git add . bừa.
- Phân biệt dữ liệu thật, rule-based, mock và AI thật trong UI/tài liệu. Không tạo số liệu eval hoặc bằng chứng giả.
- CSV gồm nội dung nhiều dòng/ngoặc kép. Giữ nguồn từ input; dùng textContent khi render tin.
- Không coi reply là đã giải quyết; không tự suy vai trò tác giả. Tin chưa đủ cửa sổ quan sát không phải negative.
- API/schema đề xuất trong contract chưa chứng minh backend đã tồn tại. Kiểm tra code thực tế trước khi báo hoàn thành.
- Chạy kiểm tra phù hợp; báo file đổi, kiểm tra đã chạy và giới hạn còn tồn. Không cần test code cho sửa tài liệu thuần túy.
