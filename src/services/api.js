import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_TOKEN, API_URL } from "@env";
import axios from "axios";

export const api = axios.create({
  baseURL: API_URL,
  ///set default headers
  headers: {
    Authorization: `Bearer ${APP_TOKEN}`,
  },
});
