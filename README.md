# Delivery Document for StockShinobi

This is our StockShinobi web application. These are insturctions on how to use locally, release notes, and changes to be made.

# Install Guide
Follow these instructions to launch local instance of StockShinobi website.

## Pre-requisites
### Software requirements
* [GoLang](https://go.dev/doc/install)
* Docker
* Git
* Git repo file path (https://github.com/FruitPunchSamurai1961/StockShinobi)

### Hardware requirements
* Server Infrastructure: Cloud Hosting where we are using GCP
* Database server such as PostgresSQL

### Frontend/backend Dependencies
* ReactJS
* GoLang
* Database: PostgresSQL

### Code Editor
* Intellij
* Visual code studio


### Libraries and APIs
* alphavantage
* ChakraUI
* [Client Wrapper](https://pkg.go.dev/github.com/FruitPunchSamurai1961/goalphavantage)

### Deployment and Hosting
* Google Cloud Platform

## Dependent Libraries
* None

## Download and Build Instructions

### Cloning
 First open terminal and go to the directory where you want to place the repo.
* Run
```shell script
git clone https://github.com/FruitPunchSamurai1961/StockShinobi.git
```
to clone repo into local repo.
* Open repo on local machine using an IDE preferably Intellij.

### Compilation and Build
Make sure you are in StockShinobi directory to run
```shell script
go build
```
## Application Installation and Run

### Install and Database Configuration

1. Run the docker-compose file: `docker compose up`
2. Run the provided initial db files in `./db/*`. Run in the following order:
    1. `createDB.sql`
    2. `user.sql`
    3. `tokens.sql`
3. Create a `.env` file containing your postgres url and an API Key for AlphaVantage:
    1. `DB_DSN="postgres://postgres:mysecretpassword@localhost:5432/stockshinobi_db?sslmode=disable"`
   2. `AV_API_KEY=[KEYVALUEHERE]` (AlphaVantage Pro Key)
4. Download all go dependencies via `go mod download`
5. Start the server via `go run ./cmd/api`.
6. Check out [useful commands](#useful-commands) for more info

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
### Launch

Command to install dependencies: `npm install --save --legacy-peer-deps`


## Directory Structure
```
├───assets
│   ├───css
│   └───images
├───components
├───redux
├───ts
├───dev
├───utils
└───views
```

```
Assets: Static Files
Components: Smaller Reusable Components
Redux: Redux code to manage states and api calls
Ts: stores all types, interfaces, and enums
Utils: Helper Code for Frontend
Views: Main Components that combine the /Components/* to render pages
Dev: React Buddy code to help with development
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Troubleshooting
### Can't download app/Install app
* Check if there is storage left on device
* Check if compatible with current OS

### Freezing while installing
Restart device and try to install again

### Why can't I access localhost:3000?
You probably need -cors-trusted-origins="http://localhost:3000" in program arguments

# Frequently Asked Questions(FAQ)
### How can I improve app performance?
Make sure you keep window usage to the minimum. Close all other applications to ensure maximum effectivness in loading times. Use task manager or activity moniter for Windows and Mac respectively to check performance.

### Why can't do my notes disappear when I refresh the page?
Note saving hasn't been implemented yet so keep in mind when you leave the page it will disappear.


### A bug or technical issue was found. How can I report it?
Please contact our development team so we can put it our to-do list 

## Credits
Team 16 A.K.A. It's My Cat Too

## License

© It's My Cat Too, 2023

## Release Notes

StockShinobi Version [1.0.0] Release Notes

Release Date [11/28/2023]

## Features:
* Create and login to a personal account to gain access
* Search and visualize any stock on the market
* Personalized news feed for each individual stock
* View the daily top gainers, biggest losers, and most traded
* The ability to write notes for a stock

## New Features:
* Basic stock calculations: Perform calculations for buy/sell transactions, including total cost, profit/loss, and percentage change.
* Multi-currency support: Calculate stock values in different currencies for a global perspective.
* User-friendly interface: Intuitive design for easy input and result visualization.
* Real-time stock data: Fetch current stock prices to provide up-to-date calculations.
* The ability to toogle Dark Mode!

## Fixes and Improvements:
Bug Fixes:
Resolved issue with incorrect currency conversion rates.
Fixed a calculation bug causing inaccurate profit/loss values.

Enhancements:
Improved performance for faster calculations.
Added tooltips for better user guidance.
Enhanced error handling for a more robust user experience.
Licensed under the [MIT License]()

## To do: 
* Add ability to backtest trading strategies
* Add ability to see Monthly/Weekly/Intraday stock prices
* Add ability to get real time quotes
* Add ability to save notes and read them later
* Send error message if trying to login with an account that doesn't exist

## Thanks for using StockShinobi!

We're committed to helping you make financially responsible choices like a Shinobi!

---
