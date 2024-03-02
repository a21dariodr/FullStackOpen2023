const mongoose = require('mongoose')
const Schema = mongoose.Schema

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then( () => console.log('Connected to MongoDB Atlas') )
    .catch( error => console.log('Error connecting to MongoDB Atlas: ', error.message) )

const personSchema = new Schema({
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)
