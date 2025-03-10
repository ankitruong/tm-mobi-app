import { messages as arMessages } from "@/locales/ar/messages";
import { messages as deMessages } from "@/locales/de/messages";
import { messages as enMessages } from "@/locales/en/messages";
import { messages as esMessages } from "@/locales/es/messages";
import { messages as frMessages } from "@/locales/fr/messages";
import { messages as itMessages } from "@/locales/it/messages";
import { messages as koMessages } from "@/locales/ko/messages";
import { messages as nlMessages } from "@/locales/nl/messages";
import { messages as ptMessages } from "@/locales/pt/messages";
import { messages as ruMessages } from "@/locales/ru/messages";
import { messages as trMessages } from "@/locales/tr/messages";
import { messages as zhMessages } from "@/locales/zh/messages";
import { Locale, Messages } from "@lingui/core";

const messages: Record<Locale, Messages> = {
  en: enMessages,
  fr: frMessages,
  ar: arMessages,
  de: deMessages,
  es: esMessages,
  it: itMessages,
  ko: koMessages,
  nl: nlMessages,
  pt: ptMessages,
  ru: ruMessages,
  tr: trMessages,
  zh: zhMessages,
};

export default messages;
