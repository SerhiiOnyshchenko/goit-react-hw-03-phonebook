import React, { Component } from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

class App extends Component {
   state = {
      contacts: [
         { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
         { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
         { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
         { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
   };
   componentDidMount() {
      const contacts = JSON.parse(localStorage.getItem('contacts'));
      contacts && this.setState({ contacts });
   }
   componentDidUpdate(prevState) {
      const nextState = this.state.contacts;
      if (prevState.contacts !== nextState) {
         localStorage.setItem('contacts', JSON.stringify(nextState));
      }
   }
   onSubmit = newContact => {
      this.setState(prevState => ({
         contacts: [...prevState.contacts, newContact],
      }));
   };
   checkNewContact = newContact => {
      if (
         this.state.contacts.find(
            contact =>
               contact.name.toLocaleLowerCase() ===
               newContact.name.toLocaleLowerCase()
         )
      ) {
         alert(newContact.name + ' is alredy in contacts');
         return true;
      }
      return false;
   };
   onChangeFilter = e => {
      this.setState({ filter: e.target.value });
   };
   deleteContact = id => {
      this.setState(prevState => ({
         contacts: prevState.contacts.filter(contact => contact.id !== id),
      }));
   };
   render() {
      const { contacts, filter } = this.state;
      const normFilter = filter.toLocaleLowerCase();
      const visibleContacts = contacts.filter(contact =>
         contact.name.toLocaleLowerCase().includes(normFilter)
      );

      return (
         <div className="main">
            <h1>Phonebook</h1>
            <ContactForm
               onSubmit={this.onSubmit}
               checkNewContact={this.checkNewContact}
            />
            <h2>Contacts</h2>
            <Filter filter={filter} onChange={this.onChangeFilter} />
            <ContactList
               visibleContacts={visibleContacts}
               deleteContact={this.deleteContact}
            />
         </div>
      );
   }
}

export default App;
