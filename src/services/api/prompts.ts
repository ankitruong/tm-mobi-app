import { BASE_URL, DEFAULT_TIMEOUT } from "@/config/constants";
import { ExamplePromptResponse, SavedPromptResponse } from "@/interfaces/chat";

export async function getExamplePrompts(
  authorizationToken: string,
): Promise<ExamplePromptResponse> {
  const url = `${BASE_URL}/chatbot/example-prompts`;
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
      "Something went wrong while fetching example prompts. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}

export async function getSavedPrompts(
  authorizationToken: string,
): Promise<SavedPromptResponse> {
  const url = `${BASE_URL}/chatbot/saved-prompts`;
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
      "Something went wrong while fetching saved prompts. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}

export async function addSavedPrompts(
  prompt: string,
  authorizationToken: string,
) {
  const url = `${BASE_URL}/chatbot/saved-prompts`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${authorizationToken}`,
    },
    body: JSON.stringify({
      PROMPT: prompt,
    }),
    signal: controller.signal,
  });

  clearTimeout(id);

  if (!response.ok) {
    throw Error(
      "Something went wrong while adding saved prompts. Please try again later.",
    );
  }

  const data = await response.json();

  return data;
}

export async function deleteSavedPrompts(
  promptId: string,
  authorizationToken: string,
) {
  const url = `${BASE_URL}/chatbot/saved-prompts/${promptId}`;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${authorizationToken}`,
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  if (!response.ok) {
    throw Error(
      "Something went wrong while deleting saved prompts. Please try again later.",
    );
  }

  return {
    status: true,
    message: "Prompt deleted successfully",
  };
}
