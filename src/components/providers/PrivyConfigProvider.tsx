import { PRIVY_APP_ID, PRIVY_CLIENT_ID } from "@/config/constants";
import { PrivyElements, PrivyProvider } from "@privy-io/expo";
import { ReactNode } from "react";

const PrivyConfigProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      clientId={PRIVY_CLIENT_ID}
      config={{
        embedded: {
          ethereum: {
            createOnLogin: "all-users",
          },
          solana: {
            createOnLogin: "all-users",
          },
        },
      }}
    >
      {children}
      <PrivyElements />
    </PrivyProvider>
  );
};

PrivyConfigProvider.displayName = "PrivyConfigProvider";

export default PrivyConfigProvider;
