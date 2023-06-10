import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [inputCountries, setInputCountries] = useState("");
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const [oneMatched, setOneMatched] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [message]);

  useEffect(() => {
    if (!inputCountries) return;
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        setCountries([]);
        const filter = res.data.filter((c) =>
          c.name.common.toLowerCase().includes(inputCountries.toLowerCase())
        );

        if (filter.length === 1) {
          setCountries(filter);
          setOneMatched(true);
          setMessage("");
          return;
        }
        if (filter.length <= 10) {
          setCountries(filter);
          setOneMatched(false);
          setMessage("");
          return;
        }

        if (filter.length > 10) {
          setMessage("Too many matches, specify another filter");
          setOneMatched(false);
          return;
        }
      })
      .catch((error) => console.log(error));
  }, [inputCountries]);

  return (
    <>
      <div>
        find countries{" "}
        <input
          type="text"
          value={inputCountries}
          onChange={(e) => setInputCountries(e.target.value)}
        />
        {message && <p>{message}</p>}
      </div>
      <div>
        {countries.length !== 0 && (
          <Countries countries={countries} oneMatched={oneMatched} />
        )}
      </div>
    </>
  );
}

export default App;
