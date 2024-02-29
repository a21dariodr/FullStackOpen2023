require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./mongo_models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))

morgan.token('postdata', (req, res) => (req.method === 'POST') ? JSON.stringify(req.body) : '')

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(people => {
      if (people) res.json(people)
      else res.status(404).end()
    })
    .catch(error => response.status(500).send(error))
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) res.json(person)
    else res.status(404).send('Person not found!')
})

app.get('/info', (req, res) => {
    const now = new Date();
    res.send(`Phonebook has info for ${persons.length} people<br/><br/>${now.toString()}`)
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    if (!name) return res.status(400).json({error: 'Missing person name!'})
    if (!number) return res.status(400).json({error: 'Missing person number!'})

    // if (repeatedPerson) return res.status(400).json({error: 'Person name must be unique!'})

    const newPerson = new Person({ name, number })
    
    newPerson.save()
        .then( savedPerson => {
            res.json(savedPerson)
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    
    Person.deleteOne({ id })
        .then( () => {
            res.status(204).end()
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
})
