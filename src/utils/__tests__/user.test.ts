import { AuthenticatedUser, Plan } from "@/interfaces/user";
import { User } from "@supabase/supabase-js";
import {
  getDeleteModalMessage,
  getFullName,
  getHighestPlan,
  getPlanName,
  isNFTUser,
  userObjectMerge,
} from "../user";

describe("user utility", () => {
  describe("getPlanName", () => {
    it("returns plan name when key exists", () => {
      expect(getPlanName("basic")).toBe("Basic");
      expect(getPlanName("premium")).toBe("Premium");
    });

    it("returns 'Unknown' when key doesn't exist", () => {
      expect(getPlanName("nonexistent")).toBe("Unknown");
    });

    it("returns 'Unknown' when key is undefined", () => {
      expect(getPlanName(undefined)).toBe("Unknown");
    });
  });

  describe("getFullName", () => {
    it("returns combined first and last name when both exist", () => {
      const user: AuthenticatedUser = {
        user: {
          id: "123",
          app_metadata: {},
          aud: "authenticated",
          created_at: "",
          user_metadata: {
            firstName: "John",
            lastName: "Doe",
          },
        },
      };
      expect(getFullName(user)).toBe("John Doe");
    });

    it("returns full_name when first and last name don't exist", () => {
      const user: AuthenticatedUser = {
        user: {
          id: "123",
          app_metadata: {},
          aud: "authenticated",
          created_at: "",
          user_metadata: {
            full_name: "John Doe",
          },
        },
      };
      expect(getFullName(user)).toBe("John Doe");
    });

    it("returns empty string when user is undefined", () => {
      expect(getFullName(undefined)).toBe("");
    });

    it("returns empty string when user metadata is incomplete", () => {
      const user: AuthenticatedUser = {
        user: {
          id: "123",
          app_metadata: {},
          aud: "authenticated",
          created_at: "",
          user_metadata: {},
        },
      };
      expect(getFullName(user)).toBe("");
    });
  });

  describe("isNFTUser", () => {
    it("returns true for NFT user emails", () => {
      expect(isNFTUser("test@nftuser.com")).toBe(true);
    });

    it("returns false for non-NFT user emails", () => {
      expect(isNFTUser("test@example.com")).toBe(false);
    });

    it("returns false when email is undefined", () => {
      expect(isNFTUser(undefined)).toBe(false);
    });
  });

  describe("userObjectMerge", () => {
    it("merges user metadata correctly", () => {
      const user: User = {
        id: "123",
        app_metadata: {},
        aud: "authenticated",
        created_at: "",
        user_metadata: {
          existingField: "value",
        },
      };

      const result = userObjectMerge("John", "Doe", user);

      expect(result).toEqual({
        id: "123",
        app_metadata: {},
        aud: "authenticated",
        created_at: "",
        user_metadata: {
          existingField: "value",
          firstName: "John",
          lastName: "Doe",
          full_name: "John Doe",
        },
      });
    });

    it("returns undefined when user is undefined", () => {
      expect(userObjectMerge("John", "Doe", undefined)).toBeUndefined();
    });
  });

  describe("getHighestPlan", () => {
    it("returns the highest ranked plan", () => {
      expect(getHighestPlan(["Basic", "Premium"] as Plan[])).toBe("PREMIUM");
    });

    it("works with a single plan", () => {
      expect(getHighestPlan(["Basic"] as Plan[])).toBe("BASIC");
    });
  });

  describe("getDeleteModalMessage", () => {
    it("returns basic message for Basic plan", () => {
      const message = getDeleteModalMessage("basic");
      expect(message).toContain("Your account will be permanently removed");
      expect(message).not.toContain("upgrade or downgrade plan");
    });

    it("returns premium message for Premium plan", () => {
      const message = getDeleteModalMessage("premium");
      expect(message).toContain("Your account will be permanently removed");
      expect(message).toContain("upgrade or downgrade plan");
    });

    it("returns premium message when plan is undefined", () => {
      const message = getDeleteModalMessage(undefined);
      expect(message).toContain("Your account will be permanently removed");
      expect(message).toContain("upgrade or downgrade plan");
    });
  });
});
