import { TradeHistoryItem } from "@/interfaces/trades";
import { Token, WalletDistributionNetwork } from "@/interfaces/wallet";

export const MOCK_TOKENS: Token[] = [
  {
    id: "1",
    name: "USD Coin",
    amount: 117.374393,
    value: "118.00",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    network: "ethereum",
    networkImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  {
    id: "2",
    name: "Neo Coin",
    amount: 480.184903,
    value: "8033.49",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/neo/info/logo.png",
    network: "neo",
    networkImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/neo/info/logo.png",
  },
  {
    id: "3",
    name: "Bitcoin",
    amount: 0.0038,
    value: "103.74",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
    network: "bitcoin",
    networkImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
  },
  {
    id: "4",
    name: "COMP",
    amount: 10.65,
    value: "873.00",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png",
    network: "ethereum",
    networkImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  {
    id: "5",
    name: "XRP",
    amount: 2.08,
    value: "400.27",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ripple/info/logo.png",
    network: "base",
    networkImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
  },
];

export const MOCK_DISTRIBUTIONS: WalletDistributionNetwork[] = [
  {
    id: "base",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
    amount: 15740.11,
    percentage: 61,
    color: "#4A7DFF",
    network: "Base",
  },
  {
    id: "ethereum",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    amount: 8126.84,
    percentage: 31,
    color: "#7C5CFF",
    network: "Ethereum",
  },
  {
    id: "bitcoin",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
    amount: 150.11,
    percentage: 61,
    color: "#FF5C5C",
    network: "Bitcoin",
  },

  {
    id: "solana",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
    amount: 150.11,
    percentage: 61,
    color: "#FF5C5C",
    network: "Solana",
  },
];

export const MOCK_TRADE_HISTORY: TradeHistoryItem[] = [
  {
    id: "1",
    fromToken: "USDC",
    toToken: "BTC",
    fromAmount: 50,
    toAmount: 0.00186,
    fromTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    toTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
    fromValue: "50.00",
    toValue: "50.00",
    date: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    fromToken: "ETH",
    toToken: "BTC",
    fromAmount: 40.59,
    toAmount: 0.00186,
    fromTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    toTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
    fromValue: "40.59",
    toValue: "40.59",
    date: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: "3",
    fromToken: "ETH",
    toToken: "BTC",
    fromAmount: 40.59,
    toAmount: 0.00186,
    fromTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    toTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
    fromValue: "40.59",
    toValue: "40.59",
    date: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
  },
  {
    id: "4",
    fromToken: "ETH",
    toToken: "BTC",
    fromAmount: 40.59,
    toAmount: 0.00186,
    fromTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    toTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
    fromValue: "40.59",
    toValue: "40.59",
    date: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "5",
    fromToken: "USDC",
    toToken: "BTC",
    fromAmount: 50,
    toAmount: 0.00186,
    fromTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    toTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
    fromValue: "50.00",
    toValue: "50.00",
    date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "6",
    fromToken: "USDC",
    toToken: "BTC",
    fromAmount: 50,
    toAmount: 0.00186,
    fromTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    toTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
    fromValue: "50.00",
    toValue: "50.00",
    date: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "7",
    fromToken: "ETH",
    toToken: "BTC",
    fromAmount: 40.59,
    toAmount: 0.00186,
    fromTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    toTokenImageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
    fromValue: "40.59",
    toValue: "40.59",
    date: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
  },
];

export const MOCK_SOURCES = [
  {
    title: "BTC to ETH: Live Bitcoin to Ethereum Rate - CoinMarketCap",
    source: "coinmarketcap",
    imageUrl:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  {
    title: "BTC to ETH: Live Bitcoin to Ethereum Rate - CoinGecko",
    source: "coingecko",
    imageUrl:
      "https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png",
  },
  {
    title: "BTC to ETH: Live Bitcoin to Ethereum Rate - Binance",
    source: "binance",
    imageUrl: "https://public.bnbstatic.com/static/images/common/favicon.ico",
  },
];

export const MOCK_SIMILAR_PROMPTS = [
  {
    id: "1",
    text: "What are the most reliable sources for cryptocurrency price predictions",
  },
  {
    id: "2",
    text: "How accurate are past predictions for ETH and BTC prices",
  },
  {
    id: "3",
    text: "What are the key events that could impact ETH and BTC prices in the next month",
  },
  {
    id: "4",
    text: "How do experts predict the future prices of ETH and BTC",
  },
  {
    id: "5",
    text: "Are there any trends that could influence the prices of ETH and BTC in the next month",
  },
];

export const MOCK_PRICE_DATA = Array.from({ length: 50 }, (_, index) => {
  // Generate dates from 2019 to 2025
  const startDate = new Date("2019-01-01").getTime();
  const endDate = new Date("2025-12-31").getTime();
  const step = (endDate - startDate) / 49; // 49 steps for 50 points

  const timestamp = new Date(startDate + step * index).toISOString();

  // Generate prices with some random variation while maintaining a general trend
  const progress = index / 49; // 0 to 1

  // ETH base trend: starts around 150, peaks at 4000, ends around 2000
  const ethBaseTrend =
    progress < 0.4
      ? 150 + 3850 * (progress / 0.4) // Rise to peak
      : 4000 - 2000 * ((progress - 0.4) / 0.6); // Decline to end

  // BTC base trend: starts around 3000, peaks at 60000, ends around 30000
  const btcBaseTrend =
    progress < 0.4
      ? 3000 + 57000 * (progress / 0.4)
      : 60000 - 30000 * ((progress - 0.4) / 0.6);

  // Add random variation (±10%)
  const randomVariation = () => 0.9 + Math.random() * 0.2;

  return {
    timestamp,
    eth: Math.round(ethBaseTrend * randomVariation()),
    btc: Math.round(btcBaseTrend * randomVariation()),
  };
});

export const TIME_RANGES = [
  "24H",
  "1W",
  "1M",
  "3M",
  "Y",
  "YTD",
  "Max",
] as const;

export type TimeRange = (typeof TIME_RANGES)[number];

export const MOCK_MARKDOWN_CONTENT = `# Crypto Investment Guide

## Understanding Market Basics

Here's a *comprehensive* guide to help you understand **cryptocurrency** investments.

### Key Investment Strategies

1. Dollar-Cost Averaging (DCA)
2. Portfolio Diversification
3. Risk Management

#### Popular Cryptocurrencies

Here are some well-known cryptocurrencies and their use cases:

| Cryptocurrency | Type | Use Case |
|---------------|------|-----------|
| Bitcoin (BTC) | Store of Value | Digital Gold |
| Ethereum (ETH) | Smart Contract | DeFi & NFTs |
| Solana (SOL) | Smart Contract | High Speed DeFi |

##### Investment Tips

> Always do your own research (DYOR) before investing in any cryptocurrency.
> Never invest more than you can afford to lose.

###### Technical Details

You can buy crypto using this command:
\`\`\`bash
buy-crypto --amount 100 --token BTC
\`\`\`

Or use inline code like \`buy()\` function.

---

### Useful Resources

* [Token Metrics Website](https://tokenmetrics.com)
* [Market Analysis](https://tokenmetrics.com/analysis)
* [Trading Guide](https://tokenmetrics.com/guide)

Benefits of using Token Metrics:
- AI-powered insights
- Real-time market analysis
- Professional trading signals
- Expert community support

![Token Metrics Dashboard](https://public.bnbstatic.com/static/images/common/favicon.ico)

For more information about our services, contact our [support team](mailto:support@tokenmetrics.com).`;
