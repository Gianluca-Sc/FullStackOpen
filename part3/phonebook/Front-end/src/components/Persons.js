import React from "react";

const Person = ({ name, number, id, deletePerson }) => {
  const handleDeleteButton = (id) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id);
    }
  };
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {name} {number}
      <button
        onClick={() => handleDeleteButton(id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    </li>
  );
};

const Persons = ({ persons, filter, deletePerson }) => {
  const filtered = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <ul className="list-group list-group-flush">
      {filtered.map((p) => (
        <Person
          key={p.id}
          id={p.id}
          name={p.name}
          number={p.number}
          deletePerson={deletePerson}
        />
      ))}
    </ul>
  );
};

export default Persons;
