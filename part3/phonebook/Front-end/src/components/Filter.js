import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="mb-3">
      <label htmlFor="filter">filter shown with:</label>
      <input
        className="form-control"
        name="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default Filter;
