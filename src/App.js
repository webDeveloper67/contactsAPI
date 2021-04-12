import React, { useState, useEffect } from 'react';
import ListContacts from './ListContacts';
import {usePrevious} from './utils/usePrevious';
import * as ContactsAPI from './utils/ContactsAPI';


const App = () => {
  
  const [contacts, setContacts] = useState([])

  const prevContacts = usePrevious(contacts)
  console.log(prevContacts);
  const removeContact = (contact) => {
    setContacts(prevContacts => {
      prevContacts.filter(c => {
        return c.id !== contact.id
      })
    })
  }

  useEffect(() => {
    ContactsAPI.getAll().then((contacts) => {
      setContacts(contacts)
    })
  })


  return (
    <div>
      <ListContacts contacts={contacts} removeContact={removeContact} />
    </div>
  );
}

export default App;
