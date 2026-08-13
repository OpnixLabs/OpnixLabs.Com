package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"opnixlabs-backend/config"
	"opnixlabs-backend/cron"
	"opnixlabs-backend/db"
	"opnixlabs-backend/handlers"
)

func main() {
	cfg := config.LoadConfig()

	log.Println("Starting OpnixLabs Backend Server...")

	// Initialize Database
	database, err := db.InitDB(cfg.DatabaseURL)
	if err != nil {
		log.Printf("Warning: Database connection failed: %v. Running in offline/mock mode if needed.\n", err)
	} else {
		defer database.Close()
	}

	// Initialize and Start Weekly Gemini Auto-Blogging Cron Job
	var autoBlogger *cron.AutoBloggingCron
	if database != nil {
		autoBlogger = cron.NewAutoBloggingCron(database, cfg.GeminiAPIKey)
		if err := autoBlogger.StartScheduler(); err != nil {
			log.Printf("Error setting up Gemini auto-blogging cron: %v\n", err)
		}
	}

	// Initialize Router
	r := chi.NewRouter()

	// Global Middlewares
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Configure CORS for Next.js frontend
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// API Routes
	if database != nil {
		postHandler := handlers.NewPostHandler(database)
		leadHandler := handlers.NewLeadHandler(database)
		caseStudyHandler := handlers.NewCaseStudyHandler(database)

		registerPostRoutes := func(r chi.Router) {
			r.Get("/", postHandler.GetPosts)
			r.Post("/", postHandler.CreatePost)
			r.Get("/id/{id}", postHandler.GetPostByID)
			r.Get("/{slug}", postHandler.GetPostBySlug)
			r.Put("/{id}", postHandler.UpdatePost)
			r.Delete("/{id}", postHandler.DeletePost)
		}
		r.Route("/api/posts", registerPostRoutes)
		r.Route("/posts", registerPostRoutes)

		registerCaseStudyRoutes := func(r chi.Router) {
			r.Get("/", caseStudyHandler.GetCaseStudies)
			r.Post("/", caseStudyHandler.CreateCaseStudy)
			r.Get("/{slug}", caseStudyHandler.GetCaseStudyBySlug)
			r.Put("/{id}", caseStudyHandler.UpdateCaseStudy)
			r.Delete("/{id}", caseStudyHandler.DeleteCaseStudy)
		}
		r.Route("/api/case-studies", registerCaseStudyRoutes)
		r.Route("/case-studies", registerCaseStudyRoutes)

		registerLeadRoutes := func(r chi.Router) {
			r.Get("/", leadHandler.GetLeads)
			r.Post("/", leadHandler.CreateLead)
			r.Put("/{id}/status", leadHandler.UpdateLeadStatus)
			r.Delete("/{id}", leadHandler.DeleteLead)
		}
		r.Route("/api/leads", registerLeadRoutes)
		r.Route("/leads", registerLeadRoutes)

		triggerCronHandler := func(w http.ResponseWriter, r *http.Request) {
			if autoBlogger == nil {
				http.Error(w, "Auto blogger is not configured", http.StatusBadRequest)
				return
			}
			if err := autoBlogger.GenerateAndSavePost(); err != nil {
				log.Printf("Manual trigger error: %v\n", err)
				http.Error(w, "Failed to generate AI blog post: "+err.Error(), http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte(`{"message": "Gemini AI blog post generated and published successfully"}`))
		}
		r.Post("/api/admin/trigger-cron", triggerCronHandler)
		r.Post("/admin/trigger-cron", triggerCronHandler)
	}

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status": "OK"}`))
	})

	log.Printf("Server listening on port :%s\n", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
