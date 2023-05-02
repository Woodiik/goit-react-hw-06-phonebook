import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList/ContactList';
import { Container } from './App.styled';
import { addContactAction, removeContactAction } from 'redux/contactSlice';
import { filterAction } from 'redux/filterSlice';

export function App() {
  const isFirstRender = useRef(true);
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    dispatch(addContactAction(name, number));
  };
  const deleteContact = contactId => {
    dispatch(removeContactAction(contactId));
  };
  const onChange = e => {
    dispatch(filterAction(e.target.value));
  };
  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onChange={addContact} onSubmit={contacts} />
      <h2>Contacts</h2>
      <Filter onChange={onChange} filter={filter} />
      <ContactList
        visibleContacts={visibleContacts}
        deleteContact={deleteContact}
      />
    </Container>
  );
}
