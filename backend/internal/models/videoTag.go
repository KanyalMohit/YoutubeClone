package models

import "github.com/google/uuid"

type VideoTag struct {
	ID      uuid.UUID `json:"id"`
	VideoID uuid.UUID `json:"video_id"`
	TagID   uuid.UUID `json:"tag_id"`
}
