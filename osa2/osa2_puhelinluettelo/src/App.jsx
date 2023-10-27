import { useState, useEffect } from "react";

import Numbers from "./components/Numbers.jsx";
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import numberService from "./services/persons.js";
import "../src/index.css";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [notificationMessage, setNotificationMessage] = useState("");

  const checkName = (name) => {
    return persons.some((person) => person.name === name);
  };

  const contentStyle = {
    padding: "6px",
    fontSize: "28px",
    margin: "12px 0",
    border: "2px solid green",
    backgroundColor: "rgb(226, 226, 226)",
    color: "green",
  };

  const errorStyle = {
    padding: "6px",
    fontSize: "28px",
    margin: "12px 0",
    border: "2px solid red",
    backgroundColor: "rgb(226, 226, 226)",
    color: "red",
  };

  const emptyStyle = {
    height: "0",
    width: "0",
  };

  const [notificationStyle, setNotificationStyle] = useState(emptyStyle);

  const Notification = ({ message, style }) => {
    return <em style={style}>{message}</em>;
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (checkName(newName)) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return null;
      }

      const person = persons.find((person) => person.name == newName);
      const newPerson = { ...person, number: newNumber };
      numberService.update(person.id, newPerson).catch((error) => {
        setNotificationMessage(
          `Information of ${person.name} was already deleted from server`
        );
        setNotificationStyle(errorStyle);
        setTimeout(() => {
          setNotificationMessage("");
          setNotificationStyle(emptyStyle);
        }, 5000);
        const newPersons = persons.filter((peep) => {
          return peep.name != person.name;
        });
        filterPersons(filter, newPersons);
        return null;
      });

      const newPersons = persons.filter((peep) => {
        return peep.id != person.id;
      });
      const localPersons = newPersons.concat(newPerson);
      setPersons(localPersons);
      filterPersons(filter, localPersons);

      setNotificationMessage(`${newName}'s number was updated to ${newNumber}`);
      setNotificationStyle(contentStyle);
      setTimeout(() => {
        setNotificationMessage("");
        setNotificationStyle(emptyStyle);
      }, 5000);

      setNewName("");
      setNewNumber("");
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };

      numberService
        .create(person)
        .then((data) => {
          const newPersons = persons.concat(data);
          setPersons(newPersons);
          filterPersons(filter, newPersons);

          setNewName("");
          setNewNumber("");

          setNotificationMessage(`${newName} was added to the phonebook`);
          setNotificationStyle(contentStyle);
          setTimeout(() => {
            setNotificationMessage("");
            setNotificationStyle(emptyStyle);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage(error.response.data.error);
          setNotificationStyle(errorStyle);
          setTimeout(() => {
            setNotificationMessage("");
            setNotificationStyle(emptyStyle);
          }, 5000);

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

    setNotificationMessage(`${name} was deleted from server`);
    setNotificationStyle(contentStyle);
    setTimeout(() => {
      setNotificationMessage("");
      setNotificationStyle(emptyStyle);
    }, 5000);

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
    <div id="highestFlex">
      <h2>Phonebook</h2>
      <div className="divider" id="highestFlexItem">
        <Notification message={notificationMessage} style={notificationStyle} />
        <Filter value={filter} handler={handleFilterChange} />
      </div>

      <div className="divider">
        <h3>add a new</h3>
        <Form
          addPerson={addPerson}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          newName={newName}
          newNumber={newNumber}
        />
      </div>

      <div className="divider data">
        <Numbers persons={personsToShow} deletePerson={deletePerson} />
      </div>
    </div>
  );
};

export default App;
