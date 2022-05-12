import PropTypes from 'prop-types';
import ContactItem from './ContactItem/ContactItem';
import s from './ContactList.module.css';

const ContactList = ({ visibleContacts, deleteContact }) => {
   return (
      <ul className={s.list}>
         {visibleContacts.map(({ id, name, number }) => (
            <ContactItem
               key={id}
               id={id}
               name={name}
               number={number}
               deleteContact={deleteContact}
            />
         ))}
      </ul>
   );
};

ContactList.propTypes = {
   visibleContacts: PropTypes.array.isRequired,
};

export default ContactList;
