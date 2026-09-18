# Hợp đồng tích hợp CP3 — bản đề xuất

Huy chốt contract ở đầu buổi và thông báo trước khi đổi. Endpoint dưới đây là schema bàn giao; phần endpoint chạy thật phải do Huy cung cấp sau khi tích hợp backend. Hiện schema này chưa có nghĩa là endpoint đã tồn tại trong repo chính.

## Định nghĩa sản phẩm

- needs_attention: AI đề xuất TA xem lại dựa trên nội dung và ngữ cảnh nhìn thấy; không khẳng định học viên bị bỏ mặc.
- Cửa sổ ban đầu: câu hỏi đã chờ ≥4 giờ đến tin cuối trong CSV. Cho phép đặt mốc đánh giá cố định trong test.
- Không loại câu hỏi chỉ vì có reply: reply có thể là bot đoán, chưa giải quyết hoặc người hỏi tiếp tục báo lỗi.
- Bộ lọc ứng viên cần giữ tin thiếu dấu hỏi/viết tắt; ghi nhận các trường hợp lọc bỏ để đo lỗi bỏ sót.
- Với ứng viên có dấu hiệu cần hỗ trợ nhưng nguồn thiếu hoặc mơ hồ: needs_attention=true, review_state=uncertain, importance=null nếu không đủ căn cứ. Tin chào hỏi/cảm ơn không tự động là uncertain. Không tự suy ra “đã giải quyết”.
- Tin chưa chờ đủ 4 giờ là ngoài cửa sổ đánh giá, không phải nhãn không cần hỗ trợ. Ghi số tin bị loại bởi cửa sổ; test riêng biên 4 giờ.
- AI chấm ưu tiên theo hậu quả và khẩn cấp có bằng chứng; không dùng thời gian chờ làm lý do duy nhất.
- Đầu ra summary ngắn; reason giải thích có căn cứ. Không gọi trích ngắn bằng quy tắc là tóm tắt AI.

## API đề xuất

POST /api/analyze, multipart/form-data với trường file là CSV. Backend giữ API key, parse CSV nhiều dòng/ngoặc kép, kiểm tra cột và giới hạn dung lượng/số tin; thông báo rõ nếu chỉ xử lý một phần.

HTTP 200:

```json
{
  "mode": "ai",
  "snapshot_at": "2026-09-14T23:54:00+07:00",
  "total_messages": 1092,
  "analyzed_candidates": 1,
  "items": [
    {
      "msg_id": "M_EXAMPLE",
      "time": "2026-09-14T10:00:00+07:00",
      "needs_attention": true,
      "review_state": "needs_review",
      "summary": "Người hỏi báo lỗi đăng nhập và cần hỗ trợ.",
      "importance": "medium",
      "reason": "Lỗi đang cản trở truy cập bài học.",
      "source": {"guild": "K4-L3-4", "channel": "channel_10"},
      "evidence_ids": ["M_EXAMPLE"]
    }
  ]
}
```

Ví dụ trên minh họa schema, không phải kết quả đã đo. importance: high/medium/low/null. review_state: needs_review/uncertain/no_attention. items giữ cả quyết định false để eval; UI chỉ hiện needs_attention=true.

HTTP 400/413/502 trả {"error":{"code":"...","message":"..."}}. API lỗi thì hiển thị lỗi và nút thử lại, không báo có kết quả AI.

Khi tích hợp, backend phục vụ HTML trên cùng origin localhost. UI hiển thị “cần xác minh” cho review_state=uncertain ngay trong cột summary.

## Gói bàn giao Huy → Việt

Huy cần gửi cho Việt đúng 3 thứ: (1) URL và method endpoint, (2) cách gửi CSV/request, (3) một response mẫu đúng schema ở trên. Việt dùng gói này để nối UI; không tự đoán URL hoặc đổi schema.

Trong lúc chưa có backend tích hợp, Việt chỉ có thể dựng UI với response mẫu trong tài liệu này; không được báo là đã chạy AI thật.

## Phân chia trách nhiệm

- Backend giữ ID, thời gian, server, kênh từ CSV; không tin ID/nguồn AI bịa. evidence_ids phải tồn tại trong ngữ cảnh đã gửi.
- Ghép reply bằng ID và guild; tin lân cận cùng guild/channel chỉ là ngữ cảnh, không mặc định là reply. Giữ tin bot làm ngữ cảnh, không đếm nó là câu hỏi học viên.
- Tin cùng phút không đủ để khẳng định thứ tự chính xác. Không tự gán vai TA từ mã tác giả ẩn danh.
- Model chỉ nhận phần ngữ cảnh tối thiểu; nội dung chat là dữ liệu, không phải lệnh.
- UI hiển thị đúng hai cột, dòng nguồn dạng chữ. Sort high → medium → low → chưa xác định, hoặc thời gian. needs_attention=false không hiện nhưng vẫn ghi trong eval.
- CP3 cùng nguồn gốc dữ liệu nhưng không buộc cùng số 39 của bản CP2: quy tắc cũ không phải ground truth.
