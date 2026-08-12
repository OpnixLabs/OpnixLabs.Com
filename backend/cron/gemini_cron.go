package cron

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"opnixlabs-backend/utils"

	"github.com/robfig/cron/v3"
	"google.golang.org/genai"
)

type GeminiPostResponse struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

type AutoBloggingCron struct {
	DB           *sql.DB
	GeminiAPIKey string
	CronInstance *cron.Cron
}

func NewAutoBloggingCron(db *sql.DB, apiKey string) *AutoBloggingCron {
	return &AutoBloggingCron{
		DB:           db,
		GeminiAPIKey: apiKey,
		CronInstance: cron.New(),
	}
}

// StartScheduler registers the weekly cron job and starts the scheduler
func (c *AutoBloggingCron) StartScheduler() error {
	if c.GeminiAPIKey == "" {
		log.Println("WARNING: GEMINI_API_KEY is not set. Auto-blogging cron job will be disabled until key is provided.")
		return nil
	}

	// Schedule for once a week (@weekly)
	_, err := c.CronInstance.AddFunc("@weekly", func() {
		log.Println("Starting scheduled weekly Gemini AI blog post generation...")
		if err := c.GenerateAndSavePost(); err != nil {
			log.Printf("ERROR during scheduled Gemini blog post generation: %v\n", err)
		}
	})

	if err != nil {
		return fmt.Errorf("failed to register weekly cron job: %w", err)
	}

	c.CronInstance.Start()
	log.Println("Gemini Auto-Blogging Cron Job successfully scheduled (@weekly).")
	return nil
}

// GenerateAndSavePost contacts Gemini API, generates article JSON, slugifies title, and saves to database.
func (c *AutoBloggingCron) GenerateAndSavePost() error {
	apiKey := c.GeminiAPIKey
	if apiKey == "" {
		apiKey = os.Getenv("GEMINI_API_KEY")
	}
	if apiKey == "" {
		return fmt.Errorf("GEMINI_API_KEY environment variable is missing")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 45*time.Second)
	defer cancel()

	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey: apiKey,
	})
	if err != nil {
		return fmt.Errorf("failed to create GenAI client: %w", err)
	}

	prompt := `You are a renowned tech industry expert and thought leader. Write a comprehensive, highly engaging, and informative blog post about modern software architecture, AI integration, web development, or cloud technology trends.

Return your response strictly as a JSON object with two fields:
- "title": A catchy, professional headline for the blog post.
- "content": The full blog post article formatted in clean HTML (use <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, and <code> tags where appropriate. Do NOT wrap in <html> or <body> tags, only return semantic body elements).`

	config := &genai.GenerateContentConfig{
		ResponseMIMEType: "application/json",
		ResponseSchema: &genai.Schema{
			Type: genai.TypeObject,
			Properties: map[string]*genai.Schema{
				"title":   {Type: genai.TypeString, Description: "Catchy article headline"},
				"content": {Type: genai.TypeString, Description: "Full article formatted in clean HTML"},
			},
			Required: []string{"title", "content"},
		},
	}

	// Try gemini-2.5-flash first, then gemini-1.5-flash as fallback
	modelsToTry := []string{"gemini-3.6-flash", "gemini-3.5-flash-lite", "gemini-2.5-flash-lite"}
	var resp *genai.GenerateContentResponse
	var lastErr error

	for _, modelName := range modelsToTry {
		resp, lastErr = client.Models.GenerateContent(ctx, modelName, genai.Text(prompt), config)
		if lastErr == nil && len(resp.Candidates) > 0 && resp.Candidates[0].Content != nil {
			break
		}
	}

	if lastErr != nil {
		return fmt.Errorf("failed to generate content from Gemini API: %w", lastErr)
	}

	if len(resp.Candidates) == 0 || resp.Candidates[0].Content == nil {
		return fmt.Errorf("empty response received from Gemini API")
	}

	var rawJSON string
	for _, part := range resp.Candidates[0].Content.Parts {
		if part.Text != "" {
			rawJSON += part.Text
		}
	}

	// Clean code blocks if present
	rawJSON = strings.TrimPrefix(rawJSON, "```json")
	rawJSON = strings.TrimPrefix(rawJSON, "```")
	rawJSON = strings.TrimSuffix(rawJSON, "```")
	rawJSON = strings.TrimSpace(rawJSON)

	var aiPost GeminiPostResponse
	if err := json.Unmarshal([]byte(rawJSON), &aiPost); err != nil {
		return fmt.Errorf("failed to parse JSON from Gemini API response: %w (raw: %s)", err, rawJSON)
	}

	if aiPost.Title == "" || aiPost.Content == "" {
		return fmt.Errorf("received incomplete post data from Gemini API: title or content is empty")
	}

	// Generate slug from title + unix timestamp
	slug := utils.GenerateSlug(aiPost.Title)

	// Save to database
	var id int
	err = c.DB.QueryRow(
		`INSERT INTO posts (title, slug, content_html) VALUES ($1, $2, $3) RETURNING id`,
		aiPost.Title, slug, aiPost.Content,
	).Scan(&id)

	if err != nil {
		return fmt.Errorf("failed to save generated post to database: %w", err)
	}

	log.Printf("Successfully generated and saved new AI blog post ID: %d | Title: '%s' | Slug: '%s'\n", id, aiPost.Title, slug)
	return nil
}
