const { getPosPointsBeforeDate } = require('./points')
const { updateTransactionPoints, getPosTransactionsBeforeDate, getNegTransactions } = require('./transactions')

// check for the given <payer> that no negative transaction in <transactions>
// ever makes <payer> balance dip below zero at its specified timestamp
// return true if so, false otherwise
const checkValidPoints = (payer, transactions) => {
  const negTransactions = getNegTransactions(payer, transactions) 
  let pointsUsed = 0
  const validPoints = negTransactions.every(txn => {
    const posPointsBeforeDate = getPosPointsBeforeDate(payer, transactions, txn.timestamp)
    const enoughPoints = posPointsBeforeDate - pointsUsed >= -txn.points
    pointsUsed += -txn.points
    return enoughPoints
  })
  return validPoints
}

// subtracts all negative point transactions from positive point transactions
// in order of oldest to newest in <transactions> for the given <payer>
const subtractNegPoints = (payer, transactions) => {
  const negTransactions = getNegTransactions(payer, transactions) 
  negTransactions.forEach(txn => {
    const posTransactionsBefore = getPosTransactionsBeforeDate(payer, transactions, txn.timestamp)
    spendPointsSubset(-txn.points, posTransactionsBefore, transactions)
  })
}

// subtracts <amount> points from <transactionsSubset> starting from first element
// then updates the main <transactions> list to reflect changes
// and returns a summary of points subtracted by payer
const spendPointsSubset = (amount, transactionsSubset, transactions) => {
  const pointsSummary = {}
  let index = 0
  while (amount > 0) {
    const curTransaction = transactionsSubset[index]
    const { payer, points, id } = curTransaction
    const pointsDeducted = Math.min(points, amount)
    updateTransactionPoints(id, points - pointsDeducted, transactions)

    if (!(payer in pointsSummary)) {
      pointsSummary[payer] = 0
    }
    pointsSummary[payer] -= pointsDeducted

    amount -= pointsDeducted
    index++
  }
  return pointsSummary
}

// subtracts <amount> points from all <transactions> starting from oldest to newest
// and returns a summary of points subtracted by payer
const spendPoints = (amount, transactions) => {
  const pointsSummary = spendPointsSubset(amount, transactions, transactions)
  const pointsSummaryArr = Object.keys(pointsSummary).map(payer => (
    { payer, points: pointsSummary[payer] }
  ))
  return pointsSummaryArr
}

module.exports = {
  checkValidPoints,
  subtractNegPoints,
  spendPoints
}
