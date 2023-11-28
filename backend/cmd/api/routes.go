package main

import (
	"expvar"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.NotFound = http.HandlerFunc(app.notFoundResponse)
	router.MethodNotAllowed = http.HandlerFunc(app.methodNotAllowedResponse)

	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthcheckHandler)

	router.HandlerFunc(http.MethodPost, "/v1/users", app.registerUserHandler)
	router.HandlerFunc(http.MethodPost, "/v1/tokens/authentication", app.createAuthenticationTokenHandler)

	router.HandlerFunc(http.MethodGet, "/v1/stocks/list", app.requireAuthenticatedUser(app.activeStocksListHandler))
	router.HandlerFunc(http.MethodGet, "/v1/stocks/news", app.requireAuthenticatedUser(app.newsSentimentHandler))
	router.HandlerFunc(http.MethodGet, "/v1/stocks/ranking", app.requireAuthenticatedUser(app.topStocksHandler))
	router.HandlerFunc(http.MethodGet, "/v1/stocks/timeseries/daily-adjusted", app.requireAuthenticatedUser(app.dailyAdjustedTimeSeries))

	router.Handler(http.MethodGet, "/debug/vars", expvar.Handler())

	return app.logRequest(app.metrics(app.recoverPanic(app.enableCORS(app.rateLimit(app.authenticate(router))))))
}
