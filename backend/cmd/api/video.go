package main

import (
	"backend/internal/handlers"
	"backend/internal/services"
	"database/sql"

	"github.com/gin-gonic/gin"
)

func Video(router *gin.RouterGroup, db *sql.DB, authMiddleware gin.HandlerFunc) {
	videoService := services.NewVideoService(db)
	videoHandler := handlers.NewVideoHandler(videoService)

	// Video routes
	router.GET("/getVideos", videoHandler.ListVideos)
	router.GET("/:id", videoHandler.GetVideoByID)
	router.PATCH("/:id/views", videoHandler.IncrementViews)

	protected := router.Group("")

	protected.Use(authMiddleware)

	protected.POST("/upload", videoHandler.UploadVideo)
	protected.DELETE("/:id", videoHandler.DeleteVideo)
	
}
