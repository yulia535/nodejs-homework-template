const app = require('../app')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const { DB_HOST, PORT = 3000 } = process.env

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
