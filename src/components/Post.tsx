type PostProps = {
  name: string;
  handle: string;
  avatar: string;
  text: string;
  replies: number;
  reposts: number;
  likes: number;
  views: number;
  isNew?: boolean;
};

export default function Post(props: PostProps) {
  return (
    <article
      className="post"
      style={props.isNew ? { backgroundColor: 'rgba(29, 155, 240, 0.05)' } : undefined}
    >
      <img src={props.avatar} alt="Avatar" className="avatar" />

      <div className="post-content">
        <div className="post-header">
          <span className="username">{props.name}</span>{' '}
          <span className="handle">{props.handle}</span> · <span className="time">Just now</span>
        </div>

        <p className="post-text">{props.text}</p>

        <div className="post-stats">
          <div className="stat-item">💬 {props.replies}</div>
          <div className="stat-item">🔁 {props.reposts}</div>
          <div className="stat-item">❤️ {props.likes}</div>
          <div className="stat-item">📊 {props.views}</div>
        </div>
      </div>
    </article>
  );
}