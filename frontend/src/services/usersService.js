import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/users` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `/login`,
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        url: `/register`,
        method: "POST",
        body: { firstName, lastName, email, password },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = usersApi;
