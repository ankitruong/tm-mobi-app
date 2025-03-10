import * as Clipboard from "expo-clipboard";
import { showToast } from "./toast";

export const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text);

  showToast("Copied to clipboard");
};

export const fetchFromClipboard = async () => {
  const text = await Clipboard.getStringAsync();
  return text;
};
