import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: { "x-api-key": import.meta.env.VITE_API_TOKEN }
})