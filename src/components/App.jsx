import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import { Container } from './Shared.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contact')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = (name, number) => {
    const isExist = contacts.some(contact => contact.name === name);

    if (isExist) {
      alert(`${name.value} is already in contacts.`);
    } else {
      setContacts(prevState => {
       
        return [
          ...prevState,
          { name: name, id: nanoid(), number: number },
        ];
      });
      
    }
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const handleDelete = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmit={handleFormSubmit} />
      </Section>
      <Section title="Contacts">
        <Filter onFilter={handleFilter} />
        <ContactList contacts={filteredContacts} onDelete={handleDelete} />
      </Section>
    </Container>
  );
};
