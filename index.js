const express = require('express')
const app = express()

app.use(express.json())

let transactions = []

app.get('/transactions', (req, res) => {
  res.json(transactions)
})

app.post('/transactions', (req, res) => {
  const { payer, points, timestamp } = req.body
  const newTransaction = {
    payer,
    points,
    timestamp
  }
  transactions = transactions.concat(newTransaction)
  res.json(newTransaction)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})