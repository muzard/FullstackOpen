import { useState } from "react";
import Numbers from "./components/Numbers.jsx";
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

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

      const newPersons = persons.concat(person);
      setPersons(newPersons);
      filterPersons(filter, newPersons);

      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
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

      <Numbers persons={personsToShow} />
    </div>
  );
};

export default App;
