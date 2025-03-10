import {
  createBotMessage,
  createSlug,
  createUserMessage,
  getChatsCount,
  updateFeedback,
} from "../chat";
import uuidV4 from "../uuidV4";

// Define FeedbackType locally to avoid import issues
type FeedbackType = "like" | "dislike" | "neutral";

// Mock uuidV4 to return a predictable value
jest.mock("../uuidV4", () => jest.fn(() => "mocked-uuid"));

// Mock Date to return a predictable value
const mockDate = new Date("2023-01-01T12:00:00Z");
const originalDate = global.Date;

describe("chat utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the Date constructor to return a fixed date
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
      static now() {
        return mockDate.getTime();
      }
    } as unknown as DateConstructor;
  });

  afterEach(() => {
    // Restore the original Date
    global.Date = originalDate;
  });

  describe("createUserMessage", () => {
    it("creates a user message with the correct properties", () => {
      const message = createUserMessage("Hello, world!");
      expect(message).toEqual({
        id: "mocked-uuid",
        message: "Hello, world!",
        received: false,
        isVisible: true,
        createdAt: "2023-01-01T12:00:00.000Z",
      });
      expect(uuidV4).toHaveBeenCalledTimes(1);
    });

    it("handles empty message text", () => {
      const message = createUserMessage("");
      expect(message.message).toBe("");
    });
  });

  describe("createBotMessage", () => {
    it("creates a bot message with the correct properties", () => {
      const message = createBotMessage("I'm a bot!");
      expect(message).toEqual({
        id: "mocked-uuid",
        message: "I'm a bot!",
        received: true,
        feedback: undefined,
        isVisible: true,
        createdAt: "2023-01-01T12:00:00.000Z",
      });
      expect(uuidV4).toHaveBeenCalledTimes(1);
    });

    it("handles empty message text", () => {
      const message = createBotMessage("");
      expect(message.message).toBe("");
    });
  });

  describe("getChatsCount", () => {
    it("returns correct counts for empty chats array", () => {
      const result = getChatsCount({ chats: [] });
      expect(result).toEqual({ receivedCount: 0, sentCount: 0 });
    });

    it("returns correct counts for chats with only user messages", () => {
      const chats = [
        createUserMessage("Hello"),
        createUserMessage("How are you?"),
      ];
      const result = getChatsCount({ chats });
      expect(result).toEqual({ receivedCount: 0, sentCount: 2 });
    });

    it("returns correct counts for chats with only bot messages", () => {
      const chats = [
        createBotMessage("Hello"),
        createBotMessage("I'm fine, thanks!"),
        createBotMessage("How can I help you?"),
      ];
      const result = getChatsCount({ chats });
      expect(result).toEqual({ receivedCount: 3, sentCount: 0 });
    });

    it("returns correct counts for mixed chats", () => {
      const chats = [
        createUserMessage("Hello"),
        createBotMessage("Hello"),
        createUserMessage("How are you?"),
        createBotMessage("I'm fine, thanks!"),
      ];
      const result = getChatsCount({ chats });
      expect(result).toEqual({ receivedCount: 2, sentCount: 2 });
    });
  });

  describe("createSlug", () => {
    it("converts a string to a slug", () => {
      expect(createSlug("Hello World")).toBe("hello-world");
    });

    it("handles strings with special characters", () => {
      expect(createSlug("Hello, World! How are you?")).toBe(
        "hello-world-how-are-you",
      );
    });

    it("handles strings with multiple spaces", () => {
      expect(createSlug("Hello   World")).toBe("hello-world");
    });

    it("handles strings with leading and trailing spaces", () => {
      expect(createSlug(" Hello World ")).toBe("hello-world");
    });

    it("handles strings with numbers", () => {
      expect(createSlug("Hello World 123")).toBe("hello-world-123");
    });

    it("handles strings with multiple hyphens", () => {
      expect(createSlug("Hello--World")).toBe("hello-world");
    });

    it("handles empty strings", () => {
      expect(createSlug("")).toBe("");
    });
  });

  describe("updateFeedback", () => {
    it("updates feedback for a message", () => {
      const message = createBotMessage("Hello");
      const updatedMessage = updateFeedback(message, {
        type: "like" as FeedbackType,
        message: "Great response!",
      });

      expect(updatedMessage).toEqual({
        ...message,
        feedback: {
          type: "like",
          message: "Great response!",
          modifiedAt: "2023-01-01T12:00:00.000Z",
        },
        modifiedAt: "2023-01-01T12:00:00.000Z",
      });
    });

    it("merges new feedback with existing feedback", () => {
      const message = {
        ...createBotMessage("Hello"),
        feedback: {
          type: "like" as FeedbackType,
          modifiedAt: "2022-12-31T12:00:00.000Z",
        },
      };

      const updatedMessage = updateFeedback(message, {
        message: "This was helpful",
      });

      expect(updatedMessage).toEqual({
        ...message,
        feedback: {
          type: "like",
          message: "This was helpful",
          modifiedAt: "2023-01-01T12:00:00.000Z",
        },
        modifiedAt: "2023-01-01T12:00:00.000Z",
      });
    });

    it("handles empty feedback", () => {
      const message = createBotMessage("Hello");
      const updatedMessage = updateFeedback(message, {});

      expect(updatedMessage).toEqual({
        ...message,
        feedback: {
          modifiedAt: "2023-01-01T12:00:00.000Z",
        },
        modifiedAt: "2023-01-01T12:00:00.000Z",
      });
    });
  });
});
