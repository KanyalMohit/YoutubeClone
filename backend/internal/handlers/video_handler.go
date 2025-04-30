package handlers

import (
	"backend/internal/models"
	"backend/internal/services"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type VideoHandler struct {
	VideoService *services.VideoService
}

func NewVideoHandler(videoService *services.VideoService) *VideoHandler {
	return &VideoHandler{
		VideoService: videoService,
	}
}

type VideoUpdateRequest struct {
	TItle        string `json:"title"`
	Description  string `json:"description"`
	ThumbnailURL string `json:"thumbnail_url"`
}

func (h *VideoHandler) UploadVideo(c *gin.Context) {
	var req models.Video
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	uuidUserID, err := uuid.Parse(userID.(string))

	log.Println("User ID:", userID, "UUID User ID:", uuidUserID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	video, err := h.VideoService.UploadVideo(uuidUserID, req.Title, req.Description, req.VideoURL, req.ThumbnailURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to upload video",
		})
	}

	c.JSON(http.StatusCreated, video)
}

func (h *VideoHandler) GetVideoByID(c *gin.Context) {
	videoID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid video ID"})
		return
	}

	video, err := h.VideoService.GetVideoByID(videoID)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Video not found"})
		return
	}

	c.JSON(http.StatusOK, video)

}

func (h *VideoHandler) ListVideos(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	videos, err := h.VideoService.ListVideos(limit, offset)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to list videos"})
		return
	}

	c.JSON(http.StatusOK, videos)

}

func (h *VideoHandler) IncrementViews(c *gin.Context) {
	videoID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid video ID"})
		return
	}
	if err := h.VideoService.IncrementViews(videoID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to increment views"})
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *VideoHandler) DeleteVideo(c *gin.Context) {
	videoID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid video ID"})
		return
	}

	userID, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	video, err := h.VideoService.GetVideoByID(videoID)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Video not found"})
		return
	}

	if video.UserID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "you don't own this video"})
		return
	}

	if err := h.VideoService.DeleteVideo(videoID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete video"})
		return
	}

	c.Status(http.StatusNoContent)

}

func (h *VideoHandler) UpdateVideo(c *gin.Context) {
	var req VideoUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	videoID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid video ID"})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	video, err := h.VideoService.GetVideoByID(videoID)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Video not found"})
		return
	}
	if video.UserID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You don't own this video"})
		return
	}

	if req.TItle == "" && req.Description == "" && req.ThumbnailURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "At least one field must be provided"})
		return
	}
	// Update only the fields that are provided
	if req.TItle == "" {
		req.TItle = video.Title
	}
	if req.Description == "" {
		req.Description = video.Description
	}
	if req.ThumbnailURL == "" {
		req.ThumbnailURL = video.ThumbnailURL
	}

	if err := h.VideoService.UpdateVideo(videoID, req.TItle, req.Description, req.ThumbnailURL); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update video"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Video updated successfully"})
}
