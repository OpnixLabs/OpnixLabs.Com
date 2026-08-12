package utils

import (
	"bytes"
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"time"
)

type CloudinaryResponse struct {
	SecureURL string `json:"secure_url"`
	URL       string `json:"url"`
	Error     *struct {
		Message string `json:"message"`
	} `json:"error,omitempty"`
}

// UploadImageToCloudinary uploads an image (URL or Base64) directly to Cloudinary.
// If Cloudinary environment variables are missing, it gracefully returns the original image URL.
func UploadImageToCloudinary(imageSource string) (string, error) {
	cloudName := os.Getenv("CLOUDINARY_CLOUD_NAME")
	apiKey := os.Getenv("CLOUDINARY_API_KEY")
	apiSecret := os.Getenv("CLOUDINARY_API_SECRET")
	uploadPreset := os.Getenv("CLOUDINARY_UPLOAD_PRESET")

	// If no Cloudinary config is set, fallback gracefully to original AI image URL
	if cloudName == "" {
		return imageSource, nil
	}

	apiUrl := fmt.Sprintf("https://api.cloudinary.com/v1_1/%s/image/upload", cloudName)

	var body bytes.Buffer
	writer := multipart.NewWriter(&body)

	// Add file parameter (Cloudinary accepts direct HTTP image URLs in 'file')
	_ = writer.WriteField("file", imageSource)

	if uploadPreset != "" {
		_ = writer.WriteField("upload_preset", uploadPreset)
	} else if apiKey != "" && apiSecret != "" {
		timestamp := fmt.Sprintf("%d", time.Now().Unix())
		_ = writer.WriteField("api_key", apiKey)
		_ = writer.WriteField("timestamp", timestamp)

		// Signature string: timestamp=<val><apiSecret>
		sigStr := fmt.Sprintf("timestamp=%s%s", timestamp, apiSecret)
		h := sha1.New()
		h.Write([]byte(sigStr))
		signature := hex.EncodeToString(h.Sum(nil))
		_ = writer.WriteField("signature", signature)
	} else {
		// No auth mechanism configured, fallback to original
		return imageSource, nil
	}

	_ = writer.Close()

	req, err := http.NewRequest("POST", apiUrl, &body)
	if err != nil {
		return imageSource, err
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return imageSource, err
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return imageSource, err
	}

	var res CloudinaryResponse
	if err := json.Unmarshal(respBody, &res); err != nil {
		return imageSource, err
	}

	if res.Error != nil && res.Error.Message != "" {
		return imageSource, fmt.Errorf("Cloudinary error: %s", res.Error.Message)
	}

	if res.SecureURL != "" {
		return res.SecureURL, nil
	}
	if res.URL != "" {
		return res.URL, nil
	}

	return imageSource, nil
}
