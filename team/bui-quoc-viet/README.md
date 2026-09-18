# Việt — giao diện

**Bối cảnh:** Nhóm làm Track B2 cho TA/Mod (người hỗ trợ học viên). Bot Discord đã có bản tin ngày, nhưng TA vẫn cần tìm câu hỏi có thể bị bỏ sót. Sản phẩm của nhóm đọc CSV BTC để đề xuất câu cần chú ý, tóm tắt và mức quan trọng; TA quyết định xử lý. “Miss” chỉ là nghi vấn trong dữ liệu quan sát được, không khẳng định chưa ai hỗ trợ.

**Hiện có:** [HTML CP2](../../codebase/demo_cp2_dashboard.html) đọc CSV bằng quy tắc và hiển thị hai cột, chưa gọi AI. CP3 cần AI thật, video 30 giây và số đo trên ≥20 case. Mốc phút dưới đây tính từ lúc nhóm bắt đầu; giờ nộp 3B do Huy xác nhận.

**Phần của bạn:** giúp TA thao tác đơn giản. TA chọn file, bấm phân tích, chờ backend Huy trả kết quả rồi đọc/sort bảng. Bạn phụ trách hiển thị và tương tác; việc quyết định câu nào cần chú ý và mức quan trọng nằm ở backend/AI.

**Ví dụ giả lập một dòng:** Thời gian “10:00 · chờ 8 giờ” | “Vừa — Không đăng nhập được bài học. Nguồn: server/kênh/mã tin”. Nguồn chỉ là chữ. Nếu API trả uncertain, hiển thị “Cần xác minh”; nếu lỗi, hiển thị lỗi và nút thử lại.

**Bạn giao:** màn hình nạp CSV → gọi API → bảng hai cột.
**Branch:** cp3/viet-ui · **Làm tại:** team/bui-quoc-viet/ui/.

1. Lấy HTML thu gọn từ Huy làm nền. Chỉ giữ **Thời gian / Tóm tắt & mức độ quan trọng**; nguồn là chữ.
2. Nối endpoint Huy cung cấp theo [contract](../contract.md). Có loading, kết quả rỗng, lỗi và thử lại.
3. Sort thời gian/ưu tiên; nhãn “cần xác minh” khi uncertain, “chưa xác định” khi importance=null.
4. Phút 90 cùng Huy chạy một case xuyên suốt; sau đó kiểm tra API, sort, lỗi trên desktop/mobile.

**Nhận từ Huy:** sau khi backend được tích hợp, Huy gửi URL + method endpoint, format request CSV và response mẫu đúng [contract](../contract.md). Hiện repo chính mới có schema mẫu; endpoint thật chưa nằm trong thư mục này, nên không tự đoán URL.
**Giao Huy:** ui/ + vài dòng cách chạy, phần đã thử và lỗi còn tồn. Huy tích hợp vào codebase/.

**Xong khi:** nạp CSV, nhận AI thật, bảng/sort đúng, lỗi API không bị thay bằng mock.

**Lưu ý:** dùng textContent cho nội dung tin; không nhúng key/dataset; không thêm modal, mở nguồn, export hoặc sửa backend. Push branch riêng, Huy review/merge.
