import React, {useState} from 'react';
import {Link} from 'react-router-dom'

const ListContacts = ({contacts, removeContact}) => {


  const [query, setQuery] = useState('')

  const handleChange = (query) => {
    setQuery(query.trim())
  }

  const clearQuery = () => {
    handleChange('')
  }



    const showingContact = query === '' ? contacts : contacts.filter((c) => (
      c.name.toLowerCase().includes(query.toLowerCase())
    ))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input className='search-contacts' type='text' value={query} placeholder='Search Contacts' onChange={e => handleChange(e.target.value)} />
          <Link to='/create' className='add-contact'>
            Add Contact
          </Link>
        </div>
        {
          showingContact.length !== contacts.length && (
            <div className='showing-contacts'>
              <span>Now showing {showingContact.length} of {contacts.length}</span>
              <button onClick={clearQuery}>Show all</button>
            </div>
          )
        }
        <ol className='contact-list'>
          {showingContact.map(contact => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}>
              </div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button className='contact-remove' onClick={() => removeContact(contact)}>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
}


export default ListContacts;