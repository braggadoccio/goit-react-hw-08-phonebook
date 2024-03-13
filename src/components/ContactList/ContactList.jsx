import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ContactListItem } from 'components/ContactList/ContactListItem/ContactListItem';
// import PropTypes from 'prop-types';
import { fetchContacts } from '../../redux/contacts/contactsOperation';
import { Loader } from 'components/Loader/Loader';
// import { getContacts, getFilter } from '../../redux/selectors';
import {
  selectFilteredContacts,
  selectError,
  selectIsLoading,
} from '../../redux/contacts/contactsSelector';

// export const getFilteredContacts = (contacts, filter) => {
//   return contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );
// };
// export const ContactList = ({ filterContact, deleteContact }) => {
//   const filteredContacts = filterContact();

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {isLoading && !error && <Loader />}
      {!isLoading && !error && filteredContacts.length === 0 && (
        <p>The Phonebook is empty. Please add a contact.</p>
      )}
      {!isLoading &&
        !error &&
        filteredContacts.length > 0 &&
        filteredContacts.map(filteredContact => (
          <ContactListItem
            key={filteredContact.id}
            filteredContact={filteredContact}
          />
        ))}
    </ul>
  );
};
//
// };

// ContactList.propTypes = {
//   filterContact: PropTypes.func.isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };
