import { useState, useEffect } from "react";
import personService from "./services/persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => console.log(err));
  }, []);

  const addPerson = (name, number) => {
    const personObj = { name, number };

    personService.create(personObj).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName("");
      setNewNumber("");
      setMessage(`Added ${name}`);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    });
  };

  const updatePerson = (person) => {
    const updatedPerson = { ...person, number: newNumber };
    personService.update(person.id, updatedPerson).then((returnedPerson) => {
      setPersons(persons.map((p) => (p.id !== person.id ? p : returnedPerson)));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    personService
      .deleteOne(id)
      .then(setPersons(persons.filter((p) => p.id !== id)))
      .catch((error) => {
        console.log(error);
        setMessage(`Contact has already been removed from server`);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newName || !newNumber) {
      alert(`Missing fields`);
      return;
    }

    const alreadyExists = persons.some((p) => p.name === newName);
    if (alreadyExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        updatePerson(person);
      }
      return;
    }

    addPerson(newName, newNumber);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Notification message={message} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <div>
        <h3>Numbers</h3>
        <Persons
          persons={persons}
          filter={filter}
          deletePerson={deletePerson}
        />
      </div>
    </div>
  );
};

export default App;
