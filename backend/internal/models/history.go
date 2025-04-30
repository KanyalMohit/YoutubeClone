package models

type History struct {
	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	VideoID   string `json:"video_id"`
	WatchedAt string `json:"watched_at"`
}
