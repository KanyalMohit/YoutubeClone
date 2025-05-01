export interface User {
    id: string;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
}


export interface Video {
    id: string;
    title: string;
    decritpion: string;
    user_id: string;
    video_url: string;
    thumbnail_url: string;
    views: number;
    created_at: string;
    updated_at: string;
}