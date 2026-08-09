package config

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

type Config struct {
	Port         string
	DatabaseURL  string
	GeminiAPIKey string
}

func LoadConfig() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbURL := os.Getenv("DATABASE_URL")
	geminiKey := os.Getenv("GEMINI_API_KEY")

	return &Config{
		Port:         port,
		DatabaseURL:  dbURL,
		GeminiAPIKey: geminiKey,
	}
}
