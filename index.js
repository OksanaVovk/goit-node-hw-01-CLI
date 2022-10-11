const contacts = require("./contacts");
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
      const contactList = await contacts.listContacts();
      console.table(contactList);
      break;

    case "get":
      const contactItem = await contacts.getContactById(id);
      if (!contactItem) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contactItem);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(`Contact ${name} was added to the contacts.`);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(`Contact with id = ${id} was successfully deleted.`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
