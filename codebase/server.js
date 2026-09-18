const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { analyzeWithModel, BATCH_SIZE } = require('./model-adapter');

const PORT = Number(process.env.PORT || 8787);
const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_BODY_BYTES = 20_000_000;
const LOG_DIR = path.join(__dirname, '..', 'data-local');
const LOG_FILE = path.join(LOG_DIR, 'cp3-runtime.log');

function log(event, fields = {}) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.appendFileSync(LOG_FILE, `${JSON.stringify({ at: new Date().toISOString(), event, ...fields })}\n`);
}

function parseCsv(text) {
  const rows = []; let row = []; let field = ''; let quoted = false;
  for (let index = 0, input = String(text).replace(/^\uFEFF/, ''); index < input.length; index += 1) {
    const char = input[index];
    if (char === '"') { if (quoted && input[index + 1] === '"') { field += '"'; index += 1; } else quoted = !quoted; }
    else if (char === ',' && !quoted) { row.push(field); field = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) { if (char === '\r' && input[index + 1] === '\n') index += 1; row.push(field); if (row.some(Boolean)) rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (quoted) throw new Error('CSV_QUOTE_ERROR');
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift() || [];
  for (const column of ['msg_id', 'content', 'created_at_vn', 'is_bot', 'reply_to', 'guild', 'channel']) if (!headers.includes(column)) throw new Error(`CSV_MISSING_COLUMN:${column}`);
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] || ''])));
}

function parseTimestamp(value) {
  const timestamp = Date.parse(String(value).replace(' ', 'T') + ':00+07:00');
  if (!Number.isFinite(timestamp)) throw new Error('CSV_INVALID_TIME');
  return timestamp;
}

function isQuestion(content) {
  return /\?|cho\s+.*hỏi|làm\s+sao|thế\s+nào|ở\s+đâu|khi\s+nào|bao\s+giờ|không\s+.*được|xin\s+.*hỗ trợ/i.test(content);
}

function prepare(records) {
  const messages = records.map(row => ({
    id: row.msg_id, guild: row.guild, channel: row.channel, time: row.created_at_vn,
    timestamp: parseTimestamp(row.created_at_vn), content: row.content,
    isBot: String(row.is_bot).toLowerCase() === 'true', replyTo: row.reply_to || null
  }));
  const snapshot = Math.max(...messages.map(message => message.timestamp));
  const candidates = messages.filter(message => !message.isBot && isQuestion(message.content) && snapshot - message.timestamp >= 4 * 60 * 60 * 1000).map(message => ({
    ...message,
    context: messages.filter(other => other.guild === message.guild && other.channel === message.channel && other.timestamp >= message.timestamp && other.timestamp <= message.timestamp + 4 * 60 * 60 * 1000)
      .sort((a, b) => a.timestamp - b.timestamp).slice(0, 8).map(other => ({ id: other.id, time: other.time, content: other.content, isBot: other.isBot, replyTo: other.replyTo }))
  }));
  return { snapshot_at: new Date(snapshot).toISOString(), total_messages: messages.length, analyzed_candidates: candidates.length, candidates };
}

function json(res, status, body) { res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(body)); }
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > MAX_BODY_BYTES) { const error = new Error('BODY_TOO_LARGE'); error.code = 'BODY_TOO_LARGE'; reject(error); req.destroy(); } });
    req.on('end', () => resolve(body)); req.on('error', reject);
  });
}
function sendStatic(res, file, type) { res.writeHead(200, { 'content-type': type }); res.end(fs.readFileSync(path.join(PUBLIC_DIR, file))); }
function errorStatus(error) {
  if (error.code === 'AI_NOT_CONFIGURED') return 503;
  if (String(error.code || '').startsWith('MODEL_HTTP_')) return 502;
  if (error.code === 'BODY_TOO_LARGE') return 413;
  return 400;
}

http.createServer(async (req, res) => {
  try {
    log('request', { method: req.method, path: req.url });
    if (req.method === 'GET' && req.url === '/') { sendStatic(res, 'index.html', 'text/html; charset=utf-8'); log('response', { status: 200, route: '/' }); return; }
    if (req.method === 'GET' && req.url === '/app.js') { sendStatic(res, 'app.js', 'text/javascript; charset=utf-8'); log('response', { status: 200, route: '/app.js' }); return; }
    if (req.method === 'GET' && req.url === '/styles.css') { sendStatic(res, 'styles.css', 'text/css; charset=utf-8'); log('response', { status: 200, route: '/styles.css' }); return; }
    if (req.method !== 'POST' || !['/api/prepare', '/api/analyze'].includes(req.url)) return json(res, 404, { error: { code: 'NOT_FOUND', message: 'Route không tồn tại.' } });
    const body = JSON.parse(await readBody(req));
    if (typeof body.csv !== 'string' || !body.csv.trim()) throw new Error('CSV_REQUIRED');
    const prepared = prepare(parseCsv(body.csv));
    log('csv_prepared', { route: req.url, total_messages: prepared.total_messages, analyzed_candidates: prepared.analyzed_candidates });
    if (req.url === '/api/prepare') { json(res, 200, { mode: 'rule_preview', ...prepared, candidates: undefined }); log('response', { status: 200, route: req.url }); return; }
    const items = await analyzeWithModel(prepared.candidates);
    json(res, 200, { mode: 'ai', ...prepared, candidates: undefined, batch_size: BATCH_SIZE, items });
    log('response', { status: 200, route: req.url, items: items.length, batch_size: BATCH_SIZE });
  } catch (error) {
    const status = errorStatus(error);
    log('error', { status, code: error.code || 'BAD_REQUEST', message: String(error.message).slice(0, 300) });
    json(res, status, { error: { code: error.code || 'BAD_REQUEST', message: error.message } });
  }
}).listen(PORT, () => console.log(`CP3 app: http://localhost:${PORT}`));
