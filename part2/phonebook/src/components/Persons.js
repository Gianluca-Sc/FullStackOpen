import React from "react";

const Person = ({ name, number, id, deletePerson }) => {
  const handleDeleteButton = (id) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id);
    }
  };
  return (
    <li>
      {name} {number}{" "}
      <button onClick={() => handleDeleteButton(id)}>Delete</button>
    </li>
  );
};

const Persons = ({ persons, filter, deletePerson }) => {
  const filtered = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <ul>
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
