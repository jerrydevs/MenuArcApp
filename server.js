const express = require('express')
const connectToDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const csv = require('csvtojson')
const formidable = require('formidable')

const app = express()

// Connect to Database
connectToDB()

const Menu = require('./models/Menu')

app.use(cors())

app.use(express.json({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('API is now running...'))
app.post('/api/testcsv', (req, res) => {
  const IncomingForm = formidable.IncomingForm
  const form = new IncomingForm()

  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log('file.path ', file.path)
    csv()
      .fromFile(file.path)
      .then((jsonObj) => {
        console.log('csvtojson: ', jsonObj)
      })
  })
  form.on('end', () => {
    res.json()
  })
  form.parse(req)
})

// Define routes
app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/restaurant', require('./routes/restaurant'))
app.use('/api/menu', require('./routes/menu'))

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})

module.exports = app
