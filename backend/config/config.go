package config

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

type Config struct {
	Port                  string
	DatabaseURL           string
	GeminiAPIKey          string
	CloudinaryCloudName   string
	CloudinaryAPIKey      string
	CloudinaryAPISecret   string
	CloudinaryUploadPreset string
}

func LoadConfig() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbURL := os.Getenv("DATABASE_URL")
	geminiKey := os.Getenv("GEMINI_API_KEY")

	return &Config{
		Port:                  port,
		DatabaseURL:           dbURL,
		GeminiAPIKey:          geminiKey,
		CloudinaryCloudName:   os.Getenv("CLOUDINARY_CLOUD_NAME"),
		CloudinaryAPIKey:      os.Getenv("CLOUDINARY_API_KEY"),
		CloudinaryAPISecret:   os.Getenv("CLOUDINARY_API_SECRET"),
		CloudinaryUploadPreset: os.Getenv("CLOUDINARY_UPLOAD_PRESET"),
	}
}
