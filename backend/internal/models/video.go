package models

import (
	"time"

	"github.com/google/uuid"
)

type Video struct {
	ID           uuid.UUID `json:"id"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
	UserID       uuid.UUID `json:"user_id"`
	VideoURL     string    `json:"video_url,omitempty"`
	ThumbnailURL string    `json:"thumbnail_url,omitempty"`
	Views        int64     `json:"views"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
