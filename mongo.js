const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url =
  `mongodb+srv://wil:${password}@cluster0.hhg0s.mongodb.net/persons?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: personName,
  number: personNumber
})

if(process.argv.length === 5){
  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
} else if(process.argv.length === 3){
  Person.find({}).then(people => {
    console.log(people)
    mongoose.connection.close()
  })
}
