const fs = require('node:fs');
const path = require('node:path');

if (process.env.ALLOW_GOLDEN_SET_API !== 'true') {
  throw new Error('REFUSED: Set ALLOW_GOLDEN_SET_API=true only after approving this 22-case request.');
}

const root = path.join(__dirname, '..');
const goldenSet = JSON.parse(fs.readFileSync(path.join(__dirname, 'golden-set.json'), 'utf8'));
const port = process.env.PORT || '8787';

function expectedFor(item) {
  const label = String(item.expected_label || '').toLowerCase();
  const priority = String(item.expected_priority || '').toLowerCase();
  if (label.includes('chưa chắc')) return { needs_attention: true, review_state: 'uncertain', importance: null };
  if (label.includes('không cần')) return { needs_attention: false, review_state: 'no_attention', importance: null };
  const labelResult = { needs_attention: true, review_state: 'needs_review' };
  const importance = priority.includes('cao') ? 'high' : priority.includes('vừa') ? 'medium' : priority.includes('thấp') ? 'low' : null;
  return { ...labelResult, importance };
}

function formatVn(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function localCsv(item) {
  const start = new Date(`${item.timestamp.replace(' ', 'T')}+07:00`);
  const later = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  const contextTime = new Date(start.getTime() + 5 * 60 * 1000);
  const row = values => values.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',');
  return [
    'msg_id,guild,channel,author,is_bot,msg_type,created_at_vn,reply_to,mentions_bot,n_attachments,n_chars,content',
    row([item.msg_id, 'TEST', 'TEST', 'REDACTED', 'False', 'message', item.timestamp, '', 'False', 0, item.user_query.length, item.user_query]),
    row([`CONTEXT_${item.case_id}`, 'TEST', 'TEST', 'SYNTHETIC', 'True', 'message', formatVn(contextTime), item.msg_id, 'False', 0, item.input_context.length, item.input_context]),
    row([`SNAPSHOT_${item.case_id}`, 'TEST', 'TEST', 'SYNTHETIC', 'False', 'message', formatVn(later), '', 'False', 0, 0, 'Synthetic time anchor.'])
  ].join('\n');
}

async function runCase(item) {
  const expected = expectedFor(item);
  const response = await fetch(`http://localhost:${port}/api/analyze`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ csv: localCsv(item) })
  });
  const body = await response.json();
  if (!response.ok) return { case_id: item.case_id, msg_id: item.msg_id, expected, error: body.error?.code || 'API_ERROR', pass: false };
  const actual = body.items?.find(result => result.msg_id === item.msg_id);
  if (!actual && !expected.needs_attention) {
    const virtual = { needs_attention: false, review_state: 'no_attention', importance: null, handled_by: 'prefilter' };
    return { case_id: item.case_id, msg_id: item.msg_id, expected, actual: virtual, decision_pass: true, priority_pass: true, pass: true };
  }
  if (!actual) return { case_id: item.case_id, msg_id: item.msg_id, expected, error: 'MISSING_RESULT', pass: false };
  const decision_pass = actual.needs_attention === expected.needs_attention && actual.review_state === expected.review_state;
  const priority_pass = actual.importance === expected.importance;
  return { case_id: item.case_id, msg_id: item.msg_id, expected, actual: { needs_attention: actual.needs_attention, review_state: actual.review_state, importance: actual.importance }, decision_pass, priority_pass, pass: decision_pass && priority_pass };
}

(async () => {
  const results = [];
  for (const item of goldenSet) results.push(await runCase(item));
  const passed = results.filter(result => result.pass).length;
  const outputDir = path.join(root, 'data-local');
  fs.mkdirSync(outputDir, { recursive: true });
  const output = path.join(outputDir, 'eval-current-results.json');
  fs.writeFileSync(output, JSON.stringify({ run_at: new Date().toISOString(), total: results.length, passed, percent: Number((passed / results.length * 100).toFixed(1)), results }, null, 2));
  console.log(JSON.stringify({ total: results.length, passed, percent: Number((passed / results.length * 100).toFixed(1)), local_output: output }));
})().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
