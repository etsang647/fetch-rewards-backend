const {
  getTransactions,
  getPosTransactionsBeforeDate,
} = require('./transactions')

// return sum of all points in <transactions>
const sumPoints = (transactions) => {
  const sumPoints = transactions.reduce((sum, txn) => sum + txn.points, 0)
  return sumPoints
}

// same as sumPoints above but with a nicer name for exporting
const getTotalPoints = (transactions) => {
  const totalPoints = sumPoints(transactions)
  return totalPoints
}

// returns total points for the given <payer> in <transactions>
const getPoints = (payer, transactions) => {
  const payerTransactions = getTransactions(payer, transactions)
  const payerPoints = sumPoints(payerTransactions)
  return payerPoints
}

// returns total points from positive transactions for the given <payer> in <transactions> before <timestamp> date
const getPosPointsBeforeDate = (payer, transactions, timestamp) => {
  const posTransactions = getPosTransactionsBeforeDate(payer, transactions, timestamp)
  const posPoints = sumPoints(posTransactions)
  return posPoints
}

module.exports = {
  getTotalPoints,
  getPoints,
  getPosPointsBeforeDate,
}
