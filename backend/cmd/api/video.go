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
	router.GET("/video/:id", videoHandler.GetVideoByID)
	router.PATCH("/video/:id/views", videoHandler.IncrementViews)
	
	protected := router.Group("")
	protected.Use(authMiddleware){
		router.POST("/upload", videoHandler.UploadVideo)
		router.DELETE("/video/:id", videoHandler.DeleteVideo)
	}
}
