import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Credential, User } from "../features/auth/authSlice";

interface UserResponse {
  token: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/auth",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<User, User>({
      query: (userData) => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<UserResponse, Credential>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
