package models

import (
	"time"

	"github.com/google/uuid"
)

type VideoLike struct {
	ID        uuid.UUID  `json:"id"`
	UserID    uuid.UUID  `json:"user_id"`
	VideoID   uuid.UUID `json:"video_id"`
	IsLike    bool       `json:"is_like"`
	CreatedAt time.Time  `json:"created_at"`
}
