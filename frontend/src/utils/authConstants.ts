export const DEVELOPMENT_API_BASE_URL = 'http://localhost:4000/v1';

export const PRODUCTION_API_BASE_URL = '';


export const apiUrl = process.env.NODE_ENV === "development" ? DEVELOPMENT_API_BASE_URL : PRODUCTION_API_BASE_URL;

export const LOCAL_STORAGE_AUTH_TOKEN_KEY = "AUTHENTICATION_TOKEN"
