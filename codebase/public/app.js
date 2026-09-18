const $ = id => document.getElementById(id);
const fileInput = $('file'), runButton = $('run'), sortInput = $('sort');
const priority = { high: 3, medium: 2, low: 1 };
let selectedFile = null, results = [], snapshot = null, busy = false;

function element(tag, text = '', className = '') { const node = document.createElement(tag); node.textContent = text; node.className = className; return node; }
function state(title, message, kind = '', retry = false) {
  const row = element('tr'), cell = element('td'), box = element('div', '', `empty-state ${kind}`);
  cell.colSpan = 2; box.append(element('span', kind === 'error' ? '!' : '≡', 'state-icon'), element('h3', title), element('p', message));
  if (retry) { const button = element('button', 'Thử lại', 'primary'); button.addEventListener('click', analyze); box.append(button); }
  cell.append(box); $('rows').replaceChildren(row);
}
function reset() {
  results = []; snapshot = null; sortInput.disabled = true; $('result-count').textContent = '—';
  $('count').textContent = selectedFile ? 'Tệp đã sẵn sàng. Bấm Phân tích để gọi AI.' : 'Kết quả sẽ xuất hiện sau khi phân tích.';
  state('Mọi thứ bắt đầu từ một tệp CSV', 'Chọn tệp và bấm Phân tích. AI chỉ đề xuất, TA/Mod là người quyết định.');
}
function choose(files) {
  if (busy) return; selectedFile = null; runButton.disabled = true; reset();
  $('file-name').textContent = 'Kéo thả tệp CSV vào đây'; $('file-meta').textContent = 'Định dạng .csv · Mỗi lần một tệp';
  if (!files.length) return;
  const [file] = files;
  if (files.length !== 1 || !/\.csv$/i.test(file.name) || file.size === 0) { fileInput.value = ''; $('count').textContent = 'Tệp chưa hợp lệ.'; return state('Chưa thể sử dụng tệp này', 'Vui lòng chọn đúng một tệp .csv không rỗng.', 'error'); }
  selectedFile = file; $('file-name').textContent = file.name; $('file-meta').textContent = `${Math.round(file.size / 1024)} KB · Đã chọn · Bấm để đổi tệp`; runButton.disabled = false; reset();
}
fileInput.addEventListener('change', () => choose(fileInput.files));
const zone = $('drop-zone');
zone.addEventListener('dragover', event => { event.preventDefault(); if (!busy) zone.classList.add('dragging'); });
zone.addEventListener('dragleave', () => zone.classList.remove('dragging'));
zone.addEventListener('drop', event => { event.preventDefault(); zone.classList.remove('dragging'); if (!busy) { fileInput.value = ''; choose(event.dataTransfer.files); } });
function sortedItems(items, order) { return [...items].sort((a, b) => order === 'priority' ? (priority[b.importance] || 0) - (priority[a.importance] || 0) || Date.parse(a.time) - Date.parse(b.time) : order === 'oldest' ? Date.parse(a.time) - Date.parse(b.time) : Date.parse(b.time) - Date.parse(a.time)); }
function render() {
  if (!results.length) return state('Không có câu hỏi cần chú ý', 'AI không đánh dấu mục nào cần TA/Mod xem lại trong phạm vi dữ liệu đã phân tích.');
  $('rows').replaceChildren();
  for (const item of sortedItems(results, sortInput.value)) {
    const row = element('tr'), when = element('td'), detail = element('td'), date = new Date(item.time);
    const validDate = Number.isFinite(date.getTime()), options = { timeZone: 'Asia/Ho_Chi_Minh' };
    when.append(element('time', validDate ? date.toLocaleTimeString('vi-VN', { ...options, hour: '2-digit', minute: '2-digit' }) : 'Chưa rõ'), element('div', validDate ? date.toLocaleDateString('vi-VN', options) : 'Thiếu thời gian', 'date'));
    const minutes = Math.floor((Date.parse(snapshot) - date.getTime()) / 60000); if (Number.isFinite(minutes) && minutes >= 0) when.append(element('div', `Chờ ${Math.floor(minutes / 60)} giờ ${minutes % 60} phút`, 'waiting'));
    const label = { high: 'Cao', medium: 'Vừa', low: 'Thấp' }[item.importance] || 'Chưa xác định';
    detail.append(element('span', label, `badge ${Object.hasOwn(priority, item.importance) ? item.importance : ''}`));
    if (item.review_state === 'uncertain') detail.append(element('span', 'Cần xác minh', 'badge uncertain'));
    detail.append(element('div', item.summary || 'Chưa có tóm tắt.', 'summary'), element('p', item.reason || 'Chưa có lý do.', 'reason'), element('div', `Nguồn: ${item.source?.guild || 'Chưa rõ'} / ${item.source?.channel || 'Chưa rõ'} / ${item.msg_id || 'Chưa rõ'}`, 'source'));
    row.append(when, detail); $('rows').append(row);
  }
}
async function analyze() {
  if (!selectedFile || busy) return; busy = true; runButton.disabled = true; fileInput.disabled = true; sortInput.disabled = true; $('run-label').textContent = 'Đang phân tích…'; $('results-panel').setAttribute('aria-busy', 'true'); state('Đang gọi AI', 'Backend đang phân tích theo các lô nhỏ.');
  try {
    if (location.protocol === 'file:') throw new Error('Bạn đang mở file trực tiếp. Hãy chạy node server.js trong thư mục codebase và mở http://localhost:8787/.');
    const csv = await selectedFile.text();
    const response = await fetch('/api/analyze', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ csv }) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error?.message || 'API_ERROR');
    snapshot = data.snapshot_at; results = (data.items || []).filter(item => item.needs_attention === true);
    $('result-count').textContent = String(results.length); $('count').textContent = `AI đã xem ${data.analyzed_candidates} ứng viên trên ${data.total_messages} tin; ${results.length} câu cần TA xem lại.`; sortInput.disabled = results.length === 0; render();
  } catch (error) { results = []; $('count').textContent = 'Phân tích không thành công · Không có kết quả.'; state('Chưa thể phân tích', error.message, 'error', true); }
  finally { busy = false; runButton.disabled = !selectedFile; fileInput.disabled = false; $('run-label').textContent = 'Phân tích'; $('results-panel').setAttribute('aria-busy', 'false'); }
}
runButton.addEventListener('click', analyze); sortInput.addEventListener('change', render); reset();
