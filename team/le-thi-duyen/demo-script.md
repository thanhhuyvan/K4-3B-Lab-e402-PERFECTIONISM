# Kịch Bản Video Thao Tác CP3 (30 Giây) — Track B2 (PERFECTIONISM)

**Tác giả:** Lê Thị Duyên (Role: Content / Prompt & Rubric)  
**Tài liệu tham chiếu:** [team/contract.md](../contract.md) · [eval/run-01.md](../../eval/run-01.md)  
**Nhánh Git:** `cp3/duyen-prompt`  
**Thời lượng mục tiêu:** 30 giây (±2 giây)  
**Ngày cập nhật:** 18/09/2026  

---

## 1. Mục Tiêu Video
Chứng minh tính năng cốt lõi của sản phẩm tại Checkpoint 3:
1. Giao diện trực quan cho phép tải lên file CSV dữ liệu Discord.
2. Tích hợp Model AI thực tế để phân tích ngữ cảnh, phát hiện câu hỏi cần chú ý.
3. Hiển thị bảng kết quả 2 cột chuẩn: **Thời gian** | **Tóm tắt & Mức độ quan trọng** (có gắn nhãn "cần xác minh" cho case không chắc chắn).
4. Báo cáo số đo thực nghiệm khách quan từ đợt kiểm thử của Đông.

---

## 2. Checklist An Toàn & Bảo Mật Trước Khi Quay
> [!CAUTION]
> **Các điểm tuyệt đối không được để xuất hiện trong video:**
> - KHÔNG mở file cấu hình `.env`, terminal backend hoặc tab Network để lộ **API Key**.
> - KHÔNG cuộn lướt toàn bộ dataset CSV hoặc để lộ thông tin cá nhân học viên ngoài các tin nhắn mẫu.
> - Đảm bảo URL trình duyệt là `http://localhost:...` theo đúng quy chuẩn localhost của nhóm.

---

## 3. Kịch Bản Chi Tiết Từng Giây (Timeline Breakdown)

| Mốc thời gian | Hành động trên màn hình (Visual) | Lời thoại thuyết minh (Audio/Voiceover) | Ghi chú kỹ thuật |
|---|---|---|---|
| **00:00 – 00:05** *(5 giây)* | Quay màn hình Dashboard sản phẩm trên trình duyệt. Con trỏ chuột click chọn nút **"Tải lên file CSV"** và chọn file dữ liệu mẫu (`discord_qna_sample.csv`). | "Chào thầy cô và các bạn, đây là hệ thống AI hỗ trợ TA phát hiện câu hỏi học viên bị bỏ sót trên Discord của nhóm PERFECTIONISM." | Giao diện hiển thị rõ tên file CSV đã tải lên. |
| **00:05 – 00:12** *(7 giây)* | Click nút **"Phân tích với AI"**. Màn hình xuất hiện trạng thái Loading/Spinner xử lý dữ liệu gọi API backend thực tế. | "Hệ thống trích xuất các tin nhắn chờ quá 4 giờ và gửi ngữ cảnh đến mô hình AI để phân tích sự cố." | Thể hiện hệ thống gọi AI thật (thời gian phản hồi ~3-5s), không phải dữ liệu tĩnh bịa sẵn. |
| **00:12 – 00:22** *(10 giây)* | Bảng kết quả 2 cột xuất hiện mượt mà. Con trỏ chuột chỉ vào 2 case đặc trưng:<br>1. Case **[High]** lỗi CUDA chưa được giải quyết.<br>2. Case **[Cần xác minh]** (trạng thái `uncertain`) khi học viên báo lỗi nhưng thiếu ảnh bằng chứng. | "AI tự động tóm tắt ngắn gọn và phân loại mức độ: Lỗi kỹ thuật nghiêm trọng được đánh dấu Cao; các câu hỏi thiếu ngữ cảnh được gắn cờ Cần xác minh để TA chủ động rà soát." | Highlight trực quan cột *Tóm tắt & Mức độ quan trọng* theo đúng hợp đồng giao diện. |
| **00:22 – 00:30** *(8 giây)* | Camera/Màn hình chuyển hoặc hiển thị bảng tóm tắt số đo kiểm thử CP3 (từ báo cáo [eval/run-01.md](../../eval/run-01.md)). | "Trên bộ Golden Set 22 tình huống thực tế, sản phẩm đạt tỷ lệ chính xác 90.9%, lọc sót chỉ 4.5%. Cảm ơn các bạn đã theo dõi!" | Hiện rõ số đo: 22 case, Pass: 20 (90.9%), Fail: 2 (9.1%), False Negative: 1 (4.5%). |

---

## 4. Bàn Giao & Lưu Trữ Video
* **Định dạng video:** MP4 / WebM, độ phân giải tối thiểu 1080p, âm thanh thuyết minh rõ ràng.
* **Tên file quy ước:** `cp3_demo_perfectionism.mp4`
* **Vị trí bàn giao:** Gửi file video hoặc đường link Google Drive (để chế độ xem công khai) cho **Huy** đính kèm vào hồ sơ nộp bài CP3.
