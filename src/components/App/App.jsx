import { useState, useEffect } from "react";
import clsx from "clsx";
import css from "./App.module.css";
import ContactForm from "../ContactForm/ContactForm.jsx";
import ContactList from "../ContactList/ContactList.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";
import initialContacts from "../../contacts.json";

function App() {
  const [users, setUser] = useState(() => {
    const storageContacts = localStorage.getItem("contact");
    if (storageContacts !== null) {
      return JSON.parse(storageContacts);
    }
    return initialContacts;
  });

  useEffect(() => {
    localStorage.setItem("contact", JSON.stringify(users));
  }, [users]);

  const [filter, setFilter] = useState("");

  const filterContacts = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addContact = (newContact) => {
    setUser((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setUser((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  return (
    <div className={clsx(css.appWrapper)}>
      <h1 className={clsx(css.title)}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList usersData={filterContacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;
