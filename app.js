const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const api = require('./routes/api')

require('./configs/passport-config')
const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(express.static('public'))
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// const api = require('./routes/api')

app.use('/api/contacts', api.contacts)
// app.use('/api/auth', api.auth)
app.use('/api/users', api.users)

app.use((_, res, __) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
