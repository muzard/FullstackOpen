import Persons from "./Numbers_components/Persons.jsx";

const Numbers = ({ persons, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />{" "}
    </div>
  );
};

export default Numbers;
