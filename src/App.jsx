import React, { useCallback, useEffect, useRef, useState } from 'react';
import WelcomeLanding from './pages/WelcomeLanding';
import StudentPortal from './pages/StudentPortal';
import TeacherDashboard from './pages/TeacherDashboard';
import { PHYSICS_TOPICS } from './data/physicsCurriculum';

const SESSION_KEY = 'fisikalab_xi_session_v4';

function createFallbackProgress() {
  const map = {};
  PHYSICS_TOPICS.forEach((t, idx) => {
    map[t.id] = {
      topicId: t.id,
      isTopicUnlocked: idx === 0,
      openingDone: false,
      materiDone: false,
      simulasiDone: false,
      gameDone: false,
      evalDone: false,
      gameScore: 0,
      evalScore: 0,
      reflection: ''
    };
  });
  return map;
}

const PREVIEW_USER = {
  id: 0,
  name: 'Pratinjau Siswa',
  identifier: '0000',
  role: 'student',
  class_name: 'Pratinjau',
  avatar: '👀',
  xp: 0,
  level: 1,
  introDone: true
};

export default function App() {
  const [viewMode, setViewMode] = useState('welcome'); // 'welcome' | 'student' | 'teacher' | 'preview'
  const [currentUser, setCurrentUser] = useState(null);
  const [progressMap, setProgressMap] = useState(createFallbackProgress);
  const [demoUnlockAll, setDemoUnlockAll] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [booting, setBooting] = useState(true);
  const tokenRef = useRef(null);

  const clearSession = useCallback(() => {
    tokenRef.current = null;
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem('fisikalab_xi_session_v3');
    } catch {}
  }, []);

  // fetch dengan token sesi
  const authFetch = useCallback(async (url, options = {}) => {
    const headers = { ...(options.headers || {}) };
    if (tokenRef.current) headers.Authorization = `Bearer ${tokenRef.current}`;
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      clearSession();
      setViewMode('welcome');
      setCurrentUser(null);
    }
    return res;
  }, [clearSession]);

  const applyPayload = (data) => {
    setCurrentUser(data.user);
    setProgressMap(data.progress || createFallbackProgress());
    setDemoUnlockAll(Boolean(data.demoUnlockAll));
  };

  // Pulihkan sesi
  useEffect(() => {
    (async () => {
      try {
        const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
        if (saved?.token) {
          tokenRef.current = saved.token;
          try {
            const res = await fetch('/api/me', { headers: { Authorization: `Bearer ${saved.token}` } });
            if (res.ok) {
              const data = await res.json();
              if (data.ok) {
                applyPayload(data);
                setViewMode(data.user.role === 'teacher' ? 'teacher' : 'student');
                setBooting(false);
                return;
              }
            }
          } catch {}
          clearSession();
        } else if (saved?.clientOnlyUser) {
          setCurrentUser(saved.clientOnlyUser);
          const localProg = JSON.parse(localStorage.getItem(`fisikalab_client_progress_${saved.clientOnlyUser.identifier}`) || 'null');
          setProgressMap(localProg || createFallbackProgress());
          setDemoUnlockAll(Boolean(saved.demoUnlockAll));
          setViewMode(saved.clientOnlyUser.role === 'teacher' ? 'teacher' : 'student');
        }
      } catch {
        clearSession();
      }
      setBooting(false);
    })();
  }, [clearSession]);

  const handleLoginSuccess = async (loginPayload) => {
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          tokenRef.current = data.token;
          localStorage.setItem(SESSION_KEY, JSON.stringify({ token: data.token }));
          applyPayload(data);
          setViewMode(data.user.role === 'teacher' ? 'teacher' : 'student');
          return { ok: true };
        }
        setLoginError(data.error || 'Gagal masuk.');
        return { ok: false, error: data.error };
      }
      throw new Error('API server tidak tersedia (Mode Standalone)');
    } catch {
      // Fallback Mode Client-Side / GitHub Pages (Tanpa backend Node.js)
      const isTeacher = loginPayload.role === 'teacher';
      if (isTeacher && loginPayload.pin && loginPayload.pin !== '2026') {
        const msg = 'PIN Guru salah. (Default: 2026)';
        setLoginError(msg);
        return { ok: false, error: msg };
      }

      const clientUser = {
        id: isTeacher ? 9999 : (parseInt(loginPayload.identifier, 10) || 1101),
        name: loginPayload.name || (isTeacher ? 'Firgiawan Listianto, S.Pd.' : 'Andi Pratama'),
        identifier: loginPayload.identifier || (isTeacher ? '240209501100' : '1101'),
        role: isTeacher ? 'teacher' : 'student',
        class_name: isTeacher ? 'Guru Fisika' : (loginPayload.className || 'XI MIPA 1'),
        avatar: loginPayload.avatar || (isTeacher ? '👨‍🏫' : '🧑‍🚀'),
        xp: 0,
        level: 1,
        introDone: true
      };

      const storageKey = `fisikalab_client_progress_${clientUser.identifier}`;
      let localProg = null;
      try {
        localProg = JSON.parse(localStorage.getItem(storageKey) || 'null');
      } catch {}
      const prog = localProg || createFallbackProgress();

      localStorage.setItem(SESSION_KEY, JSON.stringify({ clientOnlyUser: clientUser }));
      setCurrentUser(clientUser);
      setProgressMap(prog);
      setDemoUnlockAll(false);
      setViewMode(isTeacher ? 'teacher' : 'student');
      return { ok: true, offline: true };
    }
  };

  const handleLogout = async () => {
    try {
      if (tokenRef.current) await authFetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    clearSession();
    setCurrentUser(null);
    setProgressMap(createFallbackProgress());
    setViewMode('welcome');
  };

  // Mode pratinjau guru: data lokal saja, tidak menyentuh database siswa
  const previewUpdate = async ({ topicId, stage, score = 0, reflection = '' }) => {
    let passed = null;
    let unlockedNextTopic = null;
    setProgressMap((prev) => {
      const cur = prev[topicId] || {};
      const next = { ...cur, isTopicUnlocked: true };
      if (stage === 'pembuka') next.openingDone = true;
      if (stage === 'materi') next.materiDone = true;
      if (stage === 'simulasi') next.simulasiDone = true;
      if (stage === 'game') {
        next.gameDone = true;
        next.gameScore = Math.max(cur.gameScore || 0, score);
      }
      if (stage === 'evaluasi') {
        passed = score >= 70;
        next.evalScore = Math.max(cur.evalScore || 0, score);
        if (passed) next.evalDone = true;
        if (reflection) next.reflection = reflection;
      }
      return { ...prev, [topicId]: next };
    });
    if (stage === 'evaluasi' && score >= 70) {
      const idx = PHYSICS_TOPICS.findIndex((t) => t.id === topicId);
      if (idx >= 0 && idx + 1 < PHYSICS_TOPICS.length) {
        unlockedNextTopic = PHYSICS_TOPICS[idx + 1].id;
        setProgressMap((prev) => ({
          ...prev,
          [unlockedNextTopic]: { ...prev[unlockedNextTopic], isTopicUnlocked: true }
        }));
      }
    }
    return { ok: true, xpEarned: 0, passed, unlockedNextTopic };
  };

  const handleUpdateStage = async (payload) => {
    if (viewMode === 'preview') return previewUpdate(payload);
    if (!currentUser) return null;

    if (tokenRef.current) {
      try {
        const res = await authFetch('/api/progress/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.ok) {
            applyPayload(data);
            return data;
          }
        }
      } catch (e) {
        console.warn('Gagal menyimpan ke server, menyimpan secara lokal:', e);
      }
    }

    // Fallback Client-Side Progress Update (GitHub Pages / Standalone)
    const { topicId, stage, score = 0, reflection = '' } = payload;
    let passed = null;
    let unlockedNextTopic = null;
    let xpEarned = 0;

    setProgressMap((prev) => {
      const cur = prev[topicId] || {};
      const next = { ...cur, isTopicUnlocked: true };
      if (stage === 'pembuka') {
        if (!cur.openingDone) xpEarned += 20;
        next.openingDone = true;
      }
      if (stage === 'materi') {
        if (!cur.materiDone) xpEarned += 30;
        next.materiDone = true;
      }
      if (stage === 'simulasi') {
        if (!cur.simulasiDone) xpEarned += 40;
        next.simulasiDone = true;
      }
      if (stage === 'game') {
        if (!cur.gameDone) xpEarned += 40;
        next.gameDone = true;
        next.gameScore = Math.max(cur.gameScore || 0, score);
      }
      if (stage === 'evaluasi') {
        passed = score >= 70;
        next.evalScore = Math.max(cur.evalScore || 0, score);
        if (passed) {
          if (!cur.evalDone) xpEarned += 60;
          next.evalDone = true;
        }
        if (reflection) next.reflection = reflection;
      }

      const updatedMap = { ...prev, [topicId]: next };
      if (stage === 'evaluasi' && score >= 70) {
        const idx = PHYSICS_TOPICS.findIndex((t) => t.id === topicId);
        if (idx >= 0 && idx + 1 < PHYSICS_TOPICS.length) {
          unlockedNextTopic = PHYSICS_TOPICS[idx + 1].id;
          updatedMap[unlockedNextTopic] = {
            ...(updatedMap[unlockedNextTopic] || {}),
            isTopicUnlocked: true
          };
        }
      }

      try {
        const storageKey = `fisikalab_client_progress_${currentUser.identifier}`;
        localStorage.setItem(storageKey, JSON.stringify(updatedMap));
      } catch {}

      return updatedMap;
    });

    if (xpEarned > 0) {
      setCurrentUser((prev) => {
        if (!prev) return prev;
        const newXp = (prev.xp || 0) + xpEarned;
        const newLevel = Math.floor(newXp / 100) + 1;
        const updated = { ...prev, xp: newXp, level: newLevel };
        try {
          const savedSession = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
          if (savedSession.clientOnlyUser) {
            savedSession.clientOnlyUser = updated;
            localStorage.setItem(SESSION_KEY, JSON.stringify(savedSession));
          }
        } catch {}
        return updated;
      });
    }

    return { ok: true, xpEarned, passed, unlockedNextTopic };
  };

  const handleResetProgress = async () => {
    if (tokenRef.current) {
      try {
        const res = await authFetch('/api/progress/reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: '{}'
        });
        if (res.ok) {
          const data = await res.json();
          if (data.ok) {
            applyPayload(data);
            return;
          }
        }
      } catch {}
    }
    const fresh = createFallbackProgress();
    setProgressMap(fresh);
    if (currentUser?.identifier) {
      try {
        localStorage.removeItem(`fisikalab_client_progress_${currentUser.identifier}`);
      } catch {}
    }
  };

  const startPreview = () => {
    setProgressMap(createFallbackProgress());
    setViewMode('preview');
  };

  if (booting) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold">Memuat FisikaLab…</div>;
  }

  if (viewMode === 'welcome') {
    return <WelcomeLanding onLoginSuccess={handleLoginSuccess} loginError={loginError} />;
  }

  if (viewMode === 'teacher') {
    return (
      <TeacherDashboard
        teacherUser={currentUser}
        authFetch={authFetch}
        onLogout={handleLogout}
        onSwitchToStudent={startPreview}
      />
    );
  }

  const isPreview = viewMode === 'preview';
  return (
    <StudentPortal
      key={isPreview ? 'preview' : currentUser?.id}
      user={isPreview ? PREVIEW_USER : currentUser}
      progress={progressMap}
      demoUnlockAll={demoUnlockAll}
      previewMode={isPreview}
      onUpdateStage={handleUpdateStage}
      onResetProgress={handleResetProgress}
      onLogout={isPreview ? () => setViewMode('teacher') : handleLogout}
    />
  );
}
