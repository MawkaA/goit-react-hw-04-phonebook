import React,{Component} from 'react';
import ContactForm from './ContactForm/ContactForm';
import initialContacts from './ContactList/Contacts.json';
import ContactList from './ContactList/ContactList';
import {nanoid} from 'nanoid';
import Filter from './Filter/Filter';
import'./App.css';

class App extends Component {
  state = {
  contacts: initialContacts,
  name: '',
  filter:''
};

addContact = ({name,number}) => {
const contact = {
  id: nanoid(),
  name,
  number
};

const { contacts } = this.state;

contacts.find(({ name }) => name.toLowerCase() === contact.name.toLowerCase() )
  ? alert(`${name} is already added.`)
  : this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }))


};

deleteContact = contactId => {
    this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
};

changeFilter = event => {
this.setState({ filter: event.currentTarget.value });
};

getVisibleContacts = () => {
const { filter, contacts } = this.state;
const normalizedFilter = filter.toLowerCase();

return contacts.filter(contact =>
  contact.name.toLowerCase().includes(normalizedFilter),
);
};

componentDidMount() {
  const contacts = localStorage.getItem("contacts");
  const parsedContacts = JSON.parse(contacts);
  console.log(parsedContacts);

if (parsedContacts) {
  this.setState({ contacts:parsedContacts})
}

}

componentDidUpdate(prevProps, prevState) {
      if (this.state.contacts !== prevState.contacts) {
       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
        }
  }

render() {  
  const { filter  } = this.state;
  const visibleContacts = this.getVisibleContacts();
    return(
        <>
          <h1 className="title">Phonebook</h1>
          <ContactForm className="contact" onSubmit={this.addContact} />
          <h2 className="title">Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter}/>
          <ContactList contacts = { visibleContacts }
            onDeleteContact = { this.deleteContact }/> 
        </>
    );   
};   
};
export default App;