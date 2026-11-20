import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3005;
const KKM = 70;
const DEFAULT_TEACHER_PIN = process.env.TEACHER_PIN || 'guru123';
const SCHEMA_VERSION = 2;

app.use(cors());
app.use(express.json());

const dbPath = process.env.DB_PATH || path.join(__dirname, 'database.sqlite');
const db = new DatabaseSync(dbPath);

const TOPIC_ORDER = ['fluida', 'rotasi', 'elastisitas', 'gelombang', 'kalor', 'termodinamika'];
const VALID_STAGES = ['intro', 'pembuka', 'materi', 'simulasi', 'game', 'evaluasi', 'reflection'];

/* ---------- Util: password hash ---------- */
function hashPin(pin) {
  const salt = crypto.randomBytes(8).toString('hex');
  const hash = crypto.scryptSync(String(pin), salt, 32).toString('hex');
  return `${salt}:${hash}`;
}
function verifyPin(pin, stored) {
  if (!stored) return false;
  const [salt, hash] = stored.split(':');
  const test = crypto.scryptSync(String(pin), salt, 32).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(test, 'hex'));
}

function addColumnIfMissing(table, column, ddl) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!cols.some((c) => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`);
  }
}

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      identifier TEXT UNIQUE NOT NULL,
      role TEXT CHECK(role IN ('student', 'teacher')) NOT NULL,
      class_name TEXT DEFAULT 'XI MIPA 1',
      avatar TEXT DEFAULT 'ðŸ§‘â€ðŸŽ“',
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      streak INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS student_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      topic_id TEXT NOT NULL,
      is_topic_unlocked INTEGER DEFAULT 0,
      materi_done INTEGER DEFAULT 0,
      simulasi_done INTEGER DEFAULT 0,
      game_done INTEGER DEFAULT 0,
      eval_done INTEGER DEFAULT 0,
      game_score INTEGER DEFAULT 0,
      eval_score INTEGER DEFAULT 0,
      reflection TEXT DEFAULT '',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, topic_id)
    );

    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      topic_id TEXT NOT NULL,
      action_type TEXT NOT NULL,
      detail TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS teacher_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS quiz_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      topic_id TEXT NOT NULL,
      q_index INTEGER NOT NULL,
      answer INTEGER,
      is_correct INTEGER DEFAULT 0,
      bloom TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrasi sederhana (aman untuk database lama)
  addColumnIfMissing('users', 'intro_done', 'INTEGER DEFAULT 0');
  addColumnIfMissing('users', 'pin_hash', 'TEXT');
  addColumnIfMissing('users', 'last_active_date', 'TEXT');
  addColumnIfMissing('student_progress', 'opening_done', 'INTEGER DEFAULT 0');
  addColumnIfMissing('student_progress', 'eval_attempts', 'INTEGER DEFAULT 0');
  db.exec(`PRAGMA user_version = ${SCHEMA_VERSION}`);

  const checkSetting = db.prepare('SELECT value FROM teacher_settings WHERE key = ?').get('demo_unlock_all');
  if (!checkSetting) {
    db.prepare('INSERT INTO teacher_settings (key, value) VALUES (?, ?)').run('demo_unlock_all', 'false');
  }

  const countRow = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (countRow.count === 0) seedInitialData();

  // Pastikan semua guru punya PIN
  db.prepare("SELECT id FROM users WHERE role = 'teacher' AND (pin_hash IS NULL OR pin_hash = '')")
    .all()
    .forEach((t) => {
      db.prepare('UPDATE users SET pin_hash = ? WHERE id = ?').run(hashPin(DEFAULT_TEACHER_PIN), t.id);
    });
}

function calculateLevel(xp) {
  if (xp >= 1500) return 5;
  if (xp >= 1000) return 4;
  if (xp >= 600) return 3;
  if (xp >= 250) return 2;
  return 1;
}

function ensureUserProgressRows(userId, preset = 'fresh') {
  const insertProg = db.prepare(`
    INSERT OR IGNORE INTO student_progress
    (user_id, topic_id, is_topic_unlocked, materi_done, simulasi_done, game_done, eval_done, game_score, eval_score, reflection)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  TOPIC_ORDER.forEach((topicId, idx) => {
    if (preset === 'fresh') {
      insertProg.run(userId, topicId, idx === 0 ? 1 : 0, 0, 0, 0, 0, 0, 0, '');
    } else if (preset === 'advanced') {
      const unlocked = idx <= 3 ? 1 : 0;
      const done = idx <= 2 ? 1 : 0;
      insertProg.run(
        userId, topicId, unlocked,
        done || idx === 3 ? 1 : 0,
        done || idx === 3 ? 1 : 0,
        done ? 1 : 0,
        done ? 1 : 0,
        done ? 85 + idx * 5 : 0,
        done ? 80 + idx * 5 : 0,
        done ? 'Konsep fisis telah dibuktikan melalui eksperimen simulasi dan analisis variabel.' : ''
      );
    } else if (preset === 'medium') {
      const unlocked = idx <= 1 ? 1 : 0;
      const done = idx === 0 ? 1 : 0;
      insertProg.run(
        userId, topicId, unlocked,
        idx <= 1 ? 1 : 0,
        done ? 1 : 0, done ? 1 : 0, done ? 1 : 0,
        done ? 80 : 0, done ? 80 : 0,
        done ? 'Tekanan hidrostatis bergantung pada kedalaman dan massa jenis fluida.' : ''
      );
    }
  });
}

