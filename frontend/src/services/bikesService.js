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

    createBike: builder.mutation({
      query: ({ model, color, location }) => ({
        url: "/",
        method: "POST",
        body: { model, color, location },
      }),
    }),

    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchAllBikesQuery,
  useLazyFetchAllBikesQuery,
  useCreateBikeMutation,
  useDeleteBikeMutation,
} = bikesApi;
