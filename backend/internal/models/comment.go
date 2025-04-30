package models

import (
	"time"

	"github.com/google/uuid"
)

type Comment struct {
	ID        uuid.UUID `json:"id"`
	Content   string    `json:"content"`
	UserID    uuid.UUID `json:"user_id"`
	VideoID   uuid.UUID `json:"video_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
