# Prototype CP2 và bàn giao CP3

Mở demo_cp2_dashboard.html trực tiếp bằng trình duyệt. Chọn k4_messages.csv từ pack BTC trên máy rồi bấm Thống kê. Không cần mạng/API key cho CP2.

- Bảng hai cột: Thời gian; Tóm tắt & mức độ quan trọng. Sort theo thời gian hoặc mức quan trọng.
- Nguồn chỉ hiển thị chữ server/kênh/msg_id; không mở nội dung nguồn hoặc tin lân cận.
- CSV thật được đọc vào bộ nhớ trình duyệt, không nhúng dataset vào HTML hoặc gửi lên server trong CP2.
- Bản hiện tại dùng regex, trích ngắn nội dung và gợi ý ưu tiên theo từ khóa; chưa gọi AI.
- Mốc thời gian là tin cuối trong CSV. Quy tắc CP2 tìm tin có dấu hiệu hỏi, chờ ít nhất 4 giờ, không có reply trực tiếp trong dữ liệu.
- CP3 phải cải tiến giới hạn trên: giữ cả case có reply nhưng chưa giải quyết, gọi AI thật, kiểm thử cả lỗi bộ lọc.
- Không push nguyên dataset. Hướng dẫn cá nhân trong team/ là kế hoạch CP3, chưa phải backend đã triển khai.
