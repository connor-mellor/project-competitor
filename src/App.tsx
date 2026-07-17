import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from '@/pages/Home';
import RequireAuth from '@/components/RequireAuth';

function App() {
  return (
    <RequireAuth>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </RequireAuth>
  );
}

export default App;
