import Country from "./Country";

const Countries = ({ countries, oneMatched }) => {
  return (
    <div>
      {countries.map((country, i) => (
        <Country key={i} country={country} oneMatched={oneMatched} />
      ))}
    </div>
  );
};

export default Countries;
