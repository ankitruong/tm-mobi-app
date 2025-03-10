import { themeColors, themeColorsVars } from "../theme";

describe("theme utility", () => {
  it("themeColors has light and dark themes", () => {
    expect(themeColors).toHaveProperty("light");
    expect(themeColors).toHaveProperty("dark");
  });

  it("themeColorsVars has light and dark themes", () => {
    expect(themeColorsVars).toHaveProperty("light");
    expect(themeColorsVars).toHaveProperty("dark");
  });

  it("themeColors.light has the expected structure", () => {
    expect(themeColors.light).toHaveProperty("primary");
    expect(themeColors.light).toHaveProperty("secondary");
    expect(themeColors.light).toHaveProperty("accent");
    expect(themeColors.light).toHaveProperty("neutral");
  });

  it("themeColors.dark has the expected structure", () => {
    expect(themeColors.dark).toHaveProperty("primary");
    expect(themeColors.dark).toHaveProperty("secondary");
    expect(themeColors.dark).toHaveProperty("accent");
    expect(themeColors.dark).toHaveProperty("neutral");
  });
});
