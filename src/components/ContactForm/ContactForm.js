import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

const INITIALE_STATE = {
   name: '',
   number: '',
};
class ContactForm extends Component {
   state = { name: '', number: '' };
   onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };
   onSubmit = e => {
      e.preventDefault();
      const { name, number } = this.state;
      const newContact = {
         name,
         number,
         id: nanoid(5),
      };
      if (this.props.checkNewContact(newContact)) {
         return;
      }
      this.props.onSubmit(newContact);
      this.reset();
   };
   reset = () => {
      this.setState({ ...INITIALE_STATE });
   };
   render() {
      const { number, name } = this.state;
      return (
         <form className={s.form} onSubmit={this.onSubmit}>
            <label className={s.label}>
               Name
               <input
                  onChange={this.onChange}
                  type="text"
                  name="name"
                  value={name}
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
               />
            </label>
            <label className={s.label}>
               Number
               <input
                  onChange={this.onChange}
                  type="tel"
                  name="number"
                  value={number}
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
               />
            </label>
            <button type="submit">Add contact</button>
         </form>
      );
   }
}

ContactForm.propTypes = {
   onSubmit: PropTypes.func.isRequired,
   checkNewContact: PropTypes.func.isRequired,
};

export default ContactForm;
