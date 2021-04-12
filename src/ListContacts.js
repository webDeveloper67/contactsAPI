import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }

  handleChange = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  clearQuery = () => {
    this.handleChange('')
  }
  render() {

    const {query} = this.state;
    const {contacts, removeContact} = this.props

    const showingContact = query === '' ? contacts : contacts.filter((c) => (
      c.name.toLowerCase().includes(query.toLowerCase())
    ))
    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input className='search-contacts' type='text' value={query} placeholder='Search Contacts' onChange={e => this.handleChange(e.target.value)} />
        </div>
        {
          showingContact.length !== contacts.length && (
            <div className='showing-contacts'>
              <span>Now showing {showingContact.length} of {contacts.length}</span>
              <button onClick={this.clearQuery}>Show all</button>
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

    
}


export default ListContacts;