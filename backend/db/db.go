package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func InitDB(databaseURL string) (*sql.DB, error) {
	if databaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is not set")
	}

	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Successfully connected to Neon PostgreSQL database")

	// Ensure tables exist
	createTablesSQL := `
	CREATE TABLE IF NOT EXISTS posts (
		id SERIAL PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		slug VARCHAR(255) NOT NULL UNIQUE,
		content_html TEXT NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
	);

	CREATE TABLE IF NOT EXISTS leads (
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		message TEXT NOT NULL,
		status VARCHAR(50) DEFAULT 'new' NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
	);`

	_, err = db.Exec(createTablesSQL)
	if err != nil {
		return nil, fmt.Errorf("failed to ensure tables exist: %w", err)
	}

	return db, nil
}
