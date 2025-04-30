package models

import "github.com/google/uuid"

type PlaylistVideo struct {
	ID         uuid.UUID `json:"id"`
	PlaylistID uuid.UUID `json:"playlist_id"`
	VideoID    uuid.UUID `json:"video_id"`
	Position   int       `json:"position"`
}
