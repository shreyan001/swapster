export const portfolioData = [
  { name: 'Jan', value: 10000 },
  { name: 'Feb', value: 15000 },
  { name: 'Mar', value: 30000 },
  { name: 'Apr', value: 25000 },
  { name: 'May', value: 18000 },
  { name: 'Jun', value: 22000 },
]


export const cryptoTokens = [
  {
    image: '/vercel.svg', // Replace with actual image URL
    name: 'Ethereum',
    symbol: 'ETH',
    balance: 5.25,
    price: 1800.50
  },
  {
    image: '/vercel.svg', // Replace with actual image URL
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 0.5,
    price: 35000.00
  },
  {
    image: '/vercel.svg', // Replace with actual image URL
    name: 'Tether',
    symbol: 'USDT',
    balance: 1500.00,
    price: 1.00
  },
  {
    image: '/vercel.svg', // Replace with actual image URL
    name: 'Cardano',
    symbol: 'ADA',
    balance: 200.00,
    price: 1.25
  },
  {
    image: '/vercel.svg', // Replace with actual image URL
    name: 'Solana',
    symbol: 'SOL',
    balance: 10.00,
    price: 35.75
  }
];





  export const scheduledOperations = [
    { id: 1, type: 'DCA', description: 'Buy 0.1 ETH every week', nextExecution: '2023-06-15 10:00 UTC' },
    { id: 2, type: 'Take Profit', description: 'Sell 50% of LINK when price reaches $30', condition: 'LINK >= $30' },
    { id: 3, type: 'Rebalance', description: 'Rebalance portfolio to 60% ETH, 30% BTC, 10% USDT', nextExecution: '2023-06-20 00:00 UTC' },
  ]