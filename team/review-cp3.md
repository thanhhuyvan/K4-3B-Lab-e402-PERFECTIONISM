# Review vòng 2 — thiết kế và rủi ro CP3

Đây là review kế hoạch, không phải kết quả kiểm thử sản phẩm. Chưa có backend/AI thật được xác minh trong vòng này. Phân công và contract vẫn là đề xuất để trưởng nhóm chốt.

## Kết luận

Phạm vi bảng hai cột đủ nhỏ. Rủi ro lớn nhất nằm ở định nghĩa nhãn, tích hợp API và đo chất lượng toàn luồng. Không mở rộng tính năng trước CP3.

## Rủi ro và xử lý đề xuất

| Mức | Rủi ro | Xử lý / người phụ trách |
|---|---|---|
| Cao | Chưa chốt provider/model/key; cả nhóm làm xong nhưng không gọi AI được | Huy xác minh một request thật trong 30 phút đầu, không chia sẻ key qua repo |
| Cao | Huy ôm backend, tích hợp, chạy test và quay/nộp nên thành điểm nghẽn | Việt tự test kết nối frontend/backend; Đông chạy eval; Duyên chuẩn bị/quay video sau tích hợp; Huy giữ quyết định kỹ thuật, backend và review/nộp |
| Cao | Bộ lọc regex loại câu không dấu hỏi hoặc có reply trước khi AI xét | Test cả pipeline từ input tới bảng; case cần chú ý bị lọc mất phải tính là fail, không chỉ chấm các case model được thấy |
| Cao | Mặc định mọi thiếu ngữ cảnh đều cần chú ý gây báo động sai | Chỉ dùng uncertain cho ứng viên có dấu hiệu cần hỗ trợ nhưng bằng chứng xử lý chưa rõ; chào hỏi/cảm ơn/tin không liên quan phải có case âm |
| Cao | Có reply không đồng nghĩa giải quyết; không reply trong pack không chứng minh bị bỏ mặc | Giữ ngữ cảnh reply; nhãn hiển thị “có thể bị bỏ sót”; không suy diễn vai TA từ tác giả đã ẩn danh |
| Cao | Tin mới trong 4 giờ chưa đủ cửa sổ quan sát nhưng bị chấm là không cần hỗ trợ | Đánh dấu ngoài cửa sổ đánh giá, không coi là negative; test riêng biên 4 giờ và giữ số bị loại |
| Vừa | Gửi cả pack mỗi lượt gây chậm, phí cao và lộ nội dung không cần thiết | Huy giới hạn ngữ cảnh, batch nhỏ; ghi rõ phạm vi đã phân tích, không báo hoàn tất nếu chỉ chạy một phần |
| Vừa | Endpoint dự kiến và cách mở HTML file:// chưa thống nhất | Backend phục vụ luôn HTML trên localhost để dùng cùng origin; Việt xác nhận flow upload sớm |
| Vừa | Contract giữ uncertainty nhưng UI không hiện khiến người xem tin quá mức | Việt thêm nhãn chữ “cần xác minh” ngay trong cột summary; không thêm cột mới |
| Vừa | Golden set toàn case dương, trùng nhau hoặc case CSV thay thế case AI | Đông có cả positive/negative/uncertain; chọn case đa dạng. Kiểm tra parser riêng, không dùng lỗi parser để thay đủ các case chất lượng AI |
| Vừa | Survey nghiêng về học viên, chưa chứng minh tiết kiệm thời gian TA | Chỉ báo chất lượng trên golden set ở CP3; chưa tuyên bố giảm thời gian TA nếu chưa đo |
| Vừa | spec/README còn scope cũ trong khi demo đã thu gọn | Huy cập nhật mô tả đúng phần chạy được khi tích hợp; không ghi hoàn thành AI trước khi có trace |

## Điểm bàn giao nên đổi

- Phút 30: Huy có request AI thật, Việt có response mẫu khớp contract, Đông/Duyên thống nhất 5 case thử.
- Phút 90: ít nhất một case chạy xuyên suốt UI → backend → model → bảng. Không chờ đủ 120 phút mới tích hợp lần đầu.
- Phút 120: khóa tính năng, chuyển sang chạy toàn bộ test.
- Sau đó: sửa lỗi lớn, chạy lại trọn bộ nếu đổi logic/prompt; Duyên quay, Đông hoàn thiện bảng, Huy review/nộp.

## CP3 cần nộp/show

Đối chiếu README mục CP3 và 04-rubric.md dòng CP3 trong bộ đề local lớp 3A:

1. Video thao tác 30 giây: sản phẩm chạy và trả kết quả AI thật ở quyết định trung tâm.
2. Số đo: thử bao nhiêu, đạt bao nhiêu, tỷ lệ; không chỉ ghi “chạy tốt”.
3. Trong repo để kiểm chứng: golden set ≥20 case, ≥10 từ chatlog; phủ ≥2 case mỗi lớp khó, 8–10 thường, 2–4 hiếm; bảng ít nhất một lượt chạy đủ mọi case; prototype và log/trace AI đã lọc thông tin nhạy cảm.

Gợi ý artifact (chưa phải file đã có): eval/golden-set.json, eval/run-01.md, codebase/ mã chạy + hướng dẫn, trace đã lọc và link video. Case dài tham chiếu msg_id/nạp pack local; không công khai nguyên dataset.

Kết quả thấp vẫn báo trung thực. Chốt định nghĩa pass trước khi đo; quality bar chính thức khóa tại CP4 theo đề, không đổi để khớp kết quả.

## Chưa xác minh

- Hạn và form lớp 3B: bộ đề local là 3A; không áp ngày giờ 3A sang 3B.
- README nói đội trưởng nộp, rubric nói mỗi người nộp riêng. Đây là mâu thuẫn tài liệu; dùng hướng dẫn chính thức trong form/thông báo 3B, không tự khẳng định một cách nộp.
- Khả năng gọi API, thời gian xử lý và số đạt thực tế: chưa có phép đo.
