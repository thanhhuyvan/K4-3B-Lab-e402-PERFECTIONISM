# CP3 — Trạm hỗ trợ Discord

Chạy bản CP3 local:

```powershell
Copy-Item .env.example .env
# Điền GOOGLE_API_KEY vào .env local, không commit file này.
node server.js
```

Mở `http://localhost:8787`. Chọn CSV BTC từ máy, bấm **Phân tích**. Backend đọc CSV, giữ reply làm ngữ cảnh, gọi Gemini theo từng lô 8 candidate và trả bảng hai cột cho UI.

- Key chỉ nằm ở backend local; CSV không được commit.
- UI chỉ hiển thị các mục AI đánh dấu `needs_attention=true`; `uncertain` hiện nhãn **Cần xác minh**.
- Nguồn chỉ là `server / kênh / msg_id`, không có link mở nội dung.
- Nếu API lỗi, UI hiển thị lỗi; không fallback sang dữ liệu demo.
- `demo_cp2_dashboard.html` là bản CP2 cũ, không có AI.
