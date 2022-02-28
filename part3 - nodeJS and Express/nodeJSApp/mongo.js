const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://user1:${password}@cluster0.k94bv.mongodb.net/fullstack-exercise-3-12`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
})

if (process.argv.length === 3) {
    Person
        .find({})
        .then(persons => {
            console.log("Phonebook:")
            persons.forEach(element => {
                console.log(element.name, element.number)
            });
            mongoose.connection.close()
        })
}
else if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Please provide the password, name and number as an argument: node mongo.js <password> <name> <number>')
    process.exit(1)
}

