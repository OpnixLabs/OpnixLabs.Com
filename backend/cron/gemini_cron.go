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

	prompt := `You are the senior technical content strategist for OpnixLabs, a custom software development and SaaS engineering studio.

Your job is to write a high-quality, search-optimized technical/business blog that attracts potential clients to OpnixLabs — not simply generate generic technology news or tutorials.

TARGET AUDIENCE:
- Startup founders
- Small and medium-sized business owners
- CTOs and technical decision-makers
- Product managers
- Companies looking to build or modernize web applications, SaaS products, APIs, AI-powered systems, or cloud infrastructure

TOPIC:
Choose a topic related to modern software architecture, AI integration, web application development, SaaS development, APIs, cloud infrastructure, scalability, security, performance, automation, or software modernization.

The topic should have genuine business relevance and preferably address a problem that a company might eventually hire a software development partner to solve.

CONTENT GOALS:
1. Educate the reader with genuinely useful and technically accurate information.
2. Explain the business impact of the technology, not just the technical implementation.
3. Help the reader understand when they actually need the solution and when they do not.
4. Discuss practical trade-offs, costs, complexity, scalability, security, maintenance, and implementation considerations where relevant.
5. Naturally demonstrate the type of engineering expertise OpnixLabs can provide without turning the article into an advertisement.
6. Identify situations where working with a professional software development team would make sense.
7. End with a clear but non-pushy CTA that encourages relevant readers to contact OpnixLabs for an initial consultation.

LEAD-GENERATION REQUIREMENTS:
- Write for someone who could realistically become an OpnixLabs client.
- Address real business problems and decision-making questions.
- Include practical examples and scenarios involving businesses.
- Where appropriate, explain common mistakes companies make and how to avoid them.
- Include a section such as "When should you consider..." or "Do you actually need..." when relevant.
- Do not artificially mention OpnixLabs throughout the article.
- Mention OpnixLabs naturally only near the end when discussing implementation, consulting, or next steps.
- Do not use fake client stories, fake statistics, fake case studies, or unsupported claims.
- Never claim that OpnixLabs has built something unless explicitly provided in the input.
- Do not make the article sound like an AI-generated advertisement.

SEO REQUIREMENTS:
- Choose a specific search intent rather than an overly broad topic.
- Use a natural, descriptive title that a potential client might actually search for.
- Structure the article with useful <h2> and <h3> headings.
- Naturally incorporate relevant keywords and related terminology without keyword stuffing.
- Answer the main search intent early in the article.
- Include specific examples, comparisons, and practical recommendations where useful.
- Prefer long-tail, problem-oriented topics over generic topics such as "What is AI?"
- Optimize for helpfulness and search intent rather than keyword density.

ARTICLE STYLE:
- Professional, authoritative, and approachable.
- Write like an experienced software architect explaining a complex decision to a business owner.
- Avoid unnecessary jargon. When technical terminology is necessary, explain it.
- Use concrete examples instead of vague statements.
- Use short paragraphs for readability.
- Use tables only when they genuinely improve comparison or understanding.
- Do not use excessive headings merely to increase length.
- Do not start with generic phrases such as "In today's rapidly evolving digital landscape."
- Do not make exaggerated claims such as "revolutionary", "game-changing", or "the future of everything."
- Prioritize clarity and practical value.

CTA:
End with a natural OpnixLabs section that connects the topic to a potential client's next step.

The CTA should communicate that OpnixLabs can help businesses evaluate requirements, plan architecture, build custom web applications/SaaS products, integrate AI, or modernize existing systems when appropriate.

Use:
- Website: https://opnixlabs.com/
- Email: shivam@opnixlabs.com
- Phone: +91 88826-49469

The CTA should invite the reader to contact OpnixLabs for an initial discussion or consultation without making unrealistic promises.

OUTPUT FORMAT:
Return your response strictly as a valid JSON object with exactly two fields:

{
  "title": "A specific, compelling, professional title",
  "content": "The complete article formatted as clean HTML"
}

HTML REQUIREMENTS:
- Use only semantic body elements such as <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <code>, <blockquote>, and <table> where appropriate.
- Do NOT include <html>, <head>, <body>, <script>, <style>, or markdown.
- Do NOT wrap the HTML in a markdown code block.
- Properly escape characters so the overall response remains valid JSON.
- Do not include any additional JSON fields, commentary, or explanation outside the JSON object.`

	/*_prompt2 := `You are a renowned tech industry expert and thought leader. Write a comprehensive, highly engaging, and informative blog post about modern software architecture, AI integration, web development, or cloud technology trends.

	Return your response strictly as a JSON object with two fields:
	- "title": A catchy, professional headline for the blog post.
	- "content": The full blog post article formatted in clean HTML (use <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, and <code> tags where appropriate. Do NOT wrap in <html> or <body> tags, only return semantic body elements).` */

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

	// Try active models supported by Google GenAI API
	modelsToTry := []string{"gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest", "gemini-2.5-flash-lite"}
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
