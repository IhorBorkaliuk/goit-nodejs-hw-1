const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
    const deletedContact = contacts.splice(idx, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const addedContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(addedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return addedContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
