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
    getShots: build.query<Coffee[], { userId: string }>({
      query: ({ userId }) => `espressoshots?user_id=${userId}`,
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResultAllShots = dispatch(
          coffeeApi.util.updateQueryData("getShots", { userId: arg.userId || "" }, (draft) => {
            if (draft) {
              draft.unshift({
                ...(arg as Coffee),
                id: "",
                updatedAt: new Date(),
              });
            }
          }),
        );
        const patchResultLatestShot = dispatch(
          coffeeApi.util.updateQueryData("getLatestShot", { userId: arg.userId || "" }, (draft) => {
            if (draft) {
              draft = {
                ...(arg as Coffee),
                id: "",
                updatedAt: new Date(),
              };
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResultAllShots.undo();
          patchResultLatestShot.undo();
        }
      },
    }),
    getLatestShot: build.query<Coffee | null, { userId: string }>({
      query: ({ userId }) => `espressoshots/latest?user_id=${userId}`,
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
