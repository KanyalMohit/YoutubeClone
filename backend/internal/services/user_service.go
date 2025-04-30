package services

import (
	"backend/internal/database"
	"backend/internal/models"
	"database/sql"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	DB *sql.DB
}

func NewUserService(db *sql.DB) *UserService {
	return &UserService{
		DB: db,
	}
}

func (s *UserService) CreateUser(user *models.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	_, err = s.DB.Exec(
		database.CreateUserQuery,
		user.ID, user.Username, user.Email, user.Password, user.CreatedAt, user.UpdatedAt,
	)
	return err
}

func (s *UserService) Authenticate(email, password string) (*models.User, error) {
	var user models.User

	err := s.DB.QueryRow(database.GetUserByEmailQuery, email).Scan(
		&user.ID, &user.Username, &user.Email, &user.Password,
	)
	if err != nil {
		return nil, errors.New("User not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, errors.New("Invalid password")
	}

	return &user, nil
}

func (s *UserService) GetProfile(userID string) (*models.User, error) {
	var user models.User

	err := s.DB.QueryRow(database.GetUserByIDQuery, userID).Scan(
		&user.ID, &user.Username, &user.Email)

	if err != nil {
		return nil, err
	}

	return &user, nil

}
