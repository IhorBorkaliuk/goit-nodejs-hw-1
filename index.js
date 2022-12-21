const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const fs = require("fs").promises;

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contacts = await listContacts()
          console.table(contacts)
      break;

    case "get":
          const contact = await getContactById(id);
          console.table(contact)
      break;

    case "add":
          const addedContact = await addContact({ email, phone, id, name })
          console.table(addedContact)
      break;

    case "remove":
          const deletedContact = await removeContact(id);
          console.log(deletedContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);



