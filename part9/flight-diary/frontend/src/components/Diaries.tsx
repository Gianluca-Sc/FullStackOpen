import { DiaryEntry } from "../types";
import { Diary } from "./Diary";

export const Diaries = ({ diaryEntries }: { diaryEntries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      <div>
        {diaryEntries.map((diary) => (
          <Diary key={diary.id} diary={diary} />
        ))}
      </div>
    </div>
  );
};
