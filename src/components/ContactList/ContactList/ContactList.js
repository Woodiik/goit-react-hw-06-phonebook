import { ContactItem } from '../ContactItem/ContactItem';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { removeContactAction } from 'redux/contactSlice';
import { contactsSelector, filterSelector } from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(contactsSelector);
  const contacts = useSelector(filterSelector);
  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <List>
      {visibleContacts.length > 0 &&
        visibleContacts.map(contact => {
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDeleteBtnClick={() => dispatch(removeContactAction(contact.id))}
            />
          );
        })}
    </List>
  );
};
