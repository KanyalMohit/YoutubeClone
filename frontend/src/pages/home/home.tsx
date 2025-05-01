import { useEffect, useState } from "react";
import { Video } from "../types/video";
import { fetchVideos } from "../../api/videos";


export default function Home() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadVideos = async () => {
            try {
                const data = await fetchVideos();
                setVideos(data);
            } catch(err) {
                setError("Error fetching videos");
            } finally {
                setLoading(false);
            }
        };
        loadVideos();
    }, [])
    if (loading) return <div className={styles.loading}>Loading videos...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Latest Videos</h1>
        <div className={styles.grid}>
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    );
}