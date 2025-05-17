package middleware

import (
	"backend/internal/services"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(authService *services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		//log.Println("Auth header received:", authHeader)
		if !strings.HasPrefix(authHeader, "Bearer ") {
			//log.Println("Missing or invalid Bearer token")
			c.JSON(401, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		userID, err := authService.ValidateToken(tokenString)
		if err != nil {
			//log.Println("Token validation failed:", err)
			c.JSON(401, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		//log.Println("UserID set:", userID)
		c.Set("userID", userID)
		c.Next()
	}
}
