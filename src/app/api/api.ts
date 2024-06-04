import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coffee } from "@/components/coffee-data-table/columns";

export const coffeeApi = createApi({
  reducerPath: "coffeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
    },
  }),
  tagTypes: ["Coffee"],
  endpoints: (build) => ({
    getShots: build.query<Coffee[], void>({
      query: () => "espressoshots",
      providesTags: ["Coffee"],
      transformResponse(response: {
        lastEvaluatedKey: string;
        entities: Coffee[];
      }) {
        return response.entities;
      },
    }),
    addShot: build.mutation<Coffee, Partial<Coffee>>({
      query: (body) => ({
        url: "espressoshots",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Coffee"],
    }),
    getLatestShot: build.query<Coffee, void>({
      query: () => "espressoshots/latest",
      providesTags: ["Coffee"],
    }),
  }),
});

export const { useGetShotsQuery, useAddShotMutation, useGetLatestShotQuery } =
  coffeeApi;
