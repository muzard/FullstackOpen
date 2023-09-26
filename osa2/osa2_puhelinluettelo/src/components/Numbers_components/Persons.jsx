const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={(e) => deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
