import { useState } from "react";
import Numbers from "./components/Numbers.jsx";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const checkName = (name) => {
    return persons.some((person) => person.name === name);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (checkName(newName)) {
      setNewName("");
      alert(`${newName} is already added to phonebook`);
    } else {
      const person = {
        name: newName,
      };

      setPersons(persons.concat(person));
      setNewName("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <Numbers persons={persons} />
    </div>
  );
};

export default App;
