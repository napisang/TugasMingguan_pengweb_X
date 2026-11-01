import { useState } from 'react';

type LoginProps = {
  onLogin: (username: string) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleNext() {
    if (!username.trim()) {
      setIsError(true);
      alert('Mohon masukkan email, nomor HP, atau username Anda!');
      return;
    }

    setIsLoading(true);

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Server error');
        return res.json();
      })
      .then(() => onLogin(username.trim()))
      .catch(() => {
        alert('Gagal terhubung ke server.');
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="login-container">
        <aside className="login-hero">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </aside>

        <main className="login-content">
          <h1>Happening now.</h1>

          <div className="login-actions">
            <button className="btn btn--primary">Continue with Google</button>
            <button className="btn btn--primary">Continue with Apple</button>

            <div className="divider">
              <span>or</span>
            </div>

            <input
              type="text"
              className="form-input"
              placeholder="Phone, email, or username"
              value={username}
              style={{ borderColor: isError ? 'red' : undefined }}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsError(false);
              }}
            />

            <button className="btn btn--outline" onClick={handleNext} style={{ opacity: isLoading ? 0.5 : 1 }}>
              {isLoading ? 'Memproses...' : 'Next'}
            </button>

            <button className="btn btn--outline">Forgot password?</button>

            <p className="terms-text">
              By continuing, you agree to our <a href="#">Terms of Service</a>, <a href="#">Privacy Policy</a> and{' '}
              <a href="#">Cookie Use</a>.
            </p>
          </div>
        </main>
      </div>

      <footer className="login-footer">
        <a href="#">About</a>
        <a href="#">Help Center</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Accessibility</a>
        <a href="#">Ads info</a>
        <span>© 2026 X Corp.</span>
      </footer>
    </>
  );
}