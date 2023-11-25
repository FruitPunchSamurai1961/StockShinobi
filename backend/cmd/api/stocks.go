package main

import (
	"context"
	"net/http"
	"time"
)

func (app *application) activeStocksListHandler(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	listings, err := app.apiClient.GetLatestActiveListingStatus(ctx)

	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"listings": listings}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
