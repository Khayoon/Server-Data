import React, { useState, useEffect } from "react";
import NoteService from "./services/Notes";
import Form from "./components/PersonForm";
import Filter from "./components/Filter";
import People from "./components/Persons";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification">{message}</div>;
};



const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null);
  //setting the name as key
  const [persons, setPersons] = useState([]);
  // Using a single state variable to store the new contact's name and phone number
  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await NoteService.getAll();
    setPersons(response);
  };

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete the contact?")) {
      NoteService.deletePerson(id).then((response) => {
        setNotificationMessage("Deleted contact");
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };



  const addContact = (event) => {
    event.preventDefault();

    const contactObject = {
      name: newContact.name,
      number: newContact.number,
    };

    // Check if the contact is already in the phonebook
    const existingContact = persons.find(
      (person) => person.name === contactObject.name
    );
    if (existingContact) {
      // If the contact is already in the phonebook shows a message
      if (
        window.confirm(
          `${contactObject.name} is already added to the phone book. Replace the old number with a new one?`
        )
      ) {
        // Use the updateContact method to update the contact's information
        NoteService.updateContact(existingContact.id, contactObject)
          .then((response) => {
            setPersons([...persons, response]);

            setNewContact({
              name: "",
              number: "",
            });
          })
          .catch((error) => {
            setNotificationMessage(`Information of ${contactObject.name} has already been removed from server`);
          });
          setNotificationMessage(`Updated ${contactObject.name}'s number`);

      } 
      else {
        setNotificationMessage(`No Update`);
    }
    } else {
      // If the contact is not in the phonebook, use the createContact method to create a new contact
      NoteService.createContact(contactObject)
        .then((response) => {
          console.log("Server responded with:", response);
          setPersons([...persons, response]);
          setNewContact({
            name: "",
            number: "",
          });
          setNotificationMessage(`Added ${contactObject.name}`);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //filter the contacts
  const filteredContacts = persons.filter((person) => {
    if (searchTerm) {
      return person.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const clearNotificationMessage = () => {
    setNotificationMessage(null);
  };

  useEffect(() => {
    if (notificationMessage) {
      setTimeout(clearNotificationMessage, 3000);
    }
  }, [notificationMessage]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Filter setSearchTerm={setSearchTerm} />
      <h2>Add a new</h2>
      <Form
        addContact={addContact}
        newContact={newContact}
        setNewContact={setNewContact}
      />
      <h2>Numbers</h2>
      <People persons={filteredContacts} deletePerson={deletePerson} />

    </div>
  );
};

export default App;
