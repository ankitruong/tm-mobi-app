export type WalletInfoRequest = {
  network: string;
  address: string;
};

export type WalletBalance = {
  Currency: {
    Decimals: number;
    Name: string;
    SmartContract: string;
    Symbol: string;
  };
  balance: string;
  balance_in_usd: string;
  index_id: string | null;
  networkImageUrl?: string;
};

export type WalletInfoResponse = {
  total_balance_in_usd: number;
  network: string;
  address: string;
  balance: WalletBalance[];
};

export type WalletBalanceError = {
  message: string;
  error: string;
};
