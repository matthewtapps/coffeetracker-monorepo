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
  tagTypes: ["Coffee", "LatestShot"],
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
      invalidatesTags: ["Coffee", "LatestShot"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          coffeeApi.util.updateQueryData("getShots", undefined, (draft) => {
            if (draft) {
              draft.unshift({
                ...(arg as Coffee),
                id: "",
                updatedAt: new Date(),
              });
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    getLatestShot: build.query<Coffee | null, void>({
      query: () => "espressoshots/latest",
      providesTags: ["LatestShot"],
      transformResponse: (response, meta): Coffee | null => {
        if (meta?.response?.status === 204) {
          return null;
        }
        return response as Coffee;
      },
    }),
  }),
});

export const { useGetShotsQuery, useAddShotMutation, useGetLatestShotQuery } =
  coffeeApi;
