/* const mongoose = require("mongoose");

if (process.argv.length <= 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((p) => console.log(p.name, p.number));
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name,
    number,
  });

  person.save().then((res) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
 */
