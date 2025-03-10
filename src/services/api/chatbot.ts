import { CHAT_BOT_BASE_URL, DEFAULT_TIMEOUT } from "@/config/constants";
import { ChatRecordDTO, MessageDto } from "@/interfaces/chat";

/**
 * @deprecated This function is deprecated and will be removed in a future version.
 * Please use postStreamBotChat instead for streaming chat responses.
 * @see postStreamBotChat
 */
export async function sendMessage(
  payload: MessageDto,
  authorizationToken: string,
) {
  const url = `${CHAT_BOT_BASE_URL}/chat/message`;
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
      "Something went wrong while sending message to chatbot. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}

export async function saveChatRecords(
  payload: ChatRecordDTO,
  authorizationToken: string,
) {
  const url = `${CHAT_BOT_BASE_URL}/chat/save`;
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
      "Something went wrong while saving chat records. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}

export async function saveFlag(authorizationToken: string) {
  const url = `${CHAT_BOT_BASE_URL}/chat/saveflag`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${authorizationToken}`,
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  if (!response.ok) {
    throw Error(
      "Something went wrong while saving flag. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}
