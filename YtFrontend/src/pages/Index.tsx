
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CategoryBar from "@/components/CategoryBar";
import VideoCard from "@/components/VideoCard";
import FeaturedVideo from "@/components/FeaturedVideo";
import { categories } from "@/data/mockData";
import { useEffect, useState } from "react";
import { fetchVideos } from "@/lib/api-client";
import { mapAPIVideoToVideo } from "@/lib/video-mapper";
import { Video } from "@/data/mockData";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update the document title
  useEffect(() => {
    document.title = "StreamTube - Video Streaming Platform";
  }, []);

  // Fetch videos from the API
  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        // Skip the first video as it's used for featured
        const apiVideos = await fetchVideos(20, 1);
        
        if (apiVideos && apiVideos.length > 0) {
          // Map the API videos to our internal format
          const mappedVideos = apiVideos.map(video => 
            mapAPIVideoToVideo(video)
          );
          setVideos(mappedVideos);
          setError(null);
        } else {
          setError("No videos available");
        }
      } catch (err) {
        console.error("Error loading videos:", err);
        setError("Failed to load videos");
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  return (
    <div className="flex min-h-screen bg-stream-dark">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-16 lg:ml-64">
        <Header />
        
        <main className="pt-2 px-4 mt-16">
          <div className="mb-4">
            <CategoryBar categories={categories} />
          </div>
          
          <div className="mb-8">
            <FeaturedVideo />
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="w-full aspect-video rounded-lg" />
                  <div className="flex gap-3">
                    <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-stream-gray p-6 rounded-lg text-center">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;