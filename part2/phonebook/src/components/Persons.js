//renders all people from the phonebook and give them a key using their name as the key value
import React from 'react';

const People = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};


export default People;
