import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AxiosBaseURL
});

export const baseURL = process.env.NEXT_PUBLIC_baseURL;