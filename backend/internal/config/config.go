package config

import (
	"os"
)

type Config struct {
	Port     string
	Database struct {
		Host     string
		Port     string
		User     string
		Password string
		Name     string
	}
	JWTSecret string
}

func LoadConfig() *Config {
	cfg := &Config{}

	// Server configuration
	cfg.Port = getEnv("PORT", "8080")

	// Database configuration
	cfg.Database.Host = getEnv("DB_HOST", "localhost")
	cfg.Database.Port = getEnv("DB_PORT", "5432")
	cfg.Database.User = getEnv("DB_USER", "postgres")
	cfg.Database.Password = getEnv("DB_PASSWORD", "huehue")
	cfg.Database.Name = getEnv("DB_NAME", "youtubeclone")
	cfg.JWTSecret = getEnv("JWT_SECRET", "secret")
	return cfg
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
