package main

import (
	"backend/internal/handlers"
	"backend/internal/services"
	"database/sql"

	"github.com/gin-gonic/gin"
)

func User(router *gin.RouterGroup, db *sql.DB, JWTSecret string) {
	userService := services.NewUserService(db)
	authService := services.NewAuthService(JWTSecret)

	authHandler := handlers.NewAuthHandler(authService, userService)
	userHandler := handlers.NewUserHandler(db)

	router.POST("/signup", userHandler.RegisterUser)
	router.POST("/login", authHandler.Login)
	router.GET("/:id", userHandler.GetProfile)

}
