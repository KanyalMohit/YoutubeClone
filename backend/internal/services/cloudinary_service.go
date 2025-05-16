package services

import (
	"context"
	"log"
	"mime/multipart"
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

func (vs *VideoService) UploadVideoToCloudinary(file multipart.File, header *multipart.FileHeader) (string, error) {
	log.Println(os.Getenv("CLOUDINARY_CLOUD_NAME"), os.Getenv("CLOUDINARY_API"), os.Getenv("CLOUDINARY_API_SECRET"))
	cld, _ := cloudinary.NewFromParams(
		os.Getenv("CLOUDINARY_CLOUD_NAME"),
		os.Getenv("CLOUDINARY_API"),
		os.Getenv("CLOUDINARY_API_SECRET"),
	)

	resp, err := cld.Upload.Upload(
		context.Background(),
		file,
		uploader.UploadParams{
			PublicID: header.Filename,
			Folder:   "videos",
		},
	)

	if err != nil {
		log.Println("Error uploading to Cloudinary:", err)
		return "", err
	}
	log.Println("Cloudinary response:", resp)
	return resp.SecureURL, nil
}
