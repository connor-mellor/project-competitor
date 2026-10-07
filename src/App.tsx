import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';
import RequireAuth from './components/RequireAuth';
import { Challenges, Rankings, Dashboard, MyBoards, Settings, Profile } from './pages';

function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <RequireAuth>
      <div className={`app ${navOpen ? 'navOpen' : ''}`}>
        <Navigation open={navOpen} setOpen={setNavOpen} />
        <div className="navBackdrop" onClick={() => setNavOpen(false)} />

        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/boards" element={<MyBoards />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </RequireAuth>
  );
}

export default App;
