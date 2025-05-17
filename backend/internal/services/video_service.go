package services

import (
	"backend/internal/database"
	"backend/internal/models"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type VideoService struct {
	DB *sql.DB
}

func NewVideoService(db *sql.DB) *VideoService {
	return &VideoService{
		DB: db,
	}
}

func (s *VideoService) UploadVideo(userID uuid.UUID, title, description, videoURL, thumbnailURL string) (*models.Video, error) {
	video := &models.Video{
		ID:           uuid.New(),
		Title:        title,
		Description:  description,
		UserID:       userID,
		VideoURL:     videoURL,
		ThumbnailURL: thumbnailURL,
		Views:        0,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	_, err := s.DB.Exec(database.CreateVideoQuery, video.ID, video.Title, video.Description, video.UserID, video.VideoURL, video.ThumbnailURL, video.CreatedAt, video.UpdatedAt)

	if err != nil {
		return nil, err
	}

	return video, nil
}

func (s *VideoService) GetVideoByID(id uuid.UUID) (*models.Video, error) {
	var video models.Video

	err := s.DB.QueryRow(database.GetVideoByIDQuery, id).Scan(
		&video.ID, &video.Title, &video.Description, &video.UserID, &video.VideoURL, &video.ThumbnailURL, &video.Views, &video.CreatedAt, &video.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &video, nil

}

func (s *VideoService) ListVideos(limit, offset int) ([]*models.Video, error) {
	rows, err := s.DB.Query(database.ListVideoQuery, limit, offset)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var videos []*models.Video

	for rows.Next() {
		var video models.Video
		if err := rows.Scan(
			&video.ID, &video.Title, &video.Description, &video.UserID, &video.VideoURL, &video.ThumbnailURL, &video.Views, &video.CreatedAt, &video.UpdatedAt,
		); err != nil {
			return nil, err
		}
		videos = append(videos, &video)
	}
	
	return videos, nil

}

func (s *VideoService) IncrementViews(id uuid.UUID) error {
	_, err := s.DB.Exec(database.IncrementViewQuery, id)

	return err
}

func (s *VideoService) UpdateVideo(id uuid.UUID, title, description, thumbnailURL string) error {
	_, err := s.DB.Exec(database.UpdateVideoQuery, title, description, time.Now(), id)

	return err
}

func (s *VideoService) DeleteVideo(id uuid.UUID) error {
	_, err := s.DB.Exec(database.DeleteVideoQuery, id)
	return err
}
