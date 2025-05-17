
import { Video } from "@/data/mockData";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";
import { fetchVideos } from "@/lib/api-client";
import { mapAPIVideoToVideo } from "@/lib/video-mapper";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedVideo = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeaturedVideo() {
      try {
        setLoading(true);
        // Fetch videos and use the first one as featured
        const videos = await fetchVideos(1);
        
        if (videos && videos.length > 0) {
          // Map the API video to our internal format
          const mappedVideo = mapAPIVideoToVideo(videos[0]);
          setVideo(mappedVideo);
          setError(null);
        } else {
          setError("No featured video available");
        }
      } catch (err) {
        console.error("Error loading featured video:", err);
        setError("Failed to load featured video");
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedVideo();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-3">Featured Video</h2>
      
      {loading ? (
        <div className="w-full">
          <Skeleton className="w-full aspect-video rounded-lg mb-4" />
          <Skeleton className="w-2/3 h-6 mb-2" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      ) : error ? (
        <div className="bg-stream-gray p-4 rounded-lg text-center">
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : video ? (
        <VideoCard video={video} featured={true} />
      ) : null}
    </div>
  );
};

export default FeaturedVideo;
