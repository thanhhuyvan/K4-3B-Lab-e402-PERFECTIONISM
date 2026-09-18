const $ = id => document.getElementById(id);
const runButton = $('run'), sortInput = $('sort');
const contextDialog = $('context-dialog'), contextMessages = $('context-messages');
const priority = { high: 3, medium: 2, low: 1 };
let results = [], snapshot = null, busy = false;
const workStates = { pending: 'Chưa xử lý', seen: 'Đã xem', done: 'Đã xử lý' };
let pipelineTimer = null, toastTimer = null;

function readWorkState(id) { return localStorage.getItem(`ta-work-state:${id}`) || 'pending'; }
function writeWorkState(id, value) { localStorage.setItem(`ta-work-state:${id}`, value); }
function showToast(message) {
  const toast = $('toast'); toast.textContent = message; toast.hidden = false; toast.classList.remove('show'); requestAnimationFrame(() => toast.classList.add('show'));
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.classList.remove('show'); setTimeout(() => { toast.hidden = true; }, 180); }, 2200);
}
function setRefreshState(active, message = '') {
  const overlay = $('refresh-overlay'); $('results-panel').classList.toggle('is-refreshing', active); overlay.hidden = !active;
  if (message) $('refresh-message').textContent = message;
}
function setPipeline(message, nextMessage = '') {
  $('sync-status').textContent = message; clearTimeout(pipelineTimer);
  if (nextMessage) pipelineTimer = setTimeout(() => { if (busy) setPipeline(nextMessage); }, 420);
}
function updateProgress() {
  const total = results.length, completed = results.filter(item => readWorkState(item.msg_id) === 'done').length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  $('progress-text').textContent = total ? `${completed}/${total} mục đã xử lý · ${total - completed} mục còn lại` : 'Chưa có mục cần xử lý';
  $('progress-value').style.width = `${percent}%`; $('progress-value').parentElement.setAttribute('aria-valuemax', String(total)); $('progress-value').parentElement.setAttribute('aria-valuenow', String(completed));
}

