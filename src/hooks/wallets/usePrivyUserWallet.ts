import { usePrivy } from "@privy-io/expo";
import { useMemo } from "react";

const usePrivyUserWallet = () => {
  const { user } = usePrivy();

  const allWallets = useMemo(
    () => user?.linked_accounts.filter((account) => account.type === "wallet"),
    [user],
  );

  const externalWallet = useMemo(
    () => allWallets?.find((account) => account.connector_type !== "embedded"),
    [allWallets],
  );

  const emailAccount = useMemo(
    () => user?.linked_accounts.find((account) => account.type === "email"),
    [user],
  );

  // This can be either wallet or email login
  const externalWalletAddress = useMemo(() => {
    return externalWallet?.type === "wallet"
      ? externalWallet.address
      : emailAccount?.address;
  }, [externalWallet, emailAccount]);

  return {
    externalWalletAddress,
    externalWallet,
    emailAccount,
    allWallets,
  };
};

export default usePrivyUserWallet;
