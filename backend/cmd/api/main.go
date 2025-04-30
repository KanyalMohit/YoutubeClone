package main

import (
	"backend/internal/config"
	"backend/internal/middleware"
	"backend/internal/services"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Initialize database connection
	db, err := config.NewDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Run migrations
	if err := config.RunMigrations(db); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize router
	router := gin.Default()
	//To add cors later

	baseRoute := "/api/v1"

	authService := services.NewAuthService(cfg.JWTSecret)

	// User routes
	User(router.Group(baseRoute+"/user"), db, cfg.JWTSecret)

	// Video routes
	Video(router.Group(baseRoute+"/video"), db, middleware.AuthMiddleware(authService))

	// Basic health check endpoint
	router.GET(baseRoute+"/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	// Start server
	log.Printf("Starting server on :%s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
