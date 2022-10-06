const getPoints = (payer, transactions) => {
  const payerTransactions = transactions.filter(txn => txn.payer === payer)
  const payerPoints = payerTransactions.reduce((sum, txn) => sum + txn.points, 0)
  return payerPoints
}

const getTotalPoints = (transactions) => {
  const totalPoints = transactions.reduce((sum, txn) => sum + txn.points, 0)
  return totalPoints
}

module.exports = {
  getPoints,
  getTotalPoints
}
