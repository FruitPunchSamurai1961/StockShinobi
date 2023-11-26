package data

import (
	"StockShinobi.FruitPunchSamurai1961.net/internal/validator"
	"context"
	"crypto/rand"
	"crypto/sha256"
	"database/sql"
	"encoding/base32"
	"errors"
	"time"
)

var (
	ErrUserAuthTokenExists = errors.New("data: user already has an authentication token")
)

type Token struct {
	Plaintext string    `json:"token"`
	Hash      []byte    `json:"-"`
	UserID    int64     `json:"-"`
	Expiry    time.Time `json:"expiry"`
	Version   int       `json:"-"`
}

func generateToken(userID int64, ttl time.Duration) (*Token, error) {
	token := &Token{
		UserID: userID,
		Expiry: time.Now().Add(ttl),
	}

	randomBytes := make([]byte, 16)
	_, err := rand.Read(randomBytes)
	if err != nil {
		return nil, err
	}

	token.Plaintext = base32.StdEncoding.WithPadding(base32.NoPadding).EncodeToString(randomBytes)

	hash := sha256.Sum256([]byte(token.Plaintext))
	token.Hash = hash[:]

	return token, nil
}

func ValidateTokenPlaintext(v *validator.Validator, tokenPlaintext string) {
	v.Check(tokenPlaintext != "", "token", "must be provided")
	v.Check(len(tokenPlaintext) == 26, "token", "must be 26 bytes long")
}

type TokenModel struct {
	DB *sql.DB
}

func (m TokenModel) New(userID int64, ttl time.Duration) (*Token, error) {
	token, err := generateToken(userID, ttl)
	if err != nil {
		return nil, err
	}

	err = m.GetVersion(token)
	if err != nil && errors.Is(err, ErrRecordNotFound) {
		err = m.Insert(token)
	} else if err == nil {
		err = m.Update(token)
	}
	return token, err
}

func (m TokenModel) GetVersion(token *Token) error {
	query := `
			SELECT version FROM tokens WHERE user_id = $1
	`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRowContext(ctx, query, token.UserID).Scan(&token.Version)

	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return ErrRecordNotFound
		default:
			return err
		}
	}
	return nil
}

func (m TokenModel) Update(token *Token) error {
	query := `
		UPDATE tokens
		SET hash = $1, expiry = $2, version = version + 1
		WHERE user_id = $3 AND version = $4
		RETURNING version
	`

	args := []any{token.Hash, token.Expiry, token.UserID, token.Version}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRowContext(ctx, query, args...).Scan(&token.Version)

	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return ErrEditConflict
		default:
			return err
		}
	}
	return nil
}

func (m TokenModel) Insert(token *Token) error {
	query := `
		INSERT INTO tokens (hash, user_id, expiry)
		VALUES ($1, $2, $3)
		RETURNING version
	`

	args := []any{token.Hash, token.UserID, token.Expiry}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRowContext(ctx, query, args...).Scan(&token.Version)
	if err != nil {
		switch {
		case err.Error() == `pq: duplicate key value violates unique constraint "tokens_user_id_key"`:
			return ErrUserAuthTokenExists
		default:
			return err
		}
	}
	return nil
}