function seedInitialData() {
  const insertUser = db.prepare(`
    INSERT INTO users (name, identifier, role, class_name, avatar, xp, level, streak, intro_done)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run('Firgiawan Listianto, S.Pd.', '240209501100', 'teacher', 'Guru Fisika XI', 'ðŸ‘¨â€ðŸ«', 2500, 5, 14, 1);

  const s1 = insertUser.run('Andi Pratama', '1101', 'student', 'XI MIPA 1', 'ðŸ§‘â€ðŸš€', 120, 1, 3, 0);
  ensureUserProgressRows(s1.lastInsertRowid, 'fresh');

  const sampleStudents = [
    { name: 'Siti Nurhaliza', nisn: '1102', cls: 'XI MIPA 1', avatar: 'ðŸ‘©â€ðŸ”¬', xp: 1120, lvl: 4, streak: 7, preset: 'advanced' },
    { name: 'Muh. Rizky Ramadhan', nisn: '1103', cls: 'XI MIPA 1', avatar: 'ðŸ§‘â€ðŸŽ“', xp: 480, lvl: 2, streak: 4, preset: 'medium' },
    { name: 'Nurul Aulia Putri', nisn: '1104', cls: 'XI MIPA 2', avatar: 'ðŸ‘©â€ðŸš€', xp: 890, lvl: 3, streak: 6, preset: 'advanced' },
    { name: 'Reza Saputra', nisn: '1105', cls: 'XI MIPA 2', avatar: 'ðŸ§‘â€ðŸ”§', xp: 340, lvl: 2, streak: 2, preset: 'medium' },
    { name: 'Dewi Sartika', nisn: '1106', cls: 'XI MIPA 3', avatar: 'ðŸ‘©â€ðŸŽ“', xp: 1540, lvl: 5, streak: 11, preset: 'advanced' },
    { name: 'Fajar Siddiq', nisn: '1107', cls: 'XI MIPA 3', avatar: 'ðŸ§‘â€ðŸ’»', xp: 190, lvl: 1, streak: 2, preset: 'fresh' }
  ];

  sampleStudents.forEach((st) => {
    const intro = st.preset === 'fresh' ? 0 : 1;
    const res = insertUser.run(st.name, st.nisn, 'student', st.cls, st.avatar, st.xp, st.lvl, st.streak, intro);
    ensureUserProgressRows(res.lastInsertRowid, st.preset);
  });

  const insertLog = db.prepare(`INSERT INTO activity_logs (user_id, topic_id, action_type, detail) VALUES (?, ?, ?, ?)`);
  insertLog.run(2, 'fluida', 'materi', 'Membuka Bab 01 Fluida & membaca konsep Tekanan Hidrostatis');
  insertLog.run(3, 'rotasi', 'evaluasi', 'Menyelesaikan Evaluasi Dinamika Rotasi dengan skor 90/100');
  insertLog.run(4, 'fluida', 'simulasi', 'Melakukan eksperimen Daya Apung Kayu, Telur, dan Batu');
  insertLog.run(5, 'elastisitas', 'game', 'Menyelesaikan Game Ketapel Pegas Hooke Level 3');
}

initDatabase();

/* ---------- Serializer ---------- */
function publicUser(u) {
  return {
    id: u.id,
    name: u.name,
    identifier: u.identifier,
    role: u.role,
    class_name: u.class_name,
    avatar: u.avatar,
    xp: u.xp,
    level: u.level,
    streak: u.streak,
    introDone: Boolean(u.intro_done)
  };
}

function getUserWithProgress(userId) {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  if (!user) return null;

  const progressRows = db.prepare('SELECT * FROM student_progress WHERE user_id = ?').all(user.id);
  const progressMap = {};
  progressRows.forEach((r) => {
    progressMap[r.topic_id] = {
      topicId: r.topic_id,
      isTopicUnlocked: Boolean(r.is_topic_unlocked),
      openingDone: Boolean(r.opening_done),
      materiDone: Boolean(r.materi_done),
      simulasiDone: Boolean(r.simulasi_done),
      gameDone: Boolean(r.game_done),
      evalDone: Boolean(r.eval_done),
      gameScore: r.game_score,
      evalScore: r.eval_score,
      evalAttempts: r.eval_attempts || 0,
      reflection: r.reflection || ''
    };
  });

  const settingRow = db.prepare('SELECT value FROM teacher_settings WHERE key = ?').get('demo_unlock_all');
  const demoUnlockAll = settingRow ? settingRow.value === 'true' : false;

  return { user: publicUser(user), progress: progressMap, demoUnlockAll };
}

/* ---------- Auth middleware ---------- */
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ ok: false, error: 'Silakan masuk terlebih dahulu.' });
  const sess = db.prepare('SELECT user_id FROM sessions WHERE token = ?').get(token);
  if (!sess) return res.status(401).json({ ok: false, error: 'Sesi berakhir, silakan masuk kembali.' });
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(sess.user_id);
  if (!user) return res.status(401).json({ ok: false, error: 'Akun tidak ditemukan.' });
  req.user = user;
  req.token = token;
  next();
}

function teacherOnly(req, res, next) {
  if (req.user?.role !== 'teacher') {
    return res.status(403).json({ ok: false, error: 'Fitur ini khusus guru.' });
  }
  next();
}

function touchStreak(user) {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Makassar' });
  if (user.last_active_date === today) return;
  let streak = 1;
  if (user.last_active_date) {
    const diff = Math.round((new Date(today) - new Date(user.last_active_date)) / 86400000);
    streak = diff === 1 ? (user.streak || 0) + 1 : 1;
  }
  db.prepare('UPDATE users SET streak = ?, last_active_date = ? WHERE id = ?').run(streak, today, user.id);
}

/* ==========================================================================
   REST API
   ========================================================================== */

app.get('/api/health', (req, res) => {
  try {
    const v = db.prepare('PRAGMA user_version').get();
    db.prepare('SELECT 1').get();
    res.json({ ok: true, db: 'sqlite', schemaVersion: v.user_version, kkm: KKM });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Login: siswa = NISN + nama; guru = NIP + PIN
app.post('/api/auth/login', (req, res) => {
  try {
    const { identifier, name, role = 'student', className = 'XI MIPA 1', avatar = 'ðŸ§‘â€ðŸš€', pin } = req.body || {};
    const cleanId = String(identifier || '').trim();
    if (!/^\d{4,16}$/.test(cleanId)) {
      return res.status(400).json({ ok: false, error: 'NISN/NIP harus berupa angka (4â€“16 digit).' });
    }

    let user = db.prepare('SELECT * FROM users WHERE identifier = ?').get(cleanId);

    if (role === 'teacher' || user?.role === 'teacher') {
      if (!user || user.role !== 'teacher') {
        return res.status(403).json({ ok: false, error: 'Akun guru tidak ditemukan.' });
      }
      if (!verifyPin(pin || '', user.pin_hash)) {
        return res.status(401).json({ ok: false, error: 'PIN guru tidak sesuai.' });
      }
    } else if (!user) {
      const cleanName = String(name || '').trim().slice(0, 60);
      if (cleanName.length < 2) {
        return res.status(400).json({ ok: false, error: 'Isi nama lengkap kamu dulu ya.' });
      }
      const insert = db.prepare(`
        INSERT INTO users (name, identifier, role, class_name, avatar, xp, level, streak)
        VALUES (?, ?, 'student', ?, ?, 50, 1, 1)
      `).run(cleanName, cleanId, String(className).slice(0, 30), String(avatar).slice(0, 8));
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(insert.lastInsertRowid);
    }

    ensureUserProgressRows(user.id, 'fresh');
    if (user.role === 'student') {
      touchStreak(user);
    }

    const token = crypto.randomBytes(24).toString('hex');
    db.prepare('INSERT INTO sessions (token, user_id) VALUES (?, ?)').run(token, user.id);

    res.json({ ok: true, token, ...getUserWithProgress(user.id) });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/auth/logout', auth, (req, res) => {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(req.token);
  res.json({ ok: true });
});

// Sesi saat ini
app.get('/api/me', auth, (req, res) => {
  res.json({ ok: true, ...getUserWithProgress(req.user.id) });
});

// Update progres (selalu untuk akun sendiri)
app.post('/api/progress/update', auth, (req, res) => {
  try {
    const user = req.user;
    const { topicId, stage, reflection = '', detail = '', answers } = req.body || {};
    const score = Math.max(0, Math.min(100, Number(req.body?.score) || 0));

    if (!TOPIC_ORDER.includes(topicId) && stage !== 'intro') {
      return res.status(400).json({ ok: false, error: 'Bab tidak dikenal.' });
    }
    if (!VALID_STAGES.includes(stage)) {
      return res.status(400).json({ ok: false, error: 'Tahap tidak dikenal.' });
    }

    let xpEarned = 0;
    let passed = null;
    let unlockedNextTopic = null;

    if (stage === 'intro') {
      if (!user.intro_done) xpEarned += 30;
      db.prepare('UPDATE users SET intro_done = 1 WHERE id = ?').run(user.id);
    } else {
      const row = db.prepare('SELECT * FROM student_progress WHERE user_id = ? AND topic_id = ?').get(user.id, topicId);
      if (!row) return res.status(404).json({ ok: false, error: 'Data progres tidak ditemukan.' });

      let { materi_done: materiDone, simulasi_done: simulasiDone, game_done: gameDone, eval_done: evalDone,
        game_score: gameScore, eval_score: evalScore, reflection: refl, opening_done: openingDone,
        eval_attempts: attempts } = row;

      if (stage === 'pembuka') {
        openingDone = 1;
      } else if (stage === 'materi') {
        if (!materiDone) xpEarned += 50;
        materiDone = 1;
      } else if (stage === 'simulasi') {
        if (!simulasiDone) xpEarned += 75;
        simulasiDone = 1;
      } else if (stage === 'game') {
        if (!gameDone) xpEarned += 100;
        gameDone = 1;
        if (score > gameScore) gameScore = score;
      } else if (stage === 'evaluasi') {
        attempts = (attempts || 0) + 1;
        passed = score >= KKM;
        if (score > evalScore) evalScore = score;
        if (reflection) refl = String(reflection).slice(0, 2000);
        if (passed) {
          if (!evalDone) xpEarned += 150;
          evalDone = 1;
          const curIndex = TOPIC_ORDER.indexOf(topicId);
          if (curIndex >= 0 && curIndex + 1 < TOPIC_ORDER.length) {
            const nextTopicId = TOPIC_ORDER[curIndex + 1];
            db.prepare('UPDATE student_progress SET is_topic_unlocked = 1 WHERE user_id = ? AND topic_id = ?')
              .run(user.id, nextTopicId);
            unlockedNextTopic = nextTopicId;
          }
        }
        if (Array.isArray(answers)) {
          const ins = db.prepare(`
            INSERT INTO quiz_answers (user_id, topic_id, q_index, answer, is_correct, bloom)
            VALUES (?, ?, ?, ?, ?, ?)
          `);
          answers.slice(0, 30).forEach((a) => {
            ins.run(user.id, topicId, Number(a.q) || 0, a.answer ?? null, a.correct ? 1 : 0, String(a.bloom || '').slice(0, 4));
          });
        }
      } else if (stage === 'reflection') {
        refl = String(reflection).slice(0, 2000);
        xpEarned += 25;
      }

      db.prepare(`
        UPDATE student_progress
        SET is_topic_unlocked = 1, opening_done = ?, materi_done = ?, simulasi_done = ?, game_done = ?,
            eval_done = ?, game_score = ?, eval_score = ?, eval_attempts = ?, reflection = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND topic_id = ?
      `).run(openingDone, materiDone, simulasiDone, gameDone, evalDone, gameScore, evalScore, attempts || 0, refl, user.id, topicId);
    }

    const newXp = user.xp + xpEarned;
    const newLevel = calculateLevel(newXp);
    const leveledUp = newLevel > user.level;
    db.prepare('UPDATE users SET xp = ?, level = ? WHERE id = ?').run(newXp, newLevel, user.id);

    db.prepare('INSERT INTO activity_logs (user_id, topic_id, action_type, detail) VALUES (?, ?, ?, ?)')
      .run(user.id, topicId || 'umum', stage, String(detail || `Menyelesaikan tahap ${stage} pada bab ${topicId}`).slice(0, 300));

    res.json({ ok: true, xpEarned, leveledUp, passed, kkm: KKM, unlockedNextTopic, ...getUserWithProgress(user.id) });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Reset progres: hanya akun sendiri (atau guru atas siswa tertentu)
app.post('/api/progress/reset', auth, (req, res) => {
  try {
    let targetId = req.user.id;
    if (req.user.role === 'teacher' && req.body?.userId) targetId = Number(req.body.userId);
    db.prepare('DELETE FROM student_progress WHERE user_id = ?').run(targetId);
    db.prepare('DELETE FROM quiz_answers WHERE user_id = ?').run(targetId);
    db.prepare('UPDATE users SET xp = 100, level = 1, intro_done = 0 WHERE id = ?').run(targetId);
    ensureUserProgressRows(targetId, 'fresh');
    res.json({ ok: true, ...getUserWithProgress(targetId) });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Analitik guru
app.get('/api/teacher/dashboard', auth, teacherOnly, (req, res) => {
  try {
    const students = db.prepare("SELECT * FROM users WHERE role = 'student' ORDER BY xp DESC").all();
    const allProgress = db.prepare('SELECT * FROM student_progress').all();
    const logs = db.prepare(`
      SELECT a.*, u.name as student_name, u.class_name
      FROM activity_logs a JOIN users u ON u.id = a.user_id
      ORDER BY a.id DESC LIMIT 25
    `).all();

    const settingRow = db.prepare('SELECT value FROM teacher_settings WHERE key = ?').get('demo_unlock_all');
    const demoUnlockAll = settingRow ? settingRow.value === 'true' : false;

    const studentList = students.map((st) => {
      const rows = allProgress.filter((p) => p.user_id === st.id);
      const topicMap = {};
      let completedStages = 0;
      let evalSum = 0;
      let evalCount = 0;

      rows.forEach((r) => {
        topicMap[r.topic_id] = {
          isTopicUnlocked: Boolean(r.is_topic_unlocked),
          materiDone: Boolean(r.materi_done),
          simulasiDone: Boolean(r.simulasi_done),
          gameDone: Boolean(r.game_done),
          evalDone: Boolean(r.eval_done),
          gameScore: r.game_score,
          evalScore: r.eval_score,
          reflection: r.reflection
        };
        completedStages += r.materi_done + r.simulasi_done + r.game_done + r.eval_done;
        if (r.eval_done) {
          evalSum += r.eval_score;
          evalCount++;
        }
      });

      return {
        ...publicUser(st),
        completionPct: Math.round((completedStages / (TOPIC_ORDER.length * 4)) * 100),
        avgScore: evalCount > 0 ? Math.round(evalSum / evalCount) : 0,
        topics: topicMap
      };
    });

    // Radar miskonsepsi: butir soal dengan tingkat salah tertinggi
    const misconceptions = db.prepare(`
      SELECT topic_id, q_index, bloom,
             COUNT(*) AS total,
             SUM(CASE WHEN is_correct = 0 THEN 1 ELSE 0 END) AS wrong
      FROM quiz_answers
      GROUP BY topic_id, q_index
      HAVING total >= 1
      ORDER BY (wrong * 1.0 / total) DESC, total DESC
      LIMIT 8
    `).all().map((m) => ({ ...m, wrongPct: Math.round((m.wrong / m.total) * 100) }));

    res.json({ ok: true, students: studentList, logs, demoUnlockAll, misconceptions });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/teacher/toggle-unlock', auth, teacherOnly, (req, res) => {
  try {
    const { unlockAll } = req.body || {};
    db.prepare('INSERT OR REPLACE INTO teacher_settings (key, value) VALUES (?, ?)').run(
      'demo_unlock_all', unlockAll ? 'true' : 'false'
    );
    res.json({ ok: true, demoUnlockAll: Boolean(unlockAll) });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Serve frontend build if available
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`ðŸš€ Fisika XI MDLC Backend & SQLite Server aktif di http://localhost:${PORT}`);
});
