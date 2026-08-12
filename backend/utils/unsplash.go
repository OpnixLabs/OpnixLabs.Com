package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

type UnsplashPhoto struct {
	URLs struct {
		Regular string `json:"regular"`
		Full    string `json:"full"`
	} `json:"urls"`
	AltDescription string `json:"alt_description"`
}

type UnsplashSearchResult struct {
	Results []UnsplashPhoto `json:"results"`
}

// curated fallback images — high-quality Unsplash tech/software photos
var curatedTechImages = []string{
	"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80", // code on screen
	"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80", // earth data
	"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80", // matrix code
	"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80", // server room
	"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80", // circuit board
	"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80", // code laptop
	"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80", // network cables
	"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80", // cybersecurity
	"https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&auto=format&fit=crop&q=80", // woman coding
	"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80", // laptop code
}

// FetchUnsplashImage searches Unsplash for a relevant image based on keywords,
// uploads it to Cloudinary, and returns the final URL.
// Falls back to curated tech images if Unsplash API is unavailable.
func FetchUnsplashImage(query string, fallbackIndex int) string {
	accessKey := os.Getenv("UNSPLASH_ACCESS_KEY")

	if accessKey == "" {
		// No Unsplash key configured — use curated fallback
		return curatedTechImages[fallbackIndex%len(curatedTechImages)]
	}

	// Clean up query for better search results
	cleanQuery := sanitizeSearchQuery(query)

	apiURL := fmt.Sprintf(
		"https://api.unsplash.com/search/photos?query=%s&per_page=5&orientation=landscape&content_filter=high",
		url.QueryEscape(cleanQuery),
	)

	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		log.Printf("Unsplash request error: %v\n", err)
		return curatedTechImages[fallbackIndex%len(curatedTechImages)]
	}
	req.Header.Set("Authorization", fmt.Sprintf("Client-ID %s", accessKey))

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Unsplash API error: %v\n", err)
		return curatedTechImages[fallbackIndex%len(curatedTechImages)]
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		log.Printf("Unsplash API returned %d: %s\n", resp.StatusCode, string(body))
		return curatedTechImages[fallbackIndex%len(curatedTechImages)]
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Unsplash read error: %v\n", err)
		return curatedTechImages[fallbackIndex%len(curatedTechImages)]
	}

	var result UnsplashSearchResult
	if err := json.Unmarshal(body, &result); err != nil {
		log.Printf("Unsplash JSON parse error: %v\n", err)
		return curatedTechImages[fallbackIndex%len(curatedTechImages)]
	}

	if len(result.Results) == 0 {
		log.Printf("Unsplash: no results for query '%s', using fallback\n", cleanQuery)
		return curatedTechImages[fallbackIndex%len(curatedTechImages)]
	}

	// Pick a photo — use fallbackIndex to vary selection across images in the same article
	photo := result.Results[fallbackIndex%len(result.Results)]
	imageURL := photo.URLs.Regular
	if imageURL == "" {
		imageURL = photo.URLs.Full
	}

	// Upload to Cloudinary for permanence
	cloudinaryURL, err := UploadImageToCloudinary(imageURL)
	if err != nil {
		log.Printf("Cloudinary upload warning: %v (using Unsplash direct URL)\n", err)
		return imageURL
	}

	return cloudinaryURL
}

// sanitizeSearchQuery extracts useful keywords from a prompt/alt text
func sanitizeSearchQuery(query string) string {
	// Remove overly specific technical jargon that won't return good Unsplash results
	replacer := strings.NewReplacer(
		"data-image-prompt", "",
		"data-image-id", "",
		"IMAGE_1", "",
		"IMAGE_2", "",
		"IMAGE_3", "",
		"IMAGE_4", "",
	)
	query = replacer.Replace(query)

	// Trim and limit length for better search results
	query = strings.TrimSpace(query)
	if len(query) > 80 {
		query = query[:80]
	}

	return query
}
