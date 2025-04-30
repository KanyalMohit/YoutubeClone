package models

import (
	"time"

	"github.com/google/uuid"
)

type CommentLike struct {
	ID        uuid.UUID `json:"id"`
	UserID    uuid.UUID `json:"user_id"`
	CommentID uuid.UUID `json:"comment_id"`
	IsLike    bool      `json:"is_like"`
	CreatedAt time.Time `json:"created_at"`
}
