const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('requestJSON', function getRequestJSON(req) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(morgan(':method :url :response-time ms :res[Content-Length] :requestJSON'))
app.use(express.json())
app.use(express.static('build'))


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.post('/api/persons', (request, response) => {
    const maxId = Math.floor(Math.random() * 9999)
    let person = request.body

    if (!person.name) {
        return response.json({error: 'Must include name'})
    }

    if (!person.number) {
        return response.json({error: 'Must include number'})
    }

    if (persons.find(currentPerson => currentPerson.name === person.name)) {
        return response.json({ error: 'Name must be unique' })
    }

    person.id = maxId + 1

    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`
    )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})