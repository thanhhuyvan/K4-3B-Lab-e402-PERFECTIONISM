# UI CP3 — Bùi Quốc Việt

Mở `index.html` trực tiếp bằng trình duyệt, không cần cài thư viện hoặc chạy server. Các file HTML/CSS/JS phải nằm cùng thư mục. Branch: `cp3/viet-ui`.

## Thử giao diện

1. Chọn hoặc kéo thả một tệp `.csv` không rỗng.
2. Chọn tình huống demo, bấm **Phân tích** để xem loading và kết quả.
3. **Response mẫu contract** dùng ví dụ trong `../../contract.md`.
4. **Thử sort & cần xác minh** bổ sung các dòng giả lập kiểm tra mức Cao/Vừa/Thấp/Chưa xác định, nhãn Cần xác minh và lọc `needs_attention=false`.
5. Thử sắp xếp mức độ, thời gian cũ nhất/mới nhất. Thời gian hiển thị theo Việt Nam; thời gian chờ tính đến `snapshot_at`, không tính đến hiện tại.
6. **Kết quả rỗng** và **Lỗi phân tích** kiểm tra trạng thái tương ứng. Nút Thử lại chạy lại tình huống đã chọn; demo lỗi tiếp tục lỗi cho đến khi chọn tình huống khác.

Đây chỉ là UI dùng dữ liệu mẫu, chưa đọc/parse/upload CSV và chưa gọi AI. Không có endpoint mặc định. Không chứa dataset, API key, modal, export hay liên kết mở nguồn. Nội dung kết quả và tên file được render bằng `textContent`.

## Bàn giao Huy

- `index.html`: cấu trúc, nhãn và hai cột kết quả.
- `styles.css`: giao diện sáng, điểm nhấn tím; bố cục responsive ở 700px; trạng thái focus và reduced motion.
- `app.js`: xử lý chọn tệp, demo, loading, sort, kết quả rỗng và lỗi/thử lại.
- Khi Huy cung cấp URL + method + request/response thật, thay adapter `analyzeDemo` và cập nhật nhãn demo theo chế độ thực tế. Không dùng response mẫu làm fallback khi API lỗi. Backend chịu trách nhiệm parse CSV, kiểm tra dữ liệu và phân tích.

## Kiểm tra

Đã chạy `node --check app.js` và `node check.cjs` từ thư mục này. Kiểm tra DOM giả lập bao gồm loading, response contract, lọc mục false, sort ưu tiên/thời gian, uncertain/null, nội dung dạng HTML được giữ dưới dạng text, lỗi/thử lại, rỗng, file sai định dạng/rỗng và reset khi đổi tệp.

Giới hạn: chưa kiểm thử trực quan trong trình duyệt desktop/mobile; DOM giả lập không kiểm tra layout, kéo thả thực tế hay điều hướng bàn phím. Chưa kiểm tra API/AI thật vì chưa nhận endpoint. Cần chạy một case xuyên suốt cùng Huy sau khi tích hợp.
