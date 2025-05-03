import axios from "axios";
import { Video } from "../types/models";

const API_BASE = "http://localhost:8080/api/v1/video";

export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response = await axios.get<Video[]>(`${API_BASE}/getVideos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const incrementViews = async (videoId: string): Promise<void> => {
  await axios.patch(`${API_BASE}/${videoId}/views`);
}

export const uploadVideo = async (videoData: FormData): Promise<Video> => {
  const response = await axios.post<Video>(`${API_BASE}/upload`, videoData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getVideoById = async (videoId: string): Promise<Video> => {
  const response = await axios.get<Video>(`${API_BASE}/${videoId}`);
  return response.data;
};

export const updateVideo = async (videoId: string, data: { title?: string; description?: string; thumbnail_url?: string }): Promise<void> => {
  await axios.patch(`${API_BASE}/${videoId}`, data);
};