function element(tag, text = '', className = '') { const node = document.createElement(tag); node.textContent = text; node.className = className; return node; }
function state(title, message, kind = '', retry = false) {
  const row = element('tr'), cell = element('td'), box = element('div', '', `empty-state ${kind}`);
  const icon = kind === 'loading' ? element('span', '', 'state-icon spinner') : element('span', kind === 'error' ? '!' : '≡', 'state-icon');
  cell.colSpan = 2; box.append(icon, element('h3', title), element('p', message));
  if (retry) { const button = element('button', 'Thử lại', 'primary'); button.addEventListener('click', analyze); box.append(button); }
  cell.append(box); $('rows').replaceChildren(row);
}
function sortedItems(items, order) {
  const progressOrder = { pending: 0, seen: 1, done: 2 };
  return [...items].sort((a, b) => {
    if (order === 'priority') return (priority[b.importance] || 0) - (priority[a.importance] || 0) || Date.parse(a.time) - Date.parse(b.time);
    if (order === 'progress') return (progressOrder[readWorkState(a.msg_id)] ?? 0) - (progressOrder[readWorkState(b.msg_id)] ?? 0) || (priority[b.importance] || 0) - (priority[a.importance] || 0);
    return order === 'oldest' ? Date.parse(a.time) - Date.parse(b.time) : Date.parse(b.time) - Date.parse(a.time);
  });
}
function render(motion = false) {
  if (!results.length) { updateProgress(); return state('Không có câu hỏi cần chú ý', 'AI không đánh dấu mục nào cần TA/Mod xem lại trong batch demo.'); }
  $('rows').replaceChildren();
  for (const [index, item] of sortedItems(results, sortInput.value).entries()) {
    const row = element('tr', '', 'result-row'), when = element('td'), detail = element('td'), date = new Date(item.time);
    row.style.setProperty('--row-index', String(index));
    const validDate = Number.isFinite(date.getTime()), options = { timeZone: 'Asia/Ho_Chi_Minh' };
    when.append(element('time', validDate ? date.toLocaleTimeString('vi-VN', { ...options, hour: '2-digit', minute: '2-digit' }) : 'Chưa rõ'), element('div', validDate ? date.toLocaleDateString('vi-VN', options) : 'Thiếu thời gian', 'date'));
    const minutes = Math.floor((Date.parse(snapshot) - date.getTime()) / 60000); if (Number.isFinite(minutes) && minutes >= 0) when.append(element('div', `Chờ ${Math.floor(minutes / 60)} giờ ${minutes % 60} phút`, 'waiting'));
    const label = { high: 'Cao', medium: 'Vừa', low: 'Thấp' }[item.importance] || 'Chưa xác định';
    detail.append(element('span', label, `badge ${Object.hasOwn(priority, item.importance) ? item.importance : ''}`));
    if (item.review_state === 'uncertain') detail.append(element('span', 'Cần xác minh', 'badge uncertain'));
    const statusControl = element('label', '', 'work-state');
    statusControl.append(element('span', 'Trạng thái xử lý'));
    const stateSelect = document.createElement('select'); stateSelect.setAttribute('aria-label', `Trạng thái xử lý cho ${item.msg_id}`);
    for (const [value, label] of Object.entries(workStates)) { const option = new Option(label, value); option.selected = readWorkState(item.msg_id) === value; stateSelect.add(option); }
    const applyWorkStyle = value => {
      statusControl.classList.remove('work-pending', 'work-seen', 'work-done'); statusControl.classList.add(`work-${value}`);
      row.classList.toggle('is-seen', value === 'seen'); row.classList.toggle('is-done', value === 'done');
    };
    applyWorkStyle(readWorkState(item.msg_id));
    stateSelect.addEventListener('change', () => {
      writeWorkState(item.msg_id, stateSelect.value); applyWorkStyle(stateSelect.value); updateProgress();
      showToast(stateSelect.value === 'done' ? 'Đã cập nhật: mục đã xử lý' : `Đã cập nhật: ${workStates[stateSelect.value]}`);
      if (sortInput.value === 'progress') render(true);
    });
    statusControl.append(stateSelect);
    const source = element('div', '', 'source');
    source.append(document.createTextNode(`Nguồn: ${item.source?.guild || 'Chưa rõ'} / ${item.source?.channel || 'Chưa rõ'} / `));
    const contextButton = element('button', 'Xem ngữ cảnh', 'context-link');
    contextButton.addEventListener('click', () => showContext(item.msg_id));
    source.append(contextButton);
    detail.append(element('div', item.summary || 'Chưa có tóm tắt.', 'summary'), element('p', item.reason || 'Chưa có lý do.', 'reason'), source, statusControl);
    row.append(when, detail); $('rows').append(row);
  }
  if (motion) { $('rows').classList.add('reordering'); setTimeout(() => $('rows').classList.remove('reordering'), 260); }
  updateProgress();
}
async function showContext(msgId) {
  $('context-title').textContent = 'Đang truy vấn tin nhắn lân cận…'; $('context-meta').textContent = ''; contextMessages.replaceChildren(); contextDialog.showModal();
  try {
    const response = await fetch(`/api/demo-context?msg_id=${encodeURIComponent(msgId)}`);
    const data = await response.json(); if (!response.ok) throw new Error(data.error?.message || 'CONTEXT_API_ERROR');
    $('context-title').textContent = `${data.guild} · ${data.channel}`; $('context-meta').textContent = `Tham chiếu ${data.focus_id} · ${data.messages.length} tin nhắn hiển thị`;
    for (const message of data.messages) {
      const card = element('article', '', `discord-message ${message.id === data.focus_id ? 'focused' : ''}`);
      card.dataset.msgId = message.id;
      const avatar = message.avatar ? document.createElement('img') : element('div', 'HV', 'avatar-fallback');
      if (message.avatar) { avatar.src = message.avatar; avatar.alt = `Avatar ${message.author}`; avatar.className = 'message-avatar'; }
      card.append(avatar, element('div', message.author || (message.is_bot ? 'Bot' : 'Học viên demo'), 'message-author'), element('time', message.time, 'message-time'), element('p', message.content, 'message-content'));
      contextMessages.append(card);
    }
    requestAnimationFrame(() => contextMessages.querySelector('.focused')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  } catch (error) { $('context-title').textContent = 'Chưa thể tải ngữ cảnh'; $('context-meta').textContent = error.message; }
}
$('close-context').addEventListener('click', () => contextDialog.close());
contextDialog.addEventListener('click', event => { if (event.target === contextDialog) contextDialog.close(); });
async function analyze() {
  if (busy) return; const hadResults = results.length > 0; busy = true; runButton.disabled = true; sortInput.disabled = true; $('run-label').textContent = 'Đang làm mới…'; $('results-panel').setAttribute('aria-busy', 'true'); setPipeline('Đang đồng bộ batch Discord demo…', 'AI đang phân loại các câu cần TA xem…');
  if (hadResults) setRefreshState(true, 'Đang cập nhật bản tin…'); else state('Đang tạo bản tin', 'Backend đang nạp batch demo rồi phân tích theo các lô nhỏ.', 'loading');
  try {
    if (location.protocol === 'file:') throw new Error('Hãy chạy node server.js trong thư mục codebase và mở http://localhost:8787/.');
    const response = await fetch('/api/demo-analyze', { method: 'POST' });
    const data = await response.json(); if (!response.ok) throw new Error(data.error?.message || 'API_ERROR');
    snapshot = data.snapshot_at; results = (data.items || []).filter(item => item.needs_attention === true);
    $('result-count').textContent = String(results.length); $('count').textContent = `Đã đồng bộ ${data.total_messages} tin nhắn demo; AI đưa ${results.length} mục lên danh sách TA cần xem.`; $('sync-status').textContent = `Bản tin đã cập nhật · ${data.total_messages} tin nhắn · ${results.length} mục cần xem`; sortInput.disabled = results.length === 0; render(true); if (hadResults) showToast('Bản tin đã được cập nhật');
  } catch (error) { results = []; updateProgress(); $('count').textContent = 'Không thể tạo bản tin.'; $('sync-status').textContent = 'Lần đồng bộ gần nhất không thành công.'; state('Chưa thể tạo bản tin', error.message, 'error', true); }
  finally { clearTimeout(pipelineTimer); setRefreshState(false); busy = false; runButton.disabled = false; $('run-label').textContent = 'Làm mới bản tin'; $('results-panel').setAttribute('aria-busy', 'false'); }
}
runButton.addEventListener('click', analyze); sortInput.addEventListener('change', () => render(true)); state('Đang chờ batch demo', 'Discord simulator sẽ tự nạp dữ liệu khi trang mở.'); analyze();
