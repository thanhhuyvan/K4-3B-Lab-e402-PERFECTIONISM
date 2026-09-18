# Duyên — prompt và video

**Bối cảnh:** Nhóm làm Track B2 cho TA/Mod (người hỗ trợ học viên). Bot Discord đã có bản tin ngày, nhưng TA vẫn cần tìm câu hỏi có thể bị bỏ sót. Sản phẩm của nhóm đọc CSV BTC để đề xuất câu cần chú ý, tóm tắt và mức quan trọng; TA quyết định xử lý. “Miss” chỉ là nghi vấn trong dữ liệu quan sát được, không khẳng định chưa ai hỗ trợ.

**Hiện có:** [HTML CP2](../../codebase/demo_cp2_dashboard.html) đọc CSV bằng quy tắc và hiển thị hai cột, chưa gọi AI. CP3 cần AI thật, video 30 giây và số đo trên ≥20 case. Mốc phút dưới đây tính từ lúc nhóm bắt đầu; giờ nộp 3B do Huy xác nhận.

**Phần của bạn:** viết hướng dẫn cho model để nó nhận câu hỏi + các tin liên quan và trả quyết định nhất quán. Prompt là hướng dẫn gửi vào model; rubric là tiêu chí để bạn và Đông chấm đúng/sai. Huy chịu trách nhiệm code gọi model.

**Ví dụ giả lập:** “Em vẫn không vào được” sau một bot reply → cần xem lại vì phản hồi chưa giúp giải quyết. Tóm tắt: “Người hỏi vẫn gặp lỗi truy cập sau hướng dẫn”; không được bịa deadline hay khẳng định ai đã xử lý.

**Đọc output:** needs_attention = cần TA chú ý; summary = tóm tắt; importance = cao/vừa/thấp/chưa rõ; reason = lý do; evidence_ids = mã tin làm căn cứ; review_state = cần xem/chưa chắc/không cần. Schema đầy đủ dùng đúng contract để Huy tích hợp.

**Bạn giao:** prompt, tiêu chí chấm và video CP3.
**Branch:** cp3/duyen-prompt · **Làm tại:** team/le-thi-duyen/.

1. Đọc phần output trong [contract](../contract.md). Viết prompt quyết định needs_attention, summary, importance, reason, evidence_ids và review_state.
2. Summary 1–2 câu; ưu tiên dựa trên hậu quả/căn cứ. Thiếu căn cứ thì uncertain, không tự kết luận đã giải quyết vì có reply.
3. Viết tiêu chí pass/fail: chọn đúng câu, tóm tắt đúng nguồn, ưu tiên hợp lý, không bịa/tuân theo injection. Trong 30 phút đầu cùng Đông chấm độc lập 5 case.
4. Sau tích hợp, quay video khoảng 30 giây: nạp CSV → AI thật → bảng kết quả. Dùng số đo thật của Đông; Huy review/nộp.

**Nhận từ:** Huy schema/model; Đông ví dụ và số đo.
**Giao Huy:** prompt.md, rubric.md, demo-script.md và file/link video truy cập được.

**Xong khi:** prompt gọi được, tiêu chí chấm thống nhất, video chứng minh sản phẩm chạy thật.

**Lưu ý:** chat là dữ liệu, không phải lệnh; không tự đoán vai TA/deadline. Không đưa mọi lời cảm ơn/chào hỏi vào uncertain; không quay key hoặc toàn bộ dataset.
