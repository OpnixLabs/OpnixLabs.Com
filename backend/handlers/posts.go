package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"opnixlabs-backend/utils"
)

type Post struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Slug        string    `json:"slug"`
	ContentHTML string    `json:"content_html"`
	CreatedAt   time.Time `json:"created_at"`
}

type CreatePostInput struct {
	Title       string `json:"title"`
	ContentHTML string `json:"content_html"`
}

type PostHandler struct {
	DB *sql.DB
}

func NewPostHandler(db *sql.DB) *PostHandler {
	return &PostHandler{DB: db}
}

// GET /api/posts
func (h *PostHandler) GetPosts(w http.ResponseWriter, r *http.Request) {
	rows, err := h.DB.Query(`SELECT id, title, slug, content_html, created_at FROM posts ORDER BY created_at DESC`)
	if err != nil {
		http.Error(w, "Failed to fetch posts: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	posts := make([]Post, 0)
	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, &p.Title, &p.Slug, &p.ContentHTML, &p.CreatedAt); err != nil {
			http.Error(w, "Failed to scan post: "+err.Error(), http.StatusInternalServerError)
			return
		}
		posts = append(posts, p)
	}
	if err := rows.Err(); err != nil {
		http.Error(w, "Failed iterating posts: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// GET /api/posts/id/{id}
func (h *PostHandler) GetPostByID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	var p Post
	err = h.DB.QueryRow(`SELECT id, title, slug, content_html, created_at FROM posts WHERE id = $1`, id).
		Scan(&p.ID, &p.Title, &p.Slug, &p.ContentHTML, &p.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Database query error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

// GET /api/posts/{slug}
func (h *PostHandler) GetPostBySlug(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	if slug == "" {
		http.Error(w, "Slug parameter required", http.StatusBadRequest)
		return
	}

	var p Post
	err := h.DB.QueryRow(`SELECT id, title, slug, content_html, created_at FROM posts WHERE slug = $1`, slug).
		Scan(&p.ID, &p.Title, &p.Slug, &p.ContentHTML, &p.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Database query error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

// POST /api/posts
func (h *PostHandler) CreatePost(w http.ResponseWriter, r *http.Request) {
	var input CreatePostInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid JSON payload: "+err.Error(), http.StatusBadRequest)
		return
	}

	if input.Title == "" || input.ContentHTML == "" {
		http.Error(w, "Title and content_html are required", http.StatusUnprocessableEntity)
		return
	}

	slug := utils.GenerateSlug(input.Title)

	var newPost Post
	err := h.DB.QueryRow(
		`INSERT INTO posts (title, slug, content_html) VALUES ($1, $2, $3) RETURNING id, title, slug, content_html, created_at`,
		input.Title, slug, input.ContentHTML,
	).Scan(&newPost.ID, &newPost.Title, &newPost.Slug, &newPost.ContentHTML, &newPost.CreatedAt)

	if err != nil {
		http.Error(w, "Failed to insert post: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newPost)
}

// PUT /api/posts/{id}
func (h *PostHandler) UpdatePost(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	var input CreatePostInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid JSON payload: "+err.Error(), http.StatusBadRequest)
		return
	}

	if input.Title == "" || input.ContentHTML == "" {
		http.Error(w, "Title and content_html are required", http.StatusUnprocessableEntity)
		return
	}

	var updatedPost Post
	err = h.DB.QueryRow(
		`UPDATE posts SET title = $1, content_html = $2 WHERE id = $3 RETURNING id, title, slug, content_html, created_at`,
		input.Title, input.ContentHTML, id,
	).Scan(&updatedPost.ID, &updatedPost.Title, &updatedPost.Slug, &updatedPost.ContentHTML, &updatedPost.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Failed to update post: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedPost)
}

// DELETE /api/posts/{id}
func (h *PostHandler) DeletePost(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	res, err := h.DB.Exec(`DELETE FROM posts WHERE id = $1`, id)
	if err != nil {
		http.Error(w, "Failed to delete post: "+err.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil || rowsAffected == 0 {
		http.Error(w, "Post not found or already deleted", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
