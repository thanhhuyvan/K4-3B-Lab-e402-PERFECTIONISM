const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
class Node {
  constructor() { this.children = []; this.textContent = ''; this.value = ''; this.disabled = false; this.events = {}; this.classList = {add(){},remove(){}}; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  setAttribute(key,value) { this[key] = value; }
  addEventListener(key, fn) { this.events[key] = fn; }
}
const nodes = new Map();
const context = vm.createContext({document:{getElementById(id){if(!nodes.has(id))nodes.set(id,new Node());return nodes.get(id);},createElement(){return new Node();}},structuredClone,Intl,Date,console,setTimeout:fn=>fn()});
vm.runInContext(fs.readFileSync(__dirname+'/app.js','utf8'),context);
const run = code=>vm.runInContext(code,context);
const text = node=>[node.textContent,...node.children.map(text)].join(' ');
(async()=>{
  run("choose([{name:'sample.csv',size:200}]); $('scenario').value='contract'; $('sort').value='priority'");
  const pending=run('analyze()');
  assert.equal(nodes.get('run').disabled,true);
  await pending;
  assert.equal(nodes.get('rows').children.length,1);
  assert.match(text(nodes.get('rows')),/M_EXAMPLE/);
  assert.match(text(nodes.get('rows')),/13 giờ 54 phút/);
  run("$('scenario').value='mixed'");await run('analyze()');
  assert.equal(nodes.get('rows').children.length,4);
  assert.match(text(nodes.get('rows').children[0]),/DEMO_HIGH/);
  assert.match(text(nodes.get('rows').children[3]),/Chưa xác định.*Cần xác minh/);
  for(const [order,id] of [['oldest','DEMO_LOW'],['newest','DEMO_HIGH']]){
    run(`$('sort').value='${order}';render()`);assert.match(text(nodes.get('rows').children[0]),new RegExp(id));
  }
  run("results[0].summary='<img src=x onerror=alert(1)>'; render()");
  assert.match(text(nodes.get('rows')),/<img src=x onerror=alert\(1\)>/);
  run("$('scenario').value='error'"); await run('analyze()');
  assert.match(text(nodes.get('rows')),/Lỗi 502 giả lập/);assert.match(text(nodes.get('rows')),/Thử lại/);
  assert.equal(run('results.length'),0);
  run("$('scenario').value='contract'");await run('analyze()');assert.equal(nodes.get('rows').children.length,1);
  run("$('scenario').value='empty'");await run('analyze()');assert.match(text(nodes.get('rows')),/Không có câu hỏi/);
  run("choose([{name:'bad.txt',size:10}])");assert.equal(nodes.get('run').disabled,true);
  run("choose([{name:'empty.csv',size:0}])");assert.equal(nodes.get('run').disabled,true);
  run("choose([{name:'new.csv',size:10}])");assert.equal(run('results.length'),0);assert.equal(nodes.get('sort').disabled,true);
  console.log('PASS: loading, contract, filtering, priority/time sorting, uncertain/null, text rendering, error/retry, empty, invalid files, reset.');
})().catch(e=>{console.error(e);process.exitCode=1;});
