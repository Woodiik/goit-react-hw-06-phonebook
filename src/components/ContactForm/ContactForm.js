import { useState } from 'react';
import { FormStyles, Label, AddContactButton } from './ContactForm.styled';
import { Input } from 'components/Filter/Filter.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContactAction } from 'redux/contactSlice';
import { contactsSelector } from 'redux/selectors';

export function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelector);
  const handleChange = e => {
    const { value, name } = e.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    const contactMap = contacts.map(contact => {
      if (name === contact.name) {
        alert(`${contact.name} is already in contacts`);
        return false;
      }
      if (number === contact.number) {
        alert(`Number "${contact.number}" is already in contacts`);
        return false;
      }
      return true;
    });

    if (contactMap.every(el => el === true)) {
      dispatch(addContactAction(name, number));
    }
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormStyles onSubmit={onSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </Label>
      <AddContactButton type="submit">Add to contact list</AddContactButton>
    </FormStyles>
  );
}
