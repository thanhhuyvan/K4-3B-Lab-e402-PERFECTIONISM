// Demo adapter only. Replace analyzeDemo after Huy supplies the actual API contract.
// Never fall back to these fixtures when a real API request fails.
const SAMPLE_RESPONSE = {
  mode: 'ai', snapshot_at: '2026-09-14T23:54:00+07:00',
  total_messages: 1092, analyzed_candidates: 1,
  items: [{ msg_id: 'M_EXAMPLE', time: '2026-09-14T10:00:00+07:00',
    needs_attention: true, review_state: 'needs_review',
    summary: 'Người hỏi báo lỗi đăng nhập và cần hỗ trợ.', importance: 'medium',
    reason: 'Lỗi đang cản trở truy cập bài học.',
    source: { guild: 'K4-L3-4', channel: 'channel_10' }, evidence_ids: ['M_EXAMPLE'] }]
};
const $ = id => document.getElementById(id);
const fileInput = $('file'), runButton = $('run'), sortInput = $('sort');
let selectedFile = null, results = [], snapshot = null, busy = false;
const priority = { high: 3, medium: 2, low: 1 };
function element(tag, text = '', className = '') {
  const node = document.createElement(tag);
  node.textContent = text;
  node.className = className;
  return node;
}
function state(title, message, kind = '', retry = false) {
  const row = element('tr'), cell = element('td'), box = element('div', '', `empty-state ${kind}`);
  cell.colSpan = 2;
  const icon = element('span', kind === 'error' ? '!' : kind === 'loading' ? '' : '≡', 'state-icon');
  icon.setAttribute('aria-hidden', 'true');
  if (kind === 'loading') icon.append(element('span', '', 'spinner'));
  box.append(icon, element('h3', title), element('p', message));
  if (kind === 'error') box.setAttribute('role', 'alert');
  if (retry) {
    const button = element('button', 'Thử lại', 'primary');
    button.addEventListener('click', analyze);
    box.append(button);
  }
  cell.append(box); row.append(cell); $('rows').replaceChildren(row);
}
function reset() {
  results = []; snapshot = null; sortInput.disabled = true;
  $('result-count').textContent = '—';
  $('count').textContent = selectedFile ? 'Tệp đã sẵn sàng. Bấm Phân tích để xem dữ liệu mẫu.' : 'Kết quả sẽ xuất hiện sau khi phân tích.';
  state('Mọi thứ bắt đầu từ một tệp CSV', 'Chọn tệp và bấm Phân tích. Các câu hỏi cần xem lại sẽ được tập hợp tại đây.');
}
function choose(files) {
  if (busy) return;
  selectedFile = null;
  $('file-name').textContent = 'Kéo thả tệp CSV vào đây';
  $('file-meta').textContent = 'Định dạng .csv · Mỗi lần một tệp';
  runButton.disabled = true;
  reset();
  if (!files.length) return;
  if (files.length !== 1 || !/\.csv$/i.test(files[0].name) || files[0].size === 0) {
    fileInput.value = '';
    $('count').textContent = 'Tệp chưa hợp lệ.';
    state('Chưa thể sử dụng tệp này', 'Vui lòng chọn đúng một tệp .csv không rỗng.', 'error');
    return;
  }
  selectedFile = files[0];
  $('file-name').textContent = selectedFile.name;
  $('file-meta').textContent = `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 }).format(selectedFile.size / 1024)} KB · Đã chọn · Bấm để đổi tệp`;
  runButton.disabled = false;
  $('count').textContent = 'Tệp đã sẵn sàng. Bấm Phân tích để xem dữ liệu mẫu.';
}
fileInput.addEventListener('change', () => choose(fileInput.files));
const zone = $('drop-zone');
zone.addEventListener('dragover', event => { event.preventDefault(); if (!busy) zone.classList.add('dragging'); });
zone.addEventListener('dragleave', () => zone.classList.remove('dragging'));
zone.addEventListener('drop', event => {
  event.preventDefault(); zone.classList.remove('dragging');
  if (!busy) { fileInput.value = ''; choose(event.dataTransfer.files); }
});
$('scenario').addEventListener('change', reset);
async function analyzeDemo(scenario) {
  await new Promise(resolve => setTimeout(resolve, 900));
  if (scenario === 'error') throw new Error('Lỗi 502 giả lập: dịch vụ phân tích tạm thời không phản hồi. Bạn có thể thử lại hoặc chọn tình huống demo khác.');
  const response = structuredClone(SAMPLE_RESPONSE);
  if (scenario === 'empty') response.items = [];
  if (scenario === 'mixed') {
    // Synthetic UI fixtures, not learner data or AI output.
    const fixture = (id, hour, importance, summary, review_state = 'needs_review') => ({
      ...structuredClone(response.items[0]), msg_id: id, evidence_ids: [id],
      time: `2026-09-14T${hour}:00:00+07:00`, importance, summary, review_state,
      reason: 'Nội dung giả lập để kiểm tra giao diện; không phải kết luận AI.',
      source: { guild: 'DEMO', channel: 'kiem-thu-ui' }
    });
    response.items.push(
      fixture('DEMO_HIGH', '12', 'high', 'Ví dụ giả lập: không nộp được bài khi gần đến hạn.'),
      fixture('DEMO_LOW', '08', 'low', 'Ví dụ giả lập: cần hướng dẫn tìm tài liệu tham khảo.'),
      fixture('DEMO_UNCERTAIN', '09', null, 'Ví dụ giả lập: chưa đủ ngữ cảnh để xác định mức độ.', 'uncertain'),
      { ...fixture('DEMO_HIDDEN', '07', 'low', 'Không hiển thị vì needs_attention=false.'), needs_attention: false, review_state: 'no_attention' }
    );
    response.total_messages = response.items.length;
  }
  response.analyzed_candidates = response.items.length;
  return response;
}
async function analyze() {
  if (!selectedFile || busy) return;
  busy = true; results = []; sortInput.disabled = true;
  runButton.disabled = true; fileInput.disabled = true; $('scenario').disabled = true;
  $('results-panel').setAttribute('aria-busy', 'true');
  $('run-label').textContent = 'Đang phân tích…';
  $('result-count').textContent = '—'; $('count').textContent = 'Đang mô phỏng quá trình phân tích…';
  state('Đang chuẩn bị kết quả mẫu', 'Vui lòng chờ trong giây lát.', 'loading');
  try {
    const response = await analyzeDemo($('scenario').value);
    snapshot = response.snapshot_at;
    results = response.items.filter(item => item.needs_attention === true);
    $('count').textContent = `Dữ liệu mẫu · ${results.length} câu cần chú ý · Không phải kết quả từ CSV đã chọn.`;
    $('result-count').textContent = String(results.length);
    sortInput.disabled = results.length === 0;
    render();
  } catch (error) {
    results = []; $('count').textContent = 'Phân tích không thành công · Không có kết quả.';
    state('Chưa thể phân tích', error.message, 'error', true);
  } finally {
    busy = false; runButton.disabled = !selectedFile; fileInput.disabled = false; $('scenario').disabled = false;
    $('run-label').textContent = 'Phân tích'; $('results-panel').setAttribute('aria-busy', 'false');
  }
}
function sortedItems(items, order) {
  return [...items].sort((a, b) => {
    if (order === 'priority') return (priority[b.importance] || 0) - (priority[a.importance] || 0) || Date.parse(a.time) - Date.parse(b.time);
    return order === 'oldest' ? Date.parse(a.time) - Date.parse(b.time) : Date.parse(b.time) - Date.parse(a.time);
  });
}
function render() {
  if (busy && !snapshot) return;
  if (!results.length) { state('Không có câu hỏi cần chú ý', 'Response mẫu không có mục nào được đánh dấu cần xem lại.'); return; }
  $('rows').replaceChildren();
  for (const item of sortedItems(results, sortInput.value)) {
    const row = element('tr'), when = element('td'), detail = element('td');
    const date = new Date(item.time), validDate = Number.isFinite(date.getTime());
    const options = { timeZone: 'Asia/Ho_Chi_Minh' };
    const time = element('time', validDate ? date.toLocaleTimeString('vi-VN', { ...options, hour: '2-digit', minute: '2-digit' }) : 'Chưa rõ');
    if (validDate) time.dateTime = item.time;
    when.append(time, element('div', validDate ? date.toLocaleDateString('vi-VN', options) : 'Thiếu thời gian', 'date'));
    const minutes = Math.floor((Date.parse(snapshot) - date.getTime()) / 60000);
    if (Number.isFinite(minutes) && minutes >= 0) when.append(element('div', `Chờ ${Math.floor(minutes / 60)} giờ ${minutes % 60} phút`, 'waiting'));
    const label = { high: 'Cao', medium: 'Vừa', low: 'Thấp' }[item.importance] || 'Chưa xác định';
    detail.append(element('span', label, `badge ${Object.hasOwn(priority, item.importance) ? item.importance : ''}`));
    if (item.review_state === 'uncertain') detail.append(element('span', 'Cần xác minh', 'badge uncertain'));
    detail.append(element('div', item.summary || 'Chưa có tóm tắt.', 'summary'),
      element('p', item.reason || 'Chưa có lý do.', 'reason'),
      element('div', `Nguồn: ${item.source?.guild || 'Chưa rõ'} / ${item.source?.channel || 'Chưa rõ'} / ${item.msg_id || 'Chưa rõ'}`, 'source'));
    row.append(when, detail); $('rows').append(row);
  }
}
runButton.addEventListener('click', analyze);
sortInput.addEventListener('change', render);
reset();
