
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  uploadTime: string;
  channel: {
    name: string;
    avatarUrl: string;
    verified: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  active?: boolean;
}

export const categories: Category[] = [
  { id: "1", name: "All", active: true },
  { id: "2", name: "Gaming" },
  { id: "3", name: "Music" },
  { id: "4", name: "Live" },
  { id: "5", name: "Comedy" },
  { id: "6", name: "Action" },
  { id: "7", name: "Sports" },
  { id: "8", name: "Technology" },
  { id: "9", name: "Education" },
  { id: "10", name: "Food" },
  { id: "11", name: "Travel" },
  { id: "12", name: "Animation" },
];

export const videos: Video[] = [
  {
    id: "1",
    title: "How to Build a YouTube Clone with React and TailwindCSS",
    thumbnailUrl: "https://picsum.photos/id/1/320/180",
    duration: "12:34",
    views: "1.2M views",
    uploadTime: "1 month ago",
    channel: {
      name: "CodeMaster",
      avatarUrl: "https://picsum.photos/id/20/40/40",
      verified: true,
    },
  },
  {
    id: "2",
    title: "10 Amazing Gaming Moments that Will Blow Your Mind",
    thumbnailUrl: "https://picsum.photos/id/2/320/180",
    duration: "8:26",
    views: "4.5M views",
    uploadTime: "2 weeks ago",
    channel: {
      name: "GameOn",
      avatarUrl: "https://picsum.photos/id/21/40/40",
      verified: true,
    },
  },
  {
    id: "3",
    title: "Making the Perfect Pizza at Home - Chef's Special",
    thumbnailUrl: "https://picsum.photos/id/3/320/180",
    duration: "18:05",
    views: "872K views",
    uploadTime: "3 days ago",
    channel: {
      name: "CookingPro",
      avatarUrl: "https://picsum.photos/id/22/40/40",
      verified: false,
    },
  },
  {
    id: "4",
    title: "Learn Piano in 30 Days - Day 1 Tutorial",
    thumbnailUrl: "https://picsum.photos/id/4/320/180",
    duration: "22:15",
    views: "340K views",
    uploadTime: "5 months ago",
    channel: {
      name: "MusicMaster",
      avatarUrl: "https://picsum.photos/id/23/40/40",
      verified: true,
    },
  },
  {
    id: "5",
    title: "Top 5 Places to Visit Before You Die",
    thumbnailUrl: "https://picsum.photos/id/5/320/180",
    duration: "15:42",
    views: "2.8M views",
    uploadTime: "1 year ago",
    channel: {
      name: "TravelBug",
      avatarUrl: "https://picsum.photos/id/24/40/40",
      verified: true,
    },
  },
  {
    id: "6",
    title: "Understanding Quantum Computing in 10 Minutes",
    thumbnailUrl: "https://picsum.photos/id/6/320/180",
    duration: "10:05",
    views: "1.5M views",
    uploadTime: "2 months ago",
    channel: {
      name: "ScienceSimplified",
      avatarUrl: "https://picsum.photos/id/25/40/40",
      verified: true,
    },
  },
  {
    id: "7",
    title: "Daily Workout Routine for Beginners",
    thumbnailUrl: "https://picsum.photos/id/7/320/180",
    duration: "25:30",
    views: "3.2M views",
    uploadTime: "3 weeks ago",
    channel: {
      name: "FitLife",
      avatarUrl: "https://picsum.photos/id/26/40/40",
      verified: false,
    },
  },
  {
    id: "8",
    title: "Building Your First Mobile App - Complete Guide",
    thumbnailUrl: "https://picsum.photos/id/8/320/180",
    duration: "45:12",
    views: "980K views",
    uploadTime: "7 months ago",
    channel: {
      name: "AppDeveloper",
      avatarUrl: "https://picsum.photos/id/27/40/40",
      verified: true,
    },
  },
  {
    id: "9",
    title: "The Future of AI and Machine Learning",
    thumbnailUrl: "https://picsum.photos/id/9/320/180",
    duration: "14:18",
    views: "2.1M views",
    uploadTime: "1 month ago",
    channel: {
      name: "TechInsight",
      avatarUrl: "https://picsum.photos/id/28/40/40",
      verified: true,
    },
  },
  {
    id: "10",
    title: "Making Sushi at Home - Step by Step Guide",
    thumbnailUrl: "https://picsum.photos/id/10/320/180",
    duration: "20:45",
    views: "1.8M views",
    uploadTime: "4 months ago",
    channel: {
      name: "CulinaryArts",
      avatarUrl: "https://picsum.photos/id/29/40/40",
      verified: false,
    },
  },
  {
    id: "11",
    title: "LIVE: SpaceX Rocket Launch",
    thumbnailUrl: "https://picsum.photos/id/11/320/180",
    duration: "LIVE",
    views: "5.6M watching",
    uploadTime: "Streaming now",
    channel: {
      name: "SpaceExplorer",
      avatarUrl: "https://picsum.photos/id/30/40/40",
      verified: true,
    },
  },
  {
    id: "12",
    title: "How to Invest in Stocks for Beginners",
    thumbnailUrl: "https://picsum.photos/id/12/320/180",
    duration: "16:24",
    views: "3.4M views",
    uploadTime: "2 months ago",
    channel: {
      name: "FinanceGuru",
      avatarUrl: "https://picsum.photos/id/31/40/40",
      verified: true,
    },
  },
];

export const featuredVideo: Video = {
  id: "featured-1",
  title: "Learn Complete Web Development in 2023 - Full Course",
  thumbnailUrl: "https://picsum.photos/id/1084/1280/720",
  duration: "2:15:42",
  views: "8.4M views",
  uploadTime: "2 weeks ago",
  channel: {
    name: "WebDevMaster",
    avatarUrl: "https://picsum.photos/id/40/40/40",
    verified: true,
  },
};
