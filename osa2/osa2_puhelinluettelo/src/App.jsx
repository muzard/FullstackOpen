import { useState, useEffect } from "react";

import Numbers from "./components/Numbers.jsx";
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import numberService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);

  const checkName = (name) => {
    return persons.some((person) => person.name === name);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (checkName(newName)) {
      setNewName("");
      setNewNumber("");
      alert(`${newName} is already added to phonebook`);
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };

      numberService.create(person).then((data) => {
        const newPersons = persons.concat(data);
        setPersons(newPersons);
        filterPersons(filter, newPersons);

        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deletePerson = (id) => {
    const name = persons.find((person) => person.id == id).name;

    if (!window.confirm(`delete ${name}?`)) {
      return null;
    }

    numberService.deleteFromServer(id);

    const newPersons = persons.filter((person) => {
      return person.id != id;
    });

    setPersons(newPersons);
    filterPersons(filter, newPersons);
  };

  const filterPersons = (filter, localPersons) => {
    const newPersons = localPersons.filter((person) => {
      const lcName = person.name.toLowerCase();
      return lcName.includes(filter.toLowerCase());
    });
    if (filter === "") {
      setPersonsToShow(localPersons);
    } else {
      setPersonsToShow(newPersons);
    }
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    filterPersons(newFilter, persons);
  };

  useEffect(() => {
    numberService.getAll().then((data) => {
      const localPersons = data;
      setPersons(localPersons);
      filterPersons(filter, localPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleFilterChange} />

      <h3>add a new</h3>
      <Form
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <Numbers persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
