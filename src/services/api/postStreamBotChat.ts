import { MessageDto } from "@/interfaces/chat";
import eventBus from "@/services/eventBus";
import { fetch } from "expo/fetch";

type TErrorDetail = {
  loc: string[];
  msg: string;
  type: string;
};

type PostStreamBotChatProps = {
  data: MessageDto;
  url: string;
  emit?: boolean;
};

// For accumulating the streaming data to reduce re-renders
const streamBatch = 4;

const decoder = new TextDecoder("utf-8");

const postStreamBotChat = ({
  data,
  url,
  emit = true,
}: PostStreamBotChatProps) => {
  const controller = new AbortController();

  let streamCounter = 0;
  let streamText = "";

  const batchUpdate = (chunk: string) => {
    streamText += chunk;
    streamCounter++;
    if (streamCounter % streamBatch === 0) {
      if (emit) {
        eventBus.emit("bot-chat-data", streamText);
      }
      streamText = "";
    }
  };

  const processRemainingBatch = () => {
    if (streamText) {
      if (emit) {
        eventBus.emit("bot-chat-data", streamText);
      }
      streamText = "";
      streamCounter = 0;
    }
  };

  const handleStreamData = (chunkString: string) => {
    let processedChunk = chunkString.replace(
      /(data: )(.*)\n{2}|event: response_complete/gm,
      (_, __, group2) => group2 || "",
    );

    const audioUrlMatch = processedChunk.match(/output_audio_url:\s*(.*)/);

    if (audioUrlMatch) {
      if (emit) {
        eventBus.emit("bot-chat-audio-url", audioUrlMatch[1].trim());
      }

      processedChunk = processedChunk.replace(/output_audio_url:\s*.*$/gm, "");
    }

    if (processedChunk) {
      batchUpdate(processedChunk);
    }
  };

  if (emit) {
    eventBus.emit("bot-chat-loading", true);
  }

  fetch(url, {
    headers: {
      // Accept: "text/event-stream",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    signal: controller.signal,
    keepalive: true,
  })
    .then(async (response) => {
      if (!response.body) throw new Error("No stream available");

      const reader = response.body.getReader();

      if (emit) {
        eventBus.emit("bot-chat-loading", false);
      }

      let isStreaming = true;
      // Use a while loop for streaming
      while (isStreaming) {
        const { done, value } = await reader.read();

        if (done) {
          processRemainingBatch();
          if (emit) {
            eventBus.emit("bot-chat-complete", "");
          }
          isStreaming = false;
          break;
        }

        let chunkString = "";

        // Make sure value is a Uint8Array before decoding
        if (value instanceof Uint8Array) {
          chunkString = decoder.decode(value);
        } else {
          // If it's not a Uint8Array, convert the number to a string
          chunkString = String.fromCharCode(value);
        }

        if (chunkString.startsWith('{"detail":[{"type":')) {
          throw new Error(chunkString);
        }

        handleStreamData(chunkString);
      }
    })
    .catch((error: Error) => {
      if (error?.message !== "aborted") {
        const errorMessage = error?.message.startsWith('{"detail"')
          ? JSON.parse(error.message)
              .detail.map(
                (errorDetail: TErrorDetail) =>
                  `${errorDetail.loc.join(" ")}: ${errorDetail.msg}`,
              )
              .join(" ")
          : error.message;

        if (emit) {
          eventBus.emit("bot-chat-error", errorMessage);
        }
      }
      if (emit) {
        eventBus.emit("bot-chat-loading", false);
        eventBus.emit("bot-chat-complete", "");
      }
    });

  return () => {
    controller.abort();
    if (emit) {
      eventBus.emit("bot-chat-loading", false);
      eventBus.emit("bot-chat-complete", "");
    }
  };
};

export default postStreamBotChat;
