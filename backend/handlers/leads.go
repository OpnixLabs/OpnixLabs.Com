package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
)

// Global flag to toggle spam / bot detection (Off by default as requested)
var EnableSpamDetection = false

type Lead struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Message   string    `json:"message"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

type CreateLeadPayload struct {
	Name           string `json:"name"`
	Email          string `json:"email"`
	Message        string `json:"message"`
	Honeypot       string `json:"honeypot,omitempty"`        // Invisible bot trap field
	TurnstileToken string `json:"turnstile_token,omitempty"`// Cloudflare Turnstile verification token
}

type UpdateLeadStatusPayload struct {
	Status string `json:"status"`
}

type LeadHandler struct {
	DB *sql.DB
}

func NewLeadHandler(db *sql.DB) *LeadHandler {
	return &LeadHandler{DB: db}
}

// Helper to evaluate bot/spam submissions (Disabled by default via EnableSpamDetection = false)
func isSpamOrBot(payload CreateLeadPayload) bool {
	if !EnableSpamDetection {
		return false
	}

	// 1. Check Honeypot: Automated spambots automatically populate hidden fields
	if strings.TrimSpace(payload.Honeypot) != "" {
		return true
	}

	// 2. Link flooding heuristics filter
	linkCount := strings.Count(payload.Message, "http://") + strings.Count(payload.Message, "https://")
	if linkCount > 3 {
		return true
	}

	return false
}

// CreateLead handles POST /api/leads
func (h *LeadHandler) CreateLead(w http.ResponseWriter, r *http.Request) {
	var payload CreateLeadPayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	if payload.Name == "" || payload.Email == "" || payload.Message == "" {
		http.Error(w, "Name, email, and message are required fields", http.StatusBadRequest)
		return
	}

	if isSpamOrBot(payload) {
		// Return fake 201 response to confuse automated spammers without polluting the database
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(Lead{
			ID:        9999,
			Name:      payload.Name,
			Email:     payload.Email,
			Message:   payload.Message,
			Status:    "spam_filtered",
			CreatedAt: time.Now(),
		})
		return
	}

	query := `INSERT INTO leads (name, email, message, status) VALUES ($1, $2, $3, 'new') RETURNING id, created_at`
	var lead Lead
	lead.Name = payload.Name
	lead.Email = payload.Email
	lead.Message = payload.Message
	lead.Status = "new"

	err := h.DB.QueryRow(query, payload.Name, payload.Email, payload.Message).Scan(&lead.ID, &lead.CreatedAt)
	if err != nil {
		http.Error(w, "Failed to save lead: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(lead)
}

// GetLeads handles GET /api/leads
func (h *LeadHandler) GetLeads(w http.ResponseWriter, r *http.Request) {
	query := `SELECT id, name, email, message, status, created_at FROM leads ORDER BY created_at DESC`
	rows, err := h.DB.Query(query)
	if err != nil {
		http.Error(w, "Failed to query leads: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	leads := make([]Lead, 0)
	for rows.Next() {
		var l Lead
		if err := rows.Scan(&l.ID, &l.Name, &l.Email, &l.Message, &l.Status, &l.CreatedAt); err != nil {
			http.Error(w, "Error scanning lead: "+err.Error(), http.StatusInternalServerError)
			return
		}
		leads = append(leads, l)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(leads)
}

// UpdateLeadStatus handles PUT /api/leads/{id}/status
func (h *LeadHandler) UpdateLeadStatus(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid lead ID", http.StatusBadRequest)
		return
	}

	var payload UpdateLeadStatusPayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil || payload.Status == "" {
		http.Error(w, "Status is required", http.StatusBadRequest)
		return
	}

	result, err := h.DB.Exec(`UPDATE leads SET status = $1 WHERE id = $2`, payload.Status, id)
	if err != nil {
		http.Error(w, "Failed to update lead status: "+err.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Lead not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Lead status updated successfully"}`))
}

// DeleteLead handles DELETE /api/leads/{id}
func (h *LeadHandler) DeleteLead(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid lead ID", http.StatusBadRequest)
		return
	}

	result, err := h.DB.Exec(`DELETE FROM leads WHERE id = $1`, id)
	if err != nil {
		http.Error(w, "Failed to delete lead: "+err.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Lead not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message": "Lead deleted successfully"}`))
}
