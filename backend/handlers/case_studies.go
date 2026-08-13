package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-chi/chi/v5"
)

type CaseStudy struct {
	ID                    int      `json:"id"`
	Slug                  string   `json:"slug"`
	Title                 string   `json:"title"`
	ClientName            string   `json:"clientName"`
	Category              string   `json:"category"`
	MetaDescription       string   `json:"metaDescription"`
	Keywords              []string `json:"keywords"`
	HeroCategoryText      string   `json:"heroCategoryText"`
	HeroTitle             string   `json:"heroTitle"`
	HeroImage             string   `json:"heroImage"`
	SummaryTitle          string   `json:"summaryTitle"`
	SummaryText           string   `json:"summaryText"`
	ClientBrandName       string   `json:"clientBrandName"`
	EngagementLengthValue string   `json:"engagementLengthValue"`
	EngagementLengthUnit  string   `json:"engagementLengthUnit"`
	EngagementLengthLabel string   `json:"engagementLengthLabel"`
	FrontEndTechTags      []string `json:"frontEndTechTags"`
	EngagementType        string   `json:"engagementType"`
	QuoteText             string   `json:"quoteText,omitempty"`
	QuoteAuthor           string   `json:"quoteAuthor,omitempty"`
	AboutClientHeading    string   `json:"aboutClientHeading"`
	AboutClientText       string   `json:"aboutClientText"`
	ChallengeTitle        string   `json:"challengeTitle"`
	ChallengeParagraphs   []string `json:"challengeParagraphs"`
	ChallengeCalloutQuote string   `json:"challengeCalloutQuote"`
	SolutionTitle         string   `json:"solutionTitle"`
	SolutionSubtitle      string   `json:"solutionSubtitle"`
	TechnologiesTitle     string   `json:"technologiesTitle"`
	Technologies          []string `json:"technologies"`
	OutcomeTitle          string   `json:"outcomeTitle"`
	OutcomeSubtitle       string   `json:"outcomeSubtitle"`
	OutcomeBullets        []string `json:"outcomeBullets"`
	OutcomeImage          string   `json:"outcomeImage"`
	PreviousSlug          string   `json:"previousSlug,omitempty"`
	PreviousText          string   `json:"previousText,omitempty"`
	PreviousClientName    string   `json:"previousClientName,omitempty"`
	NextSlug              string   `json:"nextSlug,omitempty"`
	NextText              string   `json:"nextText,omitempty"`
	NextClientName        string   `json:"nextClientName,omitempty"`
	CTAHeading            string   `json:"ctaHeading"`
	CTASubheading         string   `json:"ctaSubheading"`
	CTAButtonText         string   `json:"ctaButtonText"`
	CreatedAt             string   `json:"created_at"`
}

type CaseStudyHandler struct {
	DB *sql.DB
}

func NewCaseStudyHandler(db *sql.DB) *CaseStudyHandler {
	return &CaseStudyHandler{DB: db}
}

