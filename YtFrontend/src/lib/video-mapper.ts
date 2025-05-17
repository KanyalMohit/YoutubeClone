
import { APIVideo } from "@/lib/api-client";
import { Video } from "@/data/mockData";

/**
 * Convert API video format to the application's internal Video format
 */
export function mapAPIVideoToVideo(apiVideo: APIVideo, username: string = "Unknown", avatarUrl: string = "https://picsum.photos/id/40/40/40"): Video {
  return {
    id: apiVideo.id,
    title: apiVideo.title,
    thumbnailUrl: apiVideo.thumbnail_url,
    duration: "00:00", // API doesn't provide duration
    views: `${apiVideo.views.toLocaleString()} views`,
    uploadTime: formatTimeSince(new Date(apiVideo.created_at)),
    channel: {
      name: username,
      avatarUrl: avatarUrl,
      verified: false
    }
  };
}

/**
 * Format the time since a video was uploaded
 */
function formatTimeSince(date: Date): string {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Less than a minute
  if (secondsAgo < 60) {
    return 'Just now';
  }
  
  // Less than an hour
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
  }
  
  // Less than a day
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
  }
  
  // Less than a week
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) {
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
  }
  
  // Less than a month
  const weeksAgo = Math.floor(daysAgo / 7);
  if (weeksAgo < 4) {
    return `${weeksAgo} week${weeksAgo === 1 ? '' : 's'} ago`;
  }
  
  // Less than a year
  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) {
    return `${monthsAgo} month${monthsAgo === 1 ? '' : 's'} ago`;
  }
  
  // More than a year
  const yearsAgo = Math.floor(daysAgo / 365);
  return `${yearsAgo} year${yearsAgo === 1 ? '' : 's'} ago`;
}
