import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  const [user, setUser] = useState<string | null>(null);

  return user ? (
    <Home username={user} onLogout={() => setUser(null)} />
  ) : (
    <Login onLogin={setUser} />
  );
}