import React from 'react';

const Form = ({ addContact, newContact, setNewContact }) => {
  const handleSubmit = event => {
    event.preventDefault();
    addContact(event);
  };

  const handleNameChange = event => {
    setNewContact({
      ...newContact,
      name: event.target.value,
    });
  };

  const handleNumberChange = event => {
    setNewContact({
      ...newContact,
      number: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={newContact.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newContact.number}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
};

export default Form;
