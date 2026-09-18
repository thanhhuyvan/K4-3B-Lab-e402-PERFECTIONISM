# Evaluation

- `golden-set.csv`: tối thiểu 20 case, gồm case thường, case hiếm và case phủ 4 lớp rủi ro.
- `run-01.md`: kết quả chạy trọn bộ đầu tiên, kể cả case fail.
- Không commit nguyên file dữ liệu Discord; chỉ trích dẫn tối thiểu và dùng `msg_id`.

## Chạy lại golden set với MVP hiện tại

1. Chạy `node server.js` trong `codebase/`.
2. Chỉ sau khi đã được phép gửi 22 nội dung golden set sang model, chạy ở root repo:

```powershell
$env:ALLOW_GOLDEN_SET_API='true'
node eval/run-current.cjs
```

Script gửi từng case một tới localhost, đối chiếu `needs_attention` + `review_state` + `importance`, và ghi kết quả local ở `data-local/eval-current-results.json`. File output bị ignore; chỉ đưa bảng tổng hợp đã lọc vào repo.

Baseline trước sửa nằm ở [run-02-current.md](run-02-current.md). Lượt dùng để nộp của MVP hiện tại là [run-04-current.md](run-04-current.md): 16/22 (72.7%). `run-01.md` là tài liệu trước đó, không dùng thay cho kết quả này.

Các lỗi, nguyên nhân và hướng xử lý sau Run-04 nằm ở [failure-log-run-04.md](failure-log-run-04.md). Bản cải tiến sau CP3 là [run-05-current.md](run-05-current.md), đạt 21/22 (95.5%) với API error = 0; failure log tương ứng là [failure-log-run-05.md](failure-log-run-05.md).

Lịch sử Run-01 đến Run-05 nằm ở [run-history.md](run-history.md). Run-04 là số đã dùng cho CP3; Run-05 chỉ là cải tiến hậu checkpoint.
