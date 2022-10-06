const points = require('./utils/points')
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

app.post('/spend', (req, res) => {
  const { points } = req.body
  const totalPoints = points.getTotalPoints(transactions)
  if (points > totalPoints) {
    return res.status(400).json({ error: `not enough points: have ${totalPoints} need ${points}`})
  } else {
    return res.status(200).json(`okay, spending ${points} points`)
  }
})

app.get('/points', (req, res) => {
  const pointsBalance = {}
  payers.forEach((payer) => {
    pointsBalance[payer] = points.getPoints(payer, transactions)
  })
  res.json(pointsBalance)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})