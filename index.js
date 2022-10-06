const { getTotalPoints, getPoints } = require('./utils/points')
const { checkValidPoints, subtractNegPoints, spendPoints } = require('./utils/spend')
const express = require('express')
const app = express()

app.use(express.json())

let transactions = [] // list of transactions, sorted by timestamp (oldest to newest)
let id = 0 // auto incrementing id for each transaction
const payers = new Set() // list of unique payers

app.get('/transactions', (req, res) => {
  res.json(transactions)
})

app.post('/transactions', (req, res) => {
  const { payer, points, timestamp } = req.body
  const newTransaction = {
    payer,
    points,
    timestamp,
    id: id++
  }
  transactions = transactions.concat(newTransaction)
  transactions.sort((txn1, txn2) => {
    return new Date(txn1.timestamp) - new Date(txn2.timestamp)
  })
  payers.add(payer)
  res.json(newTransaction)
})

app.post('/spend', (req, res) => {
  const { points } = req.body

  // check that we have enough total points to spend
  const totalPoints = getTotalPoints(transactions)
  if (points > totalPoints) {
    return res.status(400).json({
      error: 'not enough points'
    })
  }
  
  // check that no payer balance is negative at any point
  const validPayers = [...payers].every(payer => checkValidPoints(payer, transactions))
  if (!validPayers) {
    return res.status(400).json({
      error: 'payer balance negative'
    })
  }

  payers.forEach(payer => subtractNegPoints(payer, transactions))
  transactions = transactions.filter(txn => txn.points > 0)

  const pointsSummary = spendPoints(points, transactions) 
  transactions = transactions.filter(txn => txn.points > 0)

  res.status(200).json(pointsSummary)
})

app.get('/points', (req, res) => {
  const pointsBalance = {}
  payers.forEach((payer) => {
    pointsBalance[payer] = getPoints(payer, transactions)
  })
  res.json(pointsBalance)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})