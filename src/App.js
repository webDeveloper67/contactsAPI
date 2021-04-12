import React, { useState, useEffect, useRef } from 'react';
import ListContacts from './ListContacts';
// import {usePrevious} from './utils/usePrevious';
import * as ContactsAPI from './utils/ContactsAPI';


const App = () => {

  const [contacts, setContacts] = useState([])

    // Helper function
    const usePrevious = (value) => {
      const ref = useRef();
      useEffect(() => {
        ref.current = value;
      });
      return ref.current;
    }
  const prevContacts = usePrevious(contacts)

  console.log(prevContacts, '🔸');

  const removeContact = (contact) => {
    setContacts(prevContacts => {
      prevContacts.filter(c => {
        return c.id !== contact.id
      })
    })

    ContactsAPI.remove(contact)
  }

  useEffect(() => {
    ContactsAPI.getAll().then((contacts) => {
      setContacts(contacts)
    })
  }, [])


  return (
    <div>
      { contacts && contacts.length !== 0 &&
        <ListContacts contacts={contacts} removeContact={removeContact} />
      }
    </div>
  );
}

export default App;
