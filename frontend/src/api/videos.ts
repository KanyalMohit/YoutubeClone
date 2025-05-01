import axios from "axios";
import { Video } from "../types/models";

const API_BASE = "http://localhost:8000/api/v1/videos";


export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response = await axios.get<Video[]>(`${API_BASE}/video/getVideos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};


export const incrementViews = async (videoId : string ) : Promise<void> => {
    await axios.patch(`${API_BASE}/video/${videoId}/views`);
}