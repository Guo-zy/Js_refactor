function format(Amount) {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  return format(Amount)
}

function calculateCurrentAmount(perf, play) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount
}

function calculateVolumeCredits(perf, play) {
  let volumeCredits = 0;
  volumeCredits += Math.max(perf.audience - 30, 0);
  if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
  return volumeCredits;
}

function createStatementData(invoice, plays) {
  let volumeCredits = 0;
  let data = Object.assign([], invoice);
  data.performances.map(perf => {
    volumeCredits += calculateVolumeCredits(perf, plays[perf.playID])
    perf.thisAmount = calculateCurrentAmount(perf, plays[perf.playID])
  })
  data.totalAmount = data.performances.reduce((total, perf) => total + perf.thisAmount, 0);
  data.volumeCredits = volumeCredits
}


function statement(invoice, plays) {

  createStatementData(invoice, plays);

  let result = `Statement for ${invoice.customer}\n`;
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;

  return result;
}

module.exports = {
  statement,
};