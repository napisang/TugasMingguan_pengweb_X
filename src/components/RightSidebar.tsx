export default function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <div className="search-wrapper">
        <input type="text" placeholder="Search" className="search-input" />
      </div>

      <div className="widget">
        <h2>Subscribe to Premium</h2>
        <p>Get rid of ads, see your analytics, boost your replies and unlock 20+ features.</p>
        <button className="btn btn--accent btn--small">Subscribe</button>
      </div>

      <div className="widget">
        <h2>What's Happening</h2>
        <p>Web Development · Trending</p>
        <p style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>#CleanArchitecture</p>
        <p>15.4K posts</p>

        <br />
        <p>Technology · Trending</p>
        <p style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>JavaScript vs jQuery</p>
        <p>8.2K posts</p>
      </div>
    </aside>
  );
}