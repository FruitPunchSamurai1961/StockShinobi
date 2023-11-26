# StockShinobi Backend

## Description

TODO

## Installation

1. Clone the repo locally
2. Run the docker-compose file: `docker compse up`
3. Run the provided initial db files in `./db/*`. Run in the following order:
    1. `createDB.sql`
    2. `user.sql`
    3. `tokens.sql`
4. Create a `.env` file containing your postgres url and an API Key for AlphaVantage:
    1. `DB_DSN="postgres://postgres:mysecretpassword@localhost:5432/stockshinobi_db?sslmode=disable"`
   2. `AV_API_KEY=[KEYVALUEHERE]`
5. Download all go dependencies via `go mod download`
6. Start the server via `go run ./cmd/api`.
7. Check out [useful commands](#useful-commands) for more info

## Usage

TODO

## Useful Commands

### `go run ./cmd/api`

Starts the backend server on port `:4000`.

The following are environmental variable you can pass in:

1. `port`: The port to run the server one
2. `env`: The current environment the server is running on.
3. `db-dsn`: The link to the postgres database
4. `db-max-open-conns`: How many concurrent open connections allowed
5. `db-max-idle-conns`: How many idle connections are allowed
6. `db-max-idle-time`: How much time to wait before closing idle connections
7. `limiter-rps`: How many requests allowed per seconds
8. `limiter-burst`: How many max requests in a burst
9. `limiter-enabled`: Boolean Value indicating if rate limiting is allowed or not
10. `cors-trusted-origins`: String seperated list of sites which are allowed to access the backend server
11. `version`: Boolean Value if set to true displays the version number and the build time

Most common use case for development: `go run ./cmd/api -cors-trusted-origins="http://localhost:3000"`

### `go mod tidy`

Adds necessary and removes unnecessary dependencies from `go.mod`

### `go mod verify`

Verifies the checksum of the dependencies

### `go fmt ./...`

Formats all the go files according to the Go standard

### `go vet ./...`

Runs tons of analyzers which carry out static analysis to detect things such as unreachable code, unnecessary
assignments, etc.

### `staticcheck ./...`

Third Party tool to run additional static analysis. Included in the `go.mod` file

### `go test -race ./...` OR `go test -race -vet=off ./...`

Runs the tests in the directories and also checks for race conditions. Use the second command if you don't care about
static analysis.

## Directory Structure

```
├───cmd
│   └───api
├───internal
├───db
└───remote
```

```
cmd: Main API Code
internal: Helper Functions
migrations: SQL Code
remote: Configuration/Set-up Files
```

## Credits

Team 16 A.K.A. It's My Cat Too

## License

© It's My Cat Too, 2023

Licensed under the [MIT License]()
---