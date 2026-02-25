import axios from 'axios'
import React from 'react'
const apiUrl = import.meta.env.VITE_API_URL;

    const api = axios.create({
        baseURL: apiUrl,
        withCredentials: true
    });


export default api