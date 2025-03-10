import { DEFAULT_TIMEOUT, TRADING_BOT_BASE_URL } from "@/config/constants";
import { WalletInfoRequest, WalletInfoResponse } from "@/interfaces/tradingBot";

export async function getWalletInfo(
  payload: WalletInfoRequest,
  authorizationToken: string,
): Promise<WalletInfoResponse> {
  const url = `${TRADING_BOT_BASE_URL}/get_wallet_balance`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${authorizationToken}`,
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  if (!response.ok) {
    throw Error(
      "Something went wrong while fetching wallet balance. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}
