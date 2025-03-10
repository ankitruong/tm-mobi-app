import { ReactNode } from "react";
import PrivyConfigProvider from "./PrivyConfigProvider";
import QueryClientConfigProvider from "./QueryClientConfigProvider";
import WagmiConfigProvider from "./WagmiConfigProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientConfigProvider>
      <PrivyConfigProvider>
        <WagmiConfigProvider>{children}</WagmiConfigProvider>
      </PrivyConfigProvider>
    </QueryClientConfigProvider>
  );
};

Providers.displayName = "Providers";

export default Providers;
