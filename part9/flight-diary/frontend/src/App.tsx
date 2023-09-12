import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import { Diaries } from "./components/Diaries";
import { createDiary, getAllDiaries } from "./services/diaryService";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const [error, setError] = useState("");

  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "",
    visibility: Visibility.Good,
    weather: Weather.Sunny,
    comment: "",
  });

  useEffect(() => {
    getAllDiaries().then((data) => setDiaryEntries(data));
  }, []);

  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const value: string | Weather | Visibility = event.target.value;

    setNewDiary({ ...newDiary, [name]: value });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary(newDiary)
      .then((data) => {
        setDiaryEntries([...diaryEntries, data]);
      })
      .catch((err) => {
        setError(err.data);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  return (
    <div>
      <div>
        <h2>Add new entry</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date">date: </label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={handlechange}
              value={newDiary.date}
            />
          </div>
          <div>
            <label htmlFor="visibility">visibility: </label>
            {Object.values(Visibility).map((v) => (
              <>
                <label htmlFor={v}>{v}</label>
                <input
                  key={v}
                  type="radio"
                  name="visibility"
                  onChange={handlechange}
                  value={v}
                ></input>{" "}
              </>
            ))}
          </div>
          <div>
            <label htmlFor="weather">weather: </label>
            {Object.values(Weather).map((w) => (
              <>
                <label htmlFor={w}>{w}</label>
                <input
                  key={w}
                  type="radio"
                  name="weather"
                  onChange={handlechange}
                  value={w}
                ></input>{" "}
              </>
            ))}
          </div>
          <div>
            <label htmlFor="comment">comment: </label>
            <input
              type="text"
              name="comment"
              id="comment"
              onChange={handlechange}
              value={newDiary.comment}
            />
          </div>
          <button>add</button>
        </form>
      </div>
      <Diaries diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
