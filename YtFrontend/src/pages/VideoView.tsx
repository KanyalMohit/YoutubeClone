
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVideoById, fetchVideos, incrementVideoViews } from "@/lib/api-client";
import { mapAPIVideoToVideo } from "@/lib/video-mapper";
import { Video } from "@/data/mockData";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import VideoCard from "@/components/VideoCard";
import { Eye, Heart, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

const VideoView = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  // Fetch the video data
  useEffect(() => {
    async function loadVideo() {
      if (!videoId) return;
      
      try {
        setLoading(true);
        const fetchedVideo = await fetchVideoById(videoId);
        
        if (fetchedVideo) {
          setVideo(fetchedVideo);
          setError(null);
          
          // Increment the view count when the video is loaded
          await incrementVideoViews(videoId);
        } else {
          setError("Video not found");
        }
      } catch (err) {
        console.error("Error loading video:", err);
        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    }

    loadVideo();
  }, [videoId]);

  // Fetch recommended videos
  useEffect(() => {
    async function loadRecommendedVideos() {
      try {
        setLoadingRecommended(true);
        const videos = await fetchVideos(6);
        
        if (videos && videos.length > 0) {
          // Filter out the current video if it's in the results
          const filteredVideos = videos.filter(v => v.id !== videoId);
          const mappedVideos = filteredVideos.map(video => mapAPIVideoToVideo(video));
          setRecommendedVideos(mappedVideos);
        }
      } catch (err) {
        console.error("Error loading recommended videos:", err);
      } finally {
        setLoadingRecommended(false);
      }
    }

    loadRecommendedVideos();
  }, [videoId]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-stream-dark">
        <div className="flex-1 ml-0 md:ml-16 lg:ml-64">
          <div className="pt-16 px-4">
            <div className="w-full">
              <Skeleton className="w-full aspect-video rounded-lg" />
              <div className="my-4">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-stream-dark">
        <div className="flex-1 ml-0 md:ml-16 lg:ml-64">
          <div className="pt-16 px-4">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <p className="text-xl text-muted-foreground mb-4">{error}</p>
              <Button asChild>
                <Link to="/">Go Back Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-stream-dark">
      <div className="flex-1 ml-0 md:ml-16 lg:ml-64">
        <div className="pt-16 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="w-full bg-black rounded-lg overflow-hidden aspect-video">
                <video 
                  src={video?.video_url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                  className="w-full h-full object-contain" 
                  controls
                  poster={video?.thumbnail_url}
                />
              </div>

              {/* Video Info */}
              <div className="mt-4">
                <h1 className="text-xl font-bold">{video?.title}</h1>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Eye size={16} className="mr-1" /> {video?.views || 0} views • {new Date(video?.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <ThumbsUp size={18} className="mr-1" /> Like
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <ThumbsDown size={18} className="mr-1" /> Dislike
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Heart size={18} className="mr-1" /> Save
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <MessageSquare size={18} className="mr-1" /> Comment
                    </Button>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="flex items-center mt-4 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-stream-gray mr-3"></div>
                  <div>
                    <p className="font-medium">Channel Name</p>
                    <p className="text-xs text-muted-foreground">1.2M subscribers</p>
                  </div>
                  <Button className="ml-auto" variant="secondary" size="sm">Subscribe</Button>
                </div>

                {/* Video Description */}
                <div className="mt-4 text-sm">
                  <p>{video?.description || "No description available."}</p>
                </div>
              </div>
            </div>

            {/* Recommended Videos */}
            <div className="lg:col-span-1">
              <h3 className="font-medium mb-4">Recommended Videos</h3>
              <div className="space-y-4">
                {loadingRecommended ? (
                  Array(4).fill(0).map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <Skeleton className="w-40 h-24 rounded-lg flex-shrink-0" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    </div>
                  ))
                ) : (
                  recommendedVideos.map((video) => (
                    <Link to={`/video/${video.id}`} key={video.id}>
                      <div className="flex gap-2 group">
                        <div className="w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <img 
                            src={video.thumbnailUrl} 
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{video.channel.name}</p>
                          <p className="text-xs text-muted-foreground">{video.views} • {video.uploadTime}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoView;