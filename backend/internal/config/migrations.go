package config

import (
	"database/sql"
	"fmt"
)

func RunMigrations(db *sql.DB) error {
	// Create users table
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			username VARCHAR(50) UNIQUE NOT NULL,
			email VARCHAR(255) UNIQUE NOT NULL,
			password VARCHAR(255) NOT NULL,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return fmt.Errorf("error creating users table: %v", err)
	}

	// Create videos table
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS videos (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			title VARCHAR(255) NOT NULL,
			description TEXT,
			user_id UUID REFERENCES users(id),
			video_url VARCHAR(255) NOT NULL,
			thumbnail_url VARCHAR(255),
			views BIGINT DEFAULT 0,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return fmt.Errorf("error creating videos table: %v", err)
	}

	// Create comments table
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS comments (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			content TEXT NOT NULL,
			user_id UUID REFERENCES users(id),
			video_id UUID REFERENCES videos(id),
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return fmt.Errorf("error creating comments table: %v", err)
	}
	// video_likes table
	_, err = db.Exec(`
CREATE TABLE IF NOT EXISTS video_likes (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID REFERENCES users(id),
	video_id UUID REFERENCES videos(id),
	is_like BOOLEAN NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(user_id, video_id)
)
`)
	if err != nil {
		return fmt.Errorf("error creating video_likes table: %v", err)
	}

	// comment_likes table
	_, err = db.Exec(`
CREATE TABLE IF NOT EXISTS comment_likes (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID REFERENCES users(id),
	comment_id UUID REFERENCES comments(id),
	is_like BOOLEAN NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(user_id, comment_id)
)
`)
	if err != nil {
		return fmt.Errorf("error creating comment_likes table: %v", err)
	}

	// playlists table
	_, err = db.Exec(`
CREATE TABLE IF NOT EXISTS playlists (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID REFERENCES users(id),
	name VARCHAR(255) NOT NULL,
	description TEXT,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
`)
	if err != nil {
		return fmt.Errorf("error creating playlists table: %v", err)
	}

	// playlist_videos table
	_, err = db.Exec(`
CREATE TABLE IF NOT EXISTS playlist_videos (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	playlist_id UUID REFERENCES playlists(id),
	video_id UUID REFERENCES videos(id),
	position INTEGER,
	UNIQUE(playlist_id, video_id)
)
`)
	if err != nil {
		return fmt.Errorf("error creating playlist_videos table: %v", err)
	}

	// tags table
	_, err = db.Exec(`
CREATE TABLE IF NOT EXISTS tags (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name VARCHAR(64) UNIQUE NOT NULL
)
`)
	if err != nil {
		return fmt.Errorf("error creating tags table: %v", err)
	}

	// video_tags table
	_, err = db.Exec(`
CREATE TABLE IF NOT EXISTS video_tags (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	video_id UUID REFERENCES videos(id),
	tag_id UUID REFERENCES tags(id),
	UNIQUE(video_id, tag_id)
)
`)
	if err != nil {
		return fmt.Errorf("error creating video_tags table: %v", err)
	}

	// history table
	_, err = db.Exec(`
CREATE TABLE IF NOT EXISTS history (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID REFERENCES users(id),
	video_id UUID REFERENCES videos(id),
	watched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
`)
	if err != nil {
		return fmt.Errorf("error creating history table: %v", err)
	}

	return nil
}
