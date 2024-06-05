import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";
import { getDummyData, DdbData } from "./dummyData";

const dummyData: DdbData = getDummyData();

const handlers = [
  http.get("/espressoshots", () => {
    return HttpResponse.json(dummyData);
  }),
  http.get("/espressoshots/latest", () => {
    return HttpResponse.json(dummyData.entities[dummyData.entities.length - 1]);
  }),
  http.post("/espressoshots", (_) => {
    return HttpResponse.json();
  }),
];

export const worker = setupWorker(...handlers);
