// return all transactions in <transactions> for the given <payer>
const getTransactions = (payer, transactions) => {
  const payerTransactions = transactions.filter(txn => txn.payer === payer)
  return payerTransactions
}

// return all positive point transactions in <transactions> for the given <payer>
// before <timestamp> date
const getPosTransactionsBeforeDate = (payer, transactions, timestamp) => {
  const date = new Date(timestamp)
  const payerTransactions = getTransactions(payer, transactions)
  const posTransactions = payerTransactions.filter(txn => {
    const txnDate = new Date(txn.timestamp)
    return txn.points > 0 && txnDate < date
  })
  return posTransactions
} 

// return all negative point transactions in <transactions> for the given <payer>
const getNegTransactions = (payer, transactions) => {
  const payerTransactions = getTransactions(payer, transactions)
  const negTransactions = payerTransactions.filter(txn => txn.points < 0)
  return negTransactions
}

// update points field of transaction in <transactions> with given <id> to <amount>
const updateTransactionPoints = (id, points, transactions) => {
  const transaction = transactions.find(txn => txn.id === id)
  transaction.points = points
}

module.exports = {
  getTransactions,
  getPosTransactionsBeforeDate,
  getNegTransactions,
  updateTransactionPoints
}