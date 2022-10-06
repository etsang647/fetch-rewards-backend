/**
 * points helper functions (general)
 */

const sumPoints = (transactions) => {
  const sumPoints = transactions.reduce((sum, txn) => sum + txn.points, 0)
  return sumPoints
}

const getTotalPoints = (transactions) => {
  const totalPoints = sumPoints(transactions)
  return totalPoints
}

/**
 * points helper functions (payer-specific)
 */

const getPayerTransactions = (payer, transactions) => {
  const payerTransactions = transactions.filter(txn => txn.payer === payer)
  return payerTransactions
}

const getPoints = (payer, transactions) => {
  const payerTransactions = getPayerTransactions(payer, transactions)
  const payerPoints = sumPoints(payerTransactions)
  return payerPoints
}

const getPositivePoints = (payer, transactions) => {
  const payerTransactions = getPayerTransactions(payer, transactions)
  const posPayerTransactions = payerTransactions.filter(txn => txn.points > 0)
  const posPayerPoints = sumPoints(posPayerTransactions)
  return posPayerPoints
}

const getNegativePoints = (payer, transactions) => {
  const payerTransactions = getPayerTransactions(payer, transactions)
  const negPayerTransactions = payerTransactions.filter(txn => txn.points < 0)
  const negPayerPoints = sumPoints(negPayerTransactions)
  return negPayerPoints
}

module.exports = {
  getTotalPoints,
  getPoints,
  getPositivePoints,
  getNegativePoints
}
