# CP3 — Trạm hỗ trợ Discord

Chạy bản CP3 local:

```powershell
Copy-Item .env.example .env
# Điền GOOGLE_API_KEY vào .env local, không commit file này.
node server.js
```

Mở `http://localhost:8787`. Trang tự nạp batch từ **Discord simulator** và gọi Gemini; TA chỉ cần xem bản tin hoặc bấm **Làm mới bản tin**.

Discord simulator đọc `demo-data/discord-simulator-batch.json` ở backend. File này là batch ẩn danh mô phỏng dữ liệu Discord, không phải tính năng upload CSV. Khi triển khai thật, chỉ cần thay simulator bằng Discord API/webhook; contract đưa vào AI và UI không đổi.

- Key chỉ nằm ở backend local; dữ liệu BTC thô không được commit.
- UI chỉ hiển thị các mục AI đánh dấu `needs_attention=true`; `uncertain` hiện nhãn **Cần xác minh**.
- Nguồn chỉ là `server / kênh / msg_id`, không có link mở nội dung.
- Nếu API lỗi, UI hiển thị lỗi và không giả kết quả thành công.
- `demo_cp2_dashboard.html` là bản CP2 cũ, không có AI.
