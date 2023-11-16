export const DEVELOPMENT_API_BASE_URL = 'http://localhost:4000/v1';

export const PRODUCTION_API_BASE_URL = '';


export const apiUrl = process.env.NODE_ENV === "development" ? DEVELOPMENT_API_BASE_URL : PRODUCTION_API_BASE_URL;

export const AV_API_KEY = "2H26FC7FC12UM05I";
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const CAPTCHA_TOKEN = 'CAPTCHA_TOKEN';