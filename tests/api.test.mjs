import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const PORT = 3999;
const BASE = `http://127.0.0.1:${PORT}`;
let proc;

async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  return { status: res.status, data: await res.json() };
}

before(async () => {
  proc = spawn(process.execPath, ['--no-warnings', 'server.js'], {
    env: { ...process.env, PORT: String(PORT), DB_PATH: `test-${Date.now()}.sqlite` },
    stdio: 'ignore'
  });
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`${BASE}/api/health`);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Server tidak start');
});

after(() => proc?.kill());

test('health endpoint', async () => {
  const { data } = await api('/api/health');
  assert.equal(data.ok, true);
});

test('siswa tidak bisa akses endpoint guru', async () => {
  const login = await api('/api/auth/login', { method: 'POST', body: { identifier: '1101', name: 'Andi Pratama', role: 'student' } });
  assert.equal(login.data.ok, true);
  const t = await api('/api/teacher/dashboard', { token: login.data.token });
  assert.equal(t.status, 403);
  const anon = await api('/api/teacher/dashboard');
  assert.equal(anon.status, 401);
});

test('login guru wajib PIN benar', async () => {
  const bad = await api('/api/auth/login', { method: 'POST', body: { identifier: '240209501100', role: 'teacher', pin: 'salah' } });
  assert.equal(bad.status, 401);
  const ok = await api('/api/auth/login', { method: 'POST', body: { identifier: '240209501100', role: 'teacher', pin: 'guru123' } });
  assert.equal(ok.data.ok, true);
  const dash = await api('/api/teacher/dashboard', { token: ok.data.token });
  assert.equal(dash.data.ok, true);
});

test('KKM 70: nilai rendah tidak membuka bab berikutnya', async () => {
  const login = await api('/api/auth/login', { method: 'POST', body: { identifier: '9901', name: 'Siswa Uji', role: 'student' } });
  const token = login.data.token;
  await api('/api/progress/reset', { method: 'POST', token, body: {} });
  const fail = await api('/api/progress/update', { method: 'POST', token, body: { topicId: 'fluida', stage: 'evaluasi', score: 60 } });
  assert.equal(fail.data.passed, false);
  assert.equal(fail.data.progress.fluida.evalDone, false);
  assert.equal(fail.data.progress.rotasi.isTopicUnlocked, false);
  const pass = await api('/api/progress/update', { method: 'POST', token, body: { topicId: 'fluida', stage: 'evaluasi', score: 80 } });
  assert.equal(pass.data.passed, true);
  assert.equal(pass.data.progress.rotasi.isTopicUnlocked, true);
});

test('intro_done tersimpan di server', async () => {
  const login = await api('/api/auth/login', { method: 'POST', body: { identifier: '9902', name: 'Siswa Intro', role: 'student' } });
  const token = login.data.token;
  assert.equal(login.data.user.introDone, false);
  const up = await api('/api/progress/update', { method: 'POST', token, body: { topicId: 'fluida', stage: 'intro' } });
  assert.equal(up.data.user.introDone, true);
});

test('validasi input progres', async () => {
  const login = await api('/api/auth/login', { method: 'POST', body: { identifier: '9903', name: 'Siswa Valid', role: 'student' } });
  const bad = await api('/api/progress/update', { method: 'POST', token: login.data.token, body: { topicId: 'ngawur', stage: 'materi' } });
  assert.equal(bad.status, 400);
});
