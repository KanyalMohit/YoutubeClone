import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Video } from '../types/models';
import { getVideoById } from '../api/videos';

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (!id) return;
        const data = await getVideoById(id);
        setVideo(data);
      } catch (err) {
        setError('Error loading video');
      }
    };

    fetchVideo();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <video controls src={video.video_url} />
      <p>Views: {video.views}</p>
      {video.user && <p>Uploaded by: {video.user.username}</p>}
    </div>
  );
} 