func (h *CaseStudyHandler) GetCaseStudies(w http.ResponseWriter, r *http.Request) {
	rows, err := h.DB.Query(`
		SELECT id, slug, title, client_name, category, meta_description, keywords,
			hero_category_text, hero_title, hero_image, summary_title, summary_text,
			client_brand_name, engagement_length_value, engagement_length_unit, engagement_length_label,
			front_end_tech_tags, engagement_type, COALESCE(quote_text,''), COALESCE(quote_author,''),
			about_client_heading, about_client_text, challenge_title, challenge_paragraphs, challenge_callout_quote,
			solution_title, solution_subtitle, technologies_title, technologies, outcome_title, outcome_subtitle,
			outcome_bullets, outcome_image, COALESCE(previous_slug,''), COALESCE(previous_text,''), COALESCE(previous_client_name,''),
			COALESCE(next_slug,''), COALESCE(next_text,''), COALESCE(next_client_name,''), cta_heading, cta_subheading, cta_button_text, created_at
		FROM case_studies
		ORDER BY id ASC
	`)
	if err != nil {
		log.Printf("Error querying case_studies: %v\n", err)
		http.Error(w, "Failed to fetch case studies", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var list []CaseStudy
	for rows.Next() {
		var cs CaseStudy
		var keywordsRaw, frontEndRaw, challengeParaRaw, techRaw, outcomeBulletsRaw string

		err := rows.Scan(
			&cs.ID, &cs.Slug, &cs.Title, &cs.ClientName, &cs.Category, &cs.MetaDescription, &keywordsRaw,
			&cs.HeroCategoryText, &cs.HeroTitle, &cs.HeroImage, &cs.SummaryTitle, &cs.SummaryText,
			&cs.ClientBrandName, &cs.EngagementLengthValue, &cs.EngagementLengthUnit, &cs.EngagementLengthLabel,
			&frontEndRaw, &cs.EngagementType, &cs.QuoteText, &cs.QuoteAuthor,
			&cs.AboutClientHeading, &cs.AboutClientText, &cs.ChallengeTitle, &challengeParaRaw, &cs.ChallengeCalloutQuote,
			&cs.SolutionTitle, &cs.SolutionSubtitle, &cs.TechnologiesTitle, &techRaw, &cs.OutcomeTitle, &cs.OutcomeSubtitle,
			&outcomeBulletsRaw, &cs.OutcomeImage, &cs.PreviousSlug, &cs.PreviousText, &cs.PreviousClientName,
			&cs.NextSlug, &cs.NextText, &cs.NextClientName, &cs.CTAHeading, &cs.CTASubheading, &cs.CTAButtonText, &cs.CreatedAt,
		)
		if err != nil {
			log.Printf("Error scanning case study row: %v\n", err)
			continue
		}

		cs.Keywords = splitStringSlice(keywordsRaw)
		cs.FrontEndTechTags = splitStringSlice(frontEndRaw)
		cs.ChallengeParagraphs = splitStringSlice(challengeParaRaw)
		cs.Technologies = splitStringSlice(techRaw)
		cs.OutcomeBullets = splitStringSlice(outcomeBulletsRaw)

		list = append(list, cs)
	}

	if list == nil {
		list = []CaseStudy{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *CaseStudyHandler) GetCaseStudyBySlug(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	row := h.DB.QueryRow(`
		SELECT id, slug, title, client_name, category, meta_description, keywords,
			hero_category_text, hero_title, hero_image, summary_title, summary_text,
			client_brand_name, engagement_length_value, engagement_length_unit, engagement_length_label,
			front_end_tech_tags, engagement_type, COALESCE(quote_text,''), COALESCE(quote_author,''),
			about_client_heading, about_client_text, challenge_title, challenge_paragraphs, challenge_callout_quote,
			solution_title, solution_subtitle, technologies_title, technologies, outcome_title, outcome_subtitle,
			outcome_bullets, outcome_image, COALESCE(previous_slug,''), COALESCE(previous_text,''), COALESCE(previous_client_name,''),
			COALESCE(next_slug,''), COALESCE(next_text,''), COALESCE(next_client_name,''), cta_heading, cta_subheading, cta_button_text, created_at
		FROM case_studies
		WHERE LOWER(slug) = LOWER($1)
	`, slug)

	var cs CaseStudy
	var keywordsRaw, frontEndRaw, challengeParaRaw, techRaw, outcomeBulletsRaw string

	err := row.Scan(
		&cs.ID, &cs.Slug, &cs.Title, &cs.ClientName, &cs.Category, &cs.MetaDescription, &keywordsRaw,
		&cs.HeroCategoryText, &cs.HeroTitle, &cs.HeroImage, &cs.SummaryTitle, &cs.SummaryText,
		&cs.ClientBrandName, &cs.EngagementLengthValue, &cs.EngagementLengthUnit, &cs.EngagementLengthLabel,
		&frontEndRaw, &cs.EngagementType, &cs.QuoteText, &cs.QuoteAuthor,
		&cs.AboutClientHeading, &cs.AboutClientText, &cs.ChallengeTitle, &challengeParaRaw, &cs.ChallengeCalloutQuote,
		&cs.SolutionTitle, &cs.SolutionSubtitle, &cs.TechnologiesTitle, &techRaw, &cs.OutcomeTitle, &cs.OutcomeSubtitle,
		&outcomeBulletsRaw, &cs.OutcomeImage, &cs.PreviousSlug, &cs.PreviousText, &cs.PreviousClientName,
		&cs.NextSlug, &cs.NextText, &cs.NextClientName, &cs.CTAHeading, &cs.CTASubheading, &cs.CTAButtonText, &cs.CreatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Case study not found", http.StatusNotFound)
			return
		}
		log.Printf("Error querying case study by slug '%s': %v\n", slug, err)
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	cs.Keywords = splitStringSlice(keywordsRaw)
	cs.FrontEndTechTags = splitStringSlice(frontEndRaw)
	cs.ChallengeParagraphs = splitStringSlice(challengeParaRaw)
	cs.Technologies = splitStringSlice(techRaw)
	cs.OutcomeBullets = splitStringSlice(outcomeBulletsRaw)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cs)
}

func (h *CaseStudyHandler) CreateCaseStudy(w http.ResponseWriter, r *http.Request) {
	var payload CaseStudy
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	if payload.Slug == "" || payload.ClientName == "" || payload.Title == "" {
		http.Error(w, "Missing required fields: slug, clientName, title", http.StatusBadRequest)
		return
	}

	keywordsRaw := strings.Join(payload.Keywords, "||")
	frontEndRaw := strings.Join(payload.FrontEndTechTags, "||")
	challengeParaRaw := strings.Join(payload.ChallengeParagraphs, "||")
	techRaw := strings.Join(payload.Technologies, "||")
	outcomeBulletsRaw := strings.Join(payload.OutcomeBullets, "||")

	query := `
		INSERT INTO case_studies (
			slug, title, client_name, category, meta_description, keywords,
			hero_category_text, hero_title, hero_image, summary_title, summary_text,
			client_brand_name, engagement_length_value, engagement_length_unit, engagement_length_label,
			front_end_tech_tags, engagement_type, quote_text, quote_author,
			about_client_heading, about_client_text, challenge_title, challenge_paragraphs, challenge_callout_quote,
			solution_title, solution_subtitle, technologies_title, technologies, outcome_title, outcome_subtitle,
			outcome_bullets, outcome_image, previous_slug, previous_text, previous_client_name,
			next_slug, next_text, next_client_name, cta_heading, cta_subheading, cta_button_text
		) VALUES (
			$1, $2, $3, $4, $5, $6,
			$7, $8, $9, $10, $11,
			$12, $13, $14, $15,
			$16, $17, $18, $19,
			$20, $21, $22, $23, $24,
			$25, $26, $27, $28, $29, $30,
			$31, $32, $33, $34, $35,
			$36, $37, $38, $39, $40, $41
		) RETURNING id, created_at
	`

	err := h.DB.QueryRow(query,
		payload.Slug, payload.Title, payload.ClientName, payload.Category, payload.MetaDescription, keywordsRaw,
		payload.HeroCategoryText, payload.HeroTitle, payload.HeroImage, payload.SummaryTitle, payload.SummaryText,
		payload.ClientBrandName, payload.EngagementLengthValue, payload.EngagementLengthUnit, payload.EngagementLengthLabel,
		frontEndRaw, payload.EngagementType, payload.QuoteText, payload.QuoteAuthor,
		payload.AboutClientHeading, payload.AboutClientText, payload.ChallengeTitle, challengeParaRaw, payload.ChallengeCalloutQuote,
		payload.SolutionTitle, payload.SolutionSubtitle, payload.TechnologiesTitle, techRaw, payload.OutcomeTitle, payload.OutcomeSubtitle,
		outcomeBulletsRaw, payload.OutcomeImage, payload.PreviousSlug, payload.PreviousText, payload.PreviousClientName,
		payload.NextSlug, payload.NextText, payload.NextClientName, payload.CTAHeading, payload.CTASubheading, payload.CTAButtonText,
	).Scan(&payload.ID, &payload.CreatedAt)

	if err != nil {
		log.Printf("Error creating case study: %v\n", err)
		http.Error(w, "Failed to create case study", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(payload)
}

func (h *CaseStudyHandler) UpdateCaseStudy(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	var payload CaseStudy
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	keywordsRaw := strings.Join(payload.Keywords, "||")
	frontEndRaw := strings.Join(payload.FrontEndTechTags, "||")
	challengeParaRaw := strings.Join(payload.ChallengeParagraphs, "||")
	techRaw := strings.Join(payload.Technologies, "||")
	outcomeBulletsRaw := strings.Join(payload.OutcomeBullets, "||")

	query := `
		UPDATE case_studies SET
			slug=$1, title=$2, client_name=$3, category=$4, meta_description=$5, keywords=$6,
			hero_category_text=$7, hero_title=$8, hero_image=$9, summary_title=$10, summary_text=$11,
			client_brand_name=$12, engagement_length_value=$13, engagement_length_unit=$14, engagement_length_label=$15,
			front_end_tech_tags=$16, engagement_type=$17, quote_text=$18, quote_author=$19,
			about_client_heading=$20, about_client_text=$21, challenge_title=$22, challenge_paragraphs=$23, challenge_callout_quote=$24,
			solution_title=$25, solution_subtitle=$26, technologies_title=$27, technologies=$28, outcome_title=$29, outcome_subtitle=$30,
			outcome_bullets=$31, outcome_image=$32, previous_slug=$33, previous_text=$34, previous_client_name=$35,
			next_slug=$36, next_text=$37, next_client_name=$38, cta_heading=$39, cta_subheading=$40, cta_button_text=$41
		WHERE id=$42
	`

	_, err = h.DB.Exec(query,
		payload.Slug, payload.Title, payload.ClientName, payload.Category, payload.MetaDescription, keywordsRaw,
		payload.HeroCategoryText, payload.HeroTitle, payload.HeroImage, payload.SummaryTitle, payload.SummaryText,
		payload.ClientBrandName, payload.EngagementLengthValue, payload.EngagementLengthUnit, payload.EngagementLengthLabel,
		frontEndRaw, payload.EngagementType, payload.QuoteText, payload.QuoteAuthor,
		payload.AboutClientHeading, payload.AboutClientText, payload.ChallengeTitle, challengeParaRaw, payload.ChallengeCalloutQuote,
		payload.SolutionTitle, payload.SolutionSubtitle, payload.TechnologiesTitle, techRaw, payload.OutcomeTitle, payload.OutcomeSubtitle,
		outcomeBulletsRaw, payload.OutcomeImage, payload.PreviousSlug, payload.PreviousText, payload.PreviousClientName,
		payload.NextSlug, payload.NextText, payload.NextClientName, payload.CTAHeading, payload.CTASubheading, payload.CTAButtonText,
		id,
	)

	if err != nil {
		log.Printf("Error updating case study ID %d: %v\n", id, err)
		http.Error(w, "Failed to update case study", http.StatusInternalServerError)
		return
	}

	payload.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payload)
}

func (h *CaseStudyHandler) DeleteCaseStudy(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	_, err = h.DB.Exec(`DELETE FROM case_studies WHERE id=$1`, id)
	if err != nil {
		log.Printf("Error deleting case study ID %d: %v\n", id, err)
		http.Error(w, "Failed to delete case study", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Case study deleted successfully"}`))
}

func splitStringSlice(s string) []string {
	if s == "" {
		return []string{}
	}
	parts := strings.Split(s, "||")
	var result []string
	for _, p := range parts {
		trimmed := strings.TrimSpace(p)
		if trimmed != "" {
			result = append(result, trimmed)
		}
	}
	if result == nil {
		return []string{}
	}
	return result
}
