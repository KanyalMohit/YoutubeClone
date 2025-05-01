import { Video } from '../../types/models';
import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css';

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  return (
    <article className={styles.card}>
      <Link to={`/video/${video.id}`}>
        <div className={styles.thumbnailContainer}>
          <img 
            src={video.thumbnail_url} 
            alt={video.title}
            className={styles.thumbnail}
          />
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{video.title}</h3>
          <div className={styles.meta}>
            <span className={styles.views}>{video.views.toLocaleString()} views</span>
            <span classsName={styles.date}>
              {new Date(video.created_at).toLocaleDateString()}
            </span>
          </div>
          {video.user && (
            <div className={styles.uploader}>
              <span>By {video.user.username}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
