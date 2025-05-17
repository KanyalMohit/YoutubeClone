
/**
 * API Client for interacting with the video platform backend
 */

export const API_BASE_URL = 'http://localhost:8081/api/v1';

export interface APIVideo {
  id: string;
  title: string;
  description: string;
  user_id: string;
  video_url: string;
  thumbnail_url: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

/**
 * Fetch videos from the backend
 */
export async function fetchVideos(): Promise<APIVideo[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/video/getVideos`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.statusText}`);
    }
    console.log('Response:', response);
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

/**
 * Fetch a single video by ID
 */
export async function fetchVideoById(id: string): Promise<APIVideo | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/video/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    return null;
  }
}

/**
 * Fetch a user by ID
 */
export async function fetchUserById(id: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
}

/**
 * Register a new user
 */
export async function registerUser(username: string, email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to register user');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

/**
 * Login a user
 */
export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to login');
    }
    
    const data = await response.json();
    // Store the token in localStorage for future authenticated requests
    localStorage.setItem('authToken', data.token);
    
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

/**
 * Increment video views
 */
export async function incrementVideoViews(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/video/${id}/views`, {
      method: 'PATCH',
    });
    
    if (!response.ok) {
      throw new Error('Failed to increment video views');
    }
    
    return true;
  } catch (error) {
    console.error(`Error incrementing views for video ${id}:`, error);
    return false;
  }
}
