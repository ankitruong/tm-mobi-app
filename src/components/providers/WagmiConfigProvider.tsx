import { ENVIRONMENT, WAGMI_PROJECT_ID } from "@/config/constants";
import {
  AppKit,
  createAppKit,
  defaultWagmiConfig,
} from "@reown/appkit-wagmi-react-native";
import {
  arbitrum,
  base,
  baseSepolia,
  bsc,
  mainnet,
  sepolia,
} from "@wagmi/core/chains";
import { createClient, http } from "viem";
import { WagmiProvider } from "wagmi";

const projectId = WAGMI_PROJECT_ID;

// Create config
const metadata = {
  name: "Token Metrics",
  description: "Connect your wallet to Token Metrics",
  url: "https://app.tokenmetrics.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "tm-app://",
    universal: "https://app.tokenmetrics.com/",
  },
};

const chains = ["development", "staging"].includes(ENVIRONMENT)
  ? ([sepolia, baseSepolia, mainnet, base, bsc, arbitrum] as const)
  : ([mainnet, base, bsc, arbitrum] as const);

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  client: ({ chain }) =>
    createClient({
      chain,
      transport: http(),
    }),
});

// Create modal
createAppKit({
  projectId,
  wagmiConfig,
  enableAnalytics: true,
  metadata,
});

const WagmiConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      {children}
      <AppKit />
    </WagmiProvider>
  );
};

WagmiConfigProvider.displayName = "WagmiConfigProvider";

export default WagmiConfigProvider;
