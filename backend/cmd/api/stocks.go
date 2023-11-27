package main

import (
	"context"
	"github.com/FruitPunchSamurai1961/goalphavantage"
	"net/http"
	"time"
)

func (app *application) activeStocksListHandler(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	listings, err := app.apiClient.GetLatestActiveListingStatus(ctx)

	if err != nil {
		switch {
		case goalphavantage.IsAPIError(err):
			app.badRequestResponse(w, r, err)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"listings": listings}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) topStocksHandler(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	ranking, err := app.apiClient.GetTopGainersLosers(ctx)

	if err != nil {
		switch {
		case goalphavantage.IsAPIError(err):
			app.badRequestResponse(w, r, err)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"ranking": ranking}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

}

func (app *application) newsSentimentHandler(w http.ResponseWriter, r *http.Request) {
	var input goalphavantage.NewsSentimentOptions

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	qs := r.URL.Query()
	input.Tickers = app.readCommaSeperatedValues(qs, "tickers", []string{})

	news, err := app.apiClient.GetNewsSentiment(ctx, &input)

	if err != nil {
		switch {
		case goalphavantage.IsAPIError(err):
			app.badRequestResponse(w, r, err)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"news": news}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
