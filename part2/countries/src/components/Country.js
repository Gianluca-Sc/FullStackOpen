import { useState } from "react";
import CountryToshow from "./CountryToShow";

const Country = ({ country, oneMatched }) => {
  const [countryToShow, setCountryToShow] = useState(null);

  const handleCLick = () => {
    countryToShow ? setCountryToShow(null) : setCountryToShow(country);
  };

  if (oneMatched) {
    return <CountryToshow country={country} />;
  } else {
    return (
      <div>
        {country.name.common}{" "}
        <button onClick={() => handleCLick(country)}>
          {countryToShow ? "hide" : "show"}
        </button>
        {countryToShow && <CountryToshow country={countryToShow} />}
      </div>
    );
  }
};

export default Country;
