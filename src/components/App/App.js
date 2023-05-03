import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList/ContactList';
import { Container } from './App.styled';
import { contactsSelector } from 'redux/selectors';

export function App() {
  const isFirstRender = useRef(true);
  const contacts = useSelector(contactsSelector);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Container>
  );
}
