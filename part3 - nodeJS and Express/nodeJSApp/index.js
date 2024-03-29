require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('requestJSON', function getRequestJSON(req) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(morgan(':method :url :response-time ms :res[Content-Length] :requestJSON'))
app.use(express.json())
app.use(express.static('build'))

app.post('/api/persons', (request, response, next) => {
    let person = request.body

    if (!person.name) {
        return response.json({error: 'Must include name'})
    }

    if (!person.number) {
        return response.json({error: 'Must include number'})
    }

    const personObject = new Person({
        name: person.name,
        number: person.number
    })

    personObject.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
    Person.find().then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndRemove(id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.find().then(people => {
        response.send(
            `<p>Phonebook has info for ${people.length} people</p>
            <p>${new Date()}</p>`
        )
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
