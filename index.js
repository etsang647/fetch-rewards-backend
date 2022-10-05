const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  console.log('hello world')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})