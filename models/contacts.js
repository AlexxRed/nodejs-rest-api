const id = require("bson-objectid");
const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, "contacts.json");

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const {DB_HOST} = process.env

mongoose.connect(DB_HOST)
  .then(()=>console.log("Database connection successful"))
  .catch(error => console.log(error.message))


async function updateContactData(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};


const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  const contacts = JSON.parse(result);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(book => book.id === contactId);
  if (!result) {
    console.log(`not find contact with id ${contactId}`);
    return null
  }
  return result
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = data.splice(idx, 1);
  updateContactData(data);
  return removeContact;
};

const addContact = async ({name, email, phone}) => {
  const data = await listContacts();
  const newContact = {
    id: id(),
    name,
    email,
    phone,
  };
  
  data.push(newContact)
  updateContactData(data);
  return newContact
};


const updateContact = async (contactId, {name, email, phone}) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  data[idx] = {contactId, name, email, phone};
    updateContactData(data);
    return data[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
