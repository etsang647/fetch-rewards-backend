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
  payers.add(payer)

  const newTransaction = {
    payer,
    points,
    timestamp
  }
  transactions = transactions.concat(newTransaction)
  res.json(newTransaction)
})

app.get('/points', (req, res) => {
  const pointsBalance = {}
  payers.forEach((payer) => {
    const payerTransactions = transactions.filter(txn => txn.payer === payer)
    const payerPoints = payerTransactions.reduce((sum, txn) => sum + txn.points, 0)
    pointsBalance[payer] = payerPoints
  })
  res.json(pointsBalance)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})