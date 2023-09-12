import axios, { AxiosError } from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>("http://localhost:3001/api/diaries")
    .then((response) => response.data);
};

export const createDiary = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data)
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        throw err.response;
      } else {
        throw err;
      }
    });
};
