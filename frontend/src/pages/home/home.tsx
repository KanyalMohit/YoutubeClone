import { useEffect, useState } from "react";
import { Video } from "../../types/models";
import { fetchVideos } from "../../api/videos";
import VideoCard from "../../components/videoCard/videoCard";
import styles from "./home.module.css";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await fetchVideos();
        setVideos(data);
        setError(null);
      } catch (err) {
        setError("Error fetching videos. Please try again later.");
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, []);

  const filteredVideos = videos.filter(video => {
    if (filter === "all") return true;
    if (filter === "popular") return video.views > 1000;
    if (filter === "recent") {
      const videoDate = new Date(video.created_at);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return videoDate > oneWeekAgo;
    }
    return true;
  });

  if (loading) return <div className={styles.loading}>Loading videos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Latest Videos</h1>
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${filter === "all" ? styles.active : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`${styles.filterButton} ${filter === "popular" ? styles.active : ""}`}
            onClick={() => setFilter("popular")}
          >
            Popular
          </button>
          <button
            className={`${styles.filterButton} ${filter === "recent" ? styles.active : ""}`}
            onClick={() => setFilter("recent")}
          >
            Recent
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}