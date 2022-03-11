import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const bikesApi = createApi({
  reducerPath: "bikesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/bikes`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllBikes: builder.query({
      query: () => ({
        url: "/",
      }),
    }),
  }),
});

export const { useFetchAllBikesQuery } = bikesApi;
