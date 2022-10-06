const helper = require('./helper')
const express = require('express')
const app = express()

app.use(express.json())

let transactions = []
const payers = new Set()

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
  payers.add(payer)
  res.json(newTransaction)
})

app.get('/points', (req, res) => {
  const pointsBalance = {}
  payers.forEach((payer) => {
    pointsBalance[payer] = helper.getPoints(payer, transactions)
  })
  res.json(pointsBalance)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})