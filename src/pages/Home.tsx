import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import Post from '../components/Post';

type HomeProps = {
  username: string;
  onLogout: () => void;
};

type ApiPost = {
  id: number;
  title: string;
  body: string;
  likes: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

type Status = 'loading' | 'success' | 'error';

const POSTS_URL = 'http://localhost:3000/posts';
const ADD_POST_URL = 'http://localhost:3000/posts';

const NAMA_INDO = [
  'Budi Santoso', 'Siti Nurhaliza', 'Agus Setiawan', 'Dewi Lestari',
  'Rizky Pratama', 'Putri Ayu', 'Dimas Prasetyo', 'Ayu Wulandari',
  'Fajar Nugroho', 'Rina Marlina', 'Eko Wijaya', 'Sri Rahayu',
  'Hendra Gunawan', 'Nur Aini', 'Bayu Saputra', 'Indah Permata',
  'Andi Kurniawan', 'Maya Sari', 'Yoga Firmansyah', 'Lestari Dewi',
  'Joko Susilo', 'Fitri Handayani', 'Rudi Hartono', 'Wulan Anggraini',
  'Arif Rahman', 'Mega Puspita', 'Teguh Santoso', 'Citra Kirana',
  'Bagas Aditya', 'Novi Rahmawati', 'Surya Darma', 'Tika Amelia',
  'Galih Permana', 'Yuni Astuti', 'Irfan Hakim', 'Dian Purnama',
  'Reza Maulana', 'Anisa Fitriani', 'Wahyu Hidayat', 'Rahmat Hidayah',
];

function namaIndo(userId: number) {
  return NAMA_INDO[userId % NAMA_INDO.length];
}

function toHandle(name: string) {
  return '@' + name.toLowerCase().replace(/\s+/g, '_');
}

function avatarUrl(name: string, background = '1d9bf0') {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=fff`;
}

function getPosts(): Promise<ApiPost[]> {
  return fetch(POSTS_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server membalas dengan status ${res.status}`);
      }
      return res.json();
    });
}

export default function Home({ username, onLogout }: HomeProps) {
  const [apiPosts, setApiPosts] = useState<ApiPost[]>([]);
  const [text, setText] = useState('');

  const [status, setStatus] = useState<Status>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState('');

  function loadPosts() {
    getPosts()
      .then((posts) => {
        setApiPosts(posts);
        setStatus('success');
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setStatus('error');
      });
  }

  function handleRetry() {
    setStatus('loading');
    loadPosts();
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function handlePost() {
    const content = text.trim();
    if (!content) return;

    setIsPosting(true);
    setPostError('');

    fetch(ADD_POST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Postingan X',
        body: content,
        userId: 5,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setText('');
        loadPosts();
      })
      .catch((err) => {
        setPostError(`Gagal mengirim post: ${err.message}`);
      })
      .finally(() => setIsPosting(false));
  }

  return (
    <div className="app-layout">
      <Sidebar onLogout={onLogout} />

      <main className="main-feed">
        <header className="feed-header">
          <div className="feed-tabs">
            <div className="tab active">
              <span>For you</span>
            </div>
            <div className="tab">
              <span>Following</span>
            </div>
          </div>
        </header>

        <section className="post-composer">
          <img
            src={avatarUrl(username)}
            alt="Avatar"
            className="avatar"
          />

          <div className="composer-content">
            <textarea
              className="composer-input"
              placeholder="What is happening?!"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {postError && (
              <p style={{ color: 'red', fontSize: 14 }}>
                {postError}
              </p>
            )}

            <div className="composer-actions">
              <div className="action-icons">🖼️</div>

              <button
                className="btn btn--accent btn--small"
                onClick={handlePost}
                disabled={isPosting}
                style={{ opacity: isPosting ? 0.5 : 1 }}
              >
                {isPosting ? 'Mengirim...' : 'Post'}
              </button>
            </div>
          </div>
        </section>

        {status === 'loading' && (
          <div
            style={{
              textAlign: 'center',
              padding: 40,
              color: 'var(--text-muted)',
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="spinner"
            >
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            <p>Memuat data...</p>
          </div>
        )}

        {status === 'error' && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: 'red', marginBottom: 12 }}>
              Gagal memuat data: {errorMessage}
            </p>

            <button
              className="btn btn--accent btn--small"
              onClick={handleRetry}
            >
              Coba Lagi
            </button>
          </div>
        )}

        {status === 'success' &&
          apiPosts.map((p) => {
            const nama =
              p.userId === 5 ? username : namaIndo(p.userId);

            return (
              <Post
                key={p.id}
                name={nama}
                handle={toHandle(nama)}
                avatar={avatarUrl(nama)}
                text={p.body}
                replies={0}
                reposts={0}
                likes={p.likes}
                views={0}
              />
            );
          })}
      </main>

      <RightSidebar />
    </div>
  );
}