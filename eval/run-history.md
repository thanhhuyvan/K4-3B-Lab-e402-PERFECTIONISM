# Lịch sử các lượt đo CP3

| Run | Kết quả | Trạng thái | Ý nghĩa |
|---|---:|---|---|
| Run-01 | 20 / 22 = 90.9% | Tài liệu bàn giao trước đó | Có golden set và bảng kết quả, nhưng không có trace tương ứng với backend MVP hiện tại. Không dùng làm số nộp của bản hiện tại. |
| Run-02 | 4 / 22 = 18.2% | Baseline trước sửa | Phát hiện 10 case bị prefilter loại và test thiếu context. Giữ lại để thấy lỗi ban đầu. |
| Run-03 | 13 / 22 = 59.1% | Intermediate sau sửa filter/context | Đã chạy sau khi nới prefilter, thêm context và chỉnh comparator. Dùng để xác nhận hướng sửa đúng; output local bị ghi đè bởi Run-04 nên không dùng làm báo cáo chính thức. |
| Run-04 | 16 / 22 = 72.7% | **Lượt nộp CP3** | Đã thêm validation `importance=null` cho `uncertain`/`no_attention`, đủ 22 case, API error = 0. |
| Run-05 | 21 / 22 = 95.5% | Cải tiến sau CP3 | Policy rủi ro hẹp và verifier theo batch; đủ 22 case, API error = 0. |

## Cách đọc đúng

- Không cộng hoặc lấy trung bình các Run.
- Run-04 là số đã dùng khi nộp CP3. Run-05 là số cải tiến sau CP3, không ghi ngược vào bằng chứng CP3.
- Run-02 và Run-03 là bằng chứng nhóm đã đo, phát hiện lỗi, sửa và đo lại.
- Run-01 chỉ giữ để truy xuất lịch sử bàn giao; không dùng để khẳng định chất lượng MVP hiện tại.
