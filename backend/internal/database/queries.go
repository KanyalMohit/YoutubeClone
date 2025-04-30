package database

//account related queries
const (
	// CreateUserQuery is the SQL query to create a new user.
	CreateUserQuery = `
		INSERT INTO users (id, username, email, password, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6)
	`

	// GetUserByEmailQuery is the SQL query to get a user by email.
	GetUserByEmailQuery = `SELECT id, username, email, password FROM users WHERE email = $1`

	// GetUserByIDQuery is the SQL query to get a user by ID.
	GetUserByIDQuery = `SELECT id, username, email FROM users WHERE id = $1`
)

//video related queries
const (
	// CreateVideoQuery is the SQL query to create a new video.
	CreateVideoQuery = `
	INSERT INTO videos (id, title, description, user_id, video_url, thumbnail_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

	// GetVideoByIDQuery is the SQL query to get a video by ID.
	GetVideoByIDQuery = `
		SELECT id, title, description, user_id, video_url, thumbnail_url, views, created_at, updated_at FROM videos WHERE id = $1
	`

	// ListVideoQuery is the SQL query to list all videos.
	ListVideoQuery = `
		SELECT id, title, description, user_id, video_url, thumbnail_url, views, created_at, updated_at FROM videos ORDER BY created_at DESC LIMIT $1 OFFSET $2
	`

	// UpdateVideoQuery is the SQL query to update a video.
	UpdateVideoQuery = `
		UPDATE videos SET title = $1, description = $2, updated_at = $3 WHERE id = $4
	`

	// DeleteVideoQuery is the SQL query to delete a video.
	DeleteVideoQuery = `
		DELETE FROM videos WHERE id = $1
	`

	//IncrementViewQuery is the SQL query to increment the view count of a video.
	IncrementViewQuery = `
		UPDATE videos SET views = views + 1 WHERE id = $1
	`
)
