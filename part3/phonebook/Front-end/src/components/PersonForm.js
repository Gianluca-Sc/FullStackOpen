import React from "react";

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label className="form-label" htmlFor="name">
          Name:
        </label>
        <input
          id="name"
          className="form-control"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="number">
          Number:
        </label>

        <input
          id="number"
          className="form-control"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        add
      </button>
    </form>
  );
};

export default PersonForm;
