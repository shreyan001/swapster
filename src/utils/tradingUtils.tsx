export const portfolioData = [
  { name: 'Jan', value: 10000 },
  { name: 'Feb', value: 15000 },
  { name: 'Mar', value: 30000 },
  { name: 'Apr', value: 25000 },
  { name: 'May', value: 18000 },
  { name: 'Jun', value: 22000 },
]

export const cryptoTokens = [
  { name: 'Bitcoin', symbol: 'BTC', balance: 0.5, price: 50000 },
  { name: 'Ethereum', symbol: 'ETH', balance: 5, price: 3000 },
  { name: 'Cardano', symbol: 'ADA', balance: 1000, price: 1.5 },
  { name: 'Polkadot', symbol: 'DOT', balance: 100, price: 20 },
]


  export const scheduledOperations = [
    { id: 1, type: 'DCA', description: 'Buy 0.1 ETH every week', nextExecution: '2023-06-15 10:00 UTC' },
    { id: 2, type: 'Take Profit', description: 'Sell 50% of LINK when price reaches $30', condition: 'LINK >= $30' },
    { id: 3, type: 'Rebalance', description: 'Rebalance portfolio to 60% ETH, 30% BTC, 10% USDT', nextExecution: '2023-06-20 00:00 UTC' },
  ]