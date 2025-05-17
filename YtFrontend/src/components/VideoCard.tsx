
import { Video } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface VideoCardProps {
  video: Video;
  featured?: boolean;
}

const VideoCard = ({ video, featured = false }: VideoCardProps) => {
  return (
    <Link to={`/video/${video.id}`} className="block">
      <div className={cn(
        "group cursor-pointer rounded-lg overflow-hidden video-card-hover",
        featured ? "w-full" : "w-full"
      )}>
        <div className="relative">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className={cn(
              "w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300",
              featured ? "aspect-video" : "aspect-video"
            )}
          />
          {video.duration !== "LIVE" && (
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
              {video.duration}
            </div>
          )}
          {video.duration === "LIVE" && (
            <div className="absolute bottom-1 right-1 bg-stream-red text-white text-xs px-1 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              LIVE
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-2">
          {!featured && (
            <div className="flex-shrink-0">
              <img
                src={video.channel.avatarUrl}
                alt={video.channel.name}
                className="w-9 h-9 rounded-full"
              />
            </div>
          )}
          <div className={cn(
            "flex flex-col",
            featured ? "px-0" : "px-0"
          )}>
            <h3 className={cn(
              "font-medium line-clamp-2 group-hover:text-primary transition-colors",
              featured ? "text-lg" : "text-sm"
            )}>
              {video.title}
            </h3>
            <div className="flex items-center mt-1">
              <p className="text-muted-foreground text-xs">
                {video.channel.name}
                {video.channel.verified && (
                  <span className="inline-block ml-1 bg-gray-500 rounded-full w-3 h-3 text-[8px] flex items-center justify-center text-white">✓</span>
                )}
              </p>
            </div>
            <div className="text-muted-foreground text-xs flex gap-1">
              <p>{video.views}</p>
              <span>•</span>
              <p>{video.uploadTime}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;