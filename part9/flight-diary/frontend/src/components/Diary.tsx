import { DiaryEntry } from "../types";

export const Diary = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
      <br />
    </div>
  );
};
