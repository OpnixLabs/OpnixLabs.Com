package utils

import (
	"fmt"
	"regexp"
	"strings"
	"time"
)

// GenerateSlug takes a title, converts it to lowercase, replaces non-alphanumeric
// characters/spaces with hyphens, deduplicates hyphens, and appends the current Unix timestamp.
func GenerateSlug(title string) string {
	// Convert to lowercase
	slug := strings.ToLower(title)

	// Replace non-alphanumeric characters with hyphens
	reg := regexp.MustCompile(`[^a-z0-9]+`)
	slug = reg.ReplaceAllString(slug, "-")

	// Trim leading and trailing hyphens
	slug = strings.Trim(slug, "-")

	// Append current Unix timestamp
	timestamp := time.Now().Unix()

	if slug == "" {
		slug = "post"
	}

	return fmt.Sprintf("%s-%d", slug, timestamp)
}
