const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', function (req) { 
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

const generateId = () => {
    const id = Math.floor(Math.random() * (1500 - persons.length) + persons.length)

    return id
}

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"  
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"  
    },
    {
        id: "3",
        name: "Dan abramov",
        number: "12-34-234345"  
    },
    {
        id: "4",
        name: "Mary poppendieck",
        number: "39-23-6423122"  
    }
]

app.get('/info', (request, response) => {
    response.send(`<p>phonebook has info for ${persons.length} persons</p>
        <p>${new Date(8.64e15).toString()}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * (1500 - persons.length) + persons.length)
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } else if (persons.some(person => person.name === body.name)){
        return response.status(400).json({
            error: 'name already on list!'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId().toString()
    }
    persons = persons.concat(person)

    response.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})