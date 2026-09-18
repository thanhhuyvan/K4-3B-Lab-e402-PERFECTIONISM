# Huy — backend và tích hợp

**Bối cảnh:** Nhóm làm Track B2 cho TA/Mod (người hỗ trợ học viên). Bot Discord đã có bản tin ngày, nhưng TA vẫn cần tìm câu hỏi có thể bị bỏ sót. Sản phẩm của nhóm đọc CSV BTC để đề xuất câu cần chú ý, tóm tắt và mức quan trọng; TA quyết định xử lý. “Miss” chỉ là nghi vấn trong dữ liệu quan sát được, không khẳng định chưa ai hỗ trợ.

**Hiện có:** [HTML CP2](../../codebase/demo_cp2_dashboard.html) đọc CSV bằng quy tắc và hiển thị hai cột, chưa gọi AI. CP3 cần AI thật, video 30 giây và số đo trên ≥20 case. Mốc phút dưới đây tính từ lúc nhóm bắt đầu; giờ nộp 3B do Huy xác nhận.

**Phần của bạn:** nối các phần thành sản phẩm chạy được: nhận CSV từ giao diện Việt → ghép ngữ cảnh → gửi model bằng prompt Duyên → kiểm tra JSON trả về → đưa kết quả về giao diện. Endpoint là địa chỉ để giao diện gọi backend; trace là bản ghi chứng minh lời gọi AI đã chạy.

**Ví dụ giả lập:** câu hỏi lúc 10:00 báo không đăng nhập được, mốc đánh giá 18:00, chưa thấy trả lời phù hợp → AI đề xuất cần chú ý, tóm tắt lỗi và mức vừa; backend gắn thời gian, nguồn đúng từ CSV. Khi model lỗi, trả thông báo lỗi để Việt hiển thị.

**Bạn giao:** backend gọi AI thật, bản chạy tích hợp và hồ sơ nộp CP3.
**Branch:** cp3/huy-backend · **Làm tại:** team/van-thanh-huy/backend/.

1. Trong 30 phút đầu, thử một request AI thật; chốt model, endpoint và [contract](../contract.md) cho nhóm.
2. Đọc CSV, ghép reply/ngữ cảnh; gọi prompt Duyên gửi. Giữ ID/thời gian/nguồn từ CSV, validate output AI.
3. Phút 90 cùng Việt chạy một case từ UI đến kết quả. Backend phục vụ HTML cùng origin localhost.
4. Nhận kết quả test từ Đông, sửa lỗi chính; Duyên quay video. Bạn review và nộp theo form/hạn 3B.

**Nhận từ:** Việt: giao diện và format request cần gọi; Duyên: prompt/rubric; Đông: case và số đo. Huy phải gửi lại cho Việt URL + method endpoint, format request và response mẫu đúng contract; đây là gói bàn giao bắt buộc, không phải file đã có sẵn.
**Bàn giao:** backend/, hướng dẫn chạy và trace đã che key; tích hợp bản chính vào codebase/, kết quả vào eval/.

**Xong khi:** AI thật chạy end-to-end, lỗi API được báo, có lượt test đủ mọi case và video 30 giây.

**Lưu ý:** key ở backend; dataset giữ local; không loại câu chỉ vì có reply; tin chưa đủ 4 giờ ngoài cửa sổ đo. Bạn review PR và merge, không ghi đè phần người khác.
