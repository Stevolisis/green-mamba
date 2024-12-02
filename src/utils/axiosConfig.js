const { default: axios } = require("axios");

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AxiosBaseURL,
    // baseURL: "https://harmonic-web.vercel.app",
});

export const baseURL = process.env.NEXT_PUBLIC_baseURL;