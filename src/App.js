import React, { useState, useEffect } from 'react';
import ListContacts from './ListContacts';
import {Route} from 'react-router-dom';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';


const App = () => {

  const [contacts, setContacts] = useState([])

  const removeContact = (contact) => {
    setContacts(prevContacts => {
      return prevContacts.filter(c => {
        return c.id !== contact.id
      })
    })

    ContactsAPI.remove(contact)
  }

  const createContact = async contact => {
    const newContact = await ContactsAPI.create(contact)
    setContacts(prevContacts => {
      return prevContacts.concat([newContact])
    })
  }

  useEffect(() => {
    ContactsAPI.getAll().then((contacts) => {
      setContacts(contacts)
    })
  }, [])




  return (
    <div>
      <Route exact path='/' render={() => (
        <ListContacts contacts={contacts} removeContact={removeContact} />
      )} />
      <Route path='/create' render={({history}) => (
        <CreateContact onCreateContact={(contact) => {
          createContact(contact)
          history.push('/')
        }} />
      )} />
    </div>
  );
}

export default App;
