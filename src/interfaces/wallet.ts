import { CHAINS_MAP } from "@/store/constants/tradingBot";

export type Token = {
  id: string;
  name: string;
  amount: number;
  value: string;
  icon: string;
  network: string;
  networkImageUrl: string;
};

export type WalletDistributionNetwork = {
  id: string;
  icon: string;
  amount: number;
  percentage: number;
  color: string;
  network: string;
};

export type SelectedNetwork = {
  address?: string;
  network?: keyof typeof CHAINS_MAP;
};
