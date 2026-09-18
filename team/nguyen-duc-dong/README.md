# Đông — bộ test và số đo

**Bối cảnh:** Nhóm làm Track B2 cho TA/Mod (người hỗ trợ học viên). Bot Discord đã có bản tin ngày, nhưng TA vẫn cần tìm câu hỏi có thể bị bỏ sót. Sản phẩm của nhóm đọc CSV BTC để đề xuất câu cần chú ý, tóm tắt và mức quan trọng; TA quyết định xử lý. “Miss” chỉ là nghi vấn trong dữ liệu quan sát được, không khẳng định chưa ai hỗ trợ.

**Hiện có:** [HTML CP2](../../codebase/demo_cp2_dashboard.html) đọc CSV bằng quy tắc và hiển thị hai cột, chưa gọi AI. CP3 cần AI thật, video 30 giây và số đo trên ≥20 case. Mốc phút dưới đây tính từ lúc nhóm bắt đầu; giờ nộp 3B do Huy xác nhận.

**Phần của bạn:** kiểm tra sản phẩm có chọn đúng câu cần hỗ trợ không. Golden set là bộ tình huống có đáp án nhóm xác định trước; mỗi case gồm câu hỏi, ngữ cảnh và kết quả mong đợi. Chạy sản phẩm rồi so với đáp án, không dùng kết luận của AI làm đáp án chuẩn.

**Ví dụ giả lập:** học viên báo lỗi, bot trả lời chung chung, học viên nhắn “vẫn lỗi” → mong đợi cần chú ý. Nếu học viên xác nhận “đã làm được” → có thể không cần chú ý. Chọn nhầm là báo động sai; lọc mất câu cần hỗ trợ là bỏ sót. Những ví dụ này không phải bằng chứng lấy từ CSV.

**Dữ liệu:** nhận đường dẫn pack local từ Huy/BTC; giữ msg_id khi chọn case thật. Chấm quyết định trong phạm vi dữ liệu có được, không đoán chuyện ngoài Discord.

**Bạn giao:** golden set và bảng kết quả CP3.
**Branch:** cp3/dong-eval · **Làm tại:** team/nguyen-duc-dong/.

1. Trong 30 phút đầu, cùng Duyên chấm độc lập 5 case rồi thống nhất nhãn.
2. Soạn ≥20 case, ≥10 từ chatlog. Gợi ý 22 case: 10 thường, 8 khó, 4 hiếm; có cả cần chú ý, không cần và chưa chắc.
3. Mỗi case ghi nguồn msg_id, input/ngữ cảnh tối thiểu, mốc thời gian, kết quả mong đợi và lý do.
4. Từ phút 120 chạy toàn bộ qua bản Huy tích hợp. Ghi output, pass/fail và lỗi API; báo số đạt/tổng, %, bỏ sót và báo động sai.

**Case khó:** thiếu nguồn; câu mơ hồ; prompt injection/ngoài quyền; bot đã reply nhưng người hỏi vẫn kẹt. Mỗi lớp ≥2 case. Test parser riêng, không thay thế case AI.

**Nhận từ:** Duyên tiêu chí chấm; Huy cách chạy.
**Giao Huy:** golden-set.json + run-01.md (đủ mọi case và tổng hợp); Huy đưa vào eval/.

**Xong khi:** đủ case, nhãn có căn cứ, kết quả tái kiểm được. Đổi prompt/logic thì chạy lại trọn bộ.

**Lưu ý:** tính cả case bị bộ lọc bỏ sót; không coi tin chưa đủ 4 giờ là negative; không lấy 39 case CP2 làm đáp án chuẩn. Không push nguyên pack hoặc sửa nhãn cho đẹp số.
