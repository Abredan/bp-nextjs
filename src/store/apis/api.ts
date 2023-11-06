import { axiosBaseQuery } from '@/lib/axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  tagTypes: ['Api'],
  reducerPath: 'api',
  keepUnusedDataFor: 30,
  refetchOnFocus: false,
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  }),
  endpoints: () => ({}),
});
