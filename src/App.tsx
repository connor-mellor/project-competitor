import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from '@/pages/Home';
import RequireAuth from '@/components/RequireAuth';
import Navigation from '@/components/Navigation/Navigation';

function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <RequireAuth>
      <div className={`app ${navOpen ? 'navOpen' : ''}`}>
        <Navigation open={navOpen} setOpen={setNavOpen} />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </RequireAuth>
  );
}

export default App;
