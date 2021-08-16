const app = require('../app')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

// eslint-disable-next-line no-unused-vars
const { DB_HOST, PORT = 3000, NODE_TLS_REJECT_UNAUTHORIZED } = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Database connection successful')
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
})
  .catch(() => {
    console.log('error')
    process.exit(1)
  })
