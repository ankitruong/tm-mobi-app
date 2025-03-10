import { darkColors, lightColors } from "../colors";

describe("colors utility", () => {
  describe("color definitions", () => {
    it("lightColors has the expected structure", () => {
      // Check that lightColors has the expected properties
      expect(lightColors).toHaveProperty("primary");
      expect(lightColors).toHaveProperty("secondary");
      expect(lightColors).toHaveProperty("accent");
      expect(lightColors).toHaveProperty("neutral");
      expect(lightColors).toHaveProperty("neutral-content");
      expect(lightColors).toHaveProperty("base-100");
      expect(lightColors).toHaveProperty("base-200");
      expect(lightColors).toHaveProperty("base-300");

      // Check some specific values
      expect(lightColors.primary).toHaveProperty("DEFAULT");
      expect(typeof lightColors.primary.DEFAULT).toBe("string");
    });

    it("darkColors has the expected structure", () => {
      // Check that darkColors has the expected properties
      expect(darkColors).toHaveProperty("primary");
      expect(darkColors).toHaveProperty("secondary");
      expect(darkColors).toHaveProperty("accent");
      expect(darkColors).toHaveProperty("neutral");
      expect(darkColors).toHaveProperty("neutral-content");
      expect(darkColors).toHaveProperty("base-100");
      expect(darkColors).toHaveProperty("base-200");
      expect(darkColors).toHaveProperty("base-300");

      // Check some specific values
      expect(darkColors.primary).toHaveProperty("DEFAULT");
      expect(typeof darkColors.primary.DEFAULT).toBe("string");
    });

    it("lightColors and darkColors have the same structure", () => {
      // Get all top-level keys
      const lightKeys = Object.keys(lightColors);
      const darkKeys = Object.keys(darkColors);

      // Check that both objects have the same keys
      expect(lightKeys.sort()).toEqual(darkKeys.sort());

      // Check that nested structures match for a few keys
      expect(Object.keys(lightColors.primary)).toEqual(
        Object.keys(darkColors.primary),
      );
      expect(Object.keys(lightColors.secondary)).toEqual(
        Object.keys(darkColors.secondary),
      );
    });
  });
});
