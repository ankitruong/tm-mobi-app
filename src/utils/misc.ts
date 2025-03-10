import { BoxShape } from "@/interfaces/misc";

export const generateRandomSessionId = () => {
  const timestamp = new Date().getTime(); // Current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number
  const sessionId = parseInt(timestamp.toString() + randomNum.toString());
  return sessionId;
};

export const compareVersions = (v1: string, v2: string) => {
  const v1Parts = v1.split(".").map(Number);
  const v2Parts = v2.split(".").map(Number);

  for (let i = 0; i < 3; i++) {
    if (v1Parts[i] > v2Parts[i]) return 1;
    if (v1Parts[i] < v2Parts[i]) return -1;
  }
  return 0;
};

export const getShapeStyle = (shape: BoxShape, size: number) => {
  switch (shape) {
    case "circle":
      return { borderRadius: size / 2 };
    case "rounded":
      return { borderRadius: 8 };
    case "square":
      return { borderRadius: 0 };
    default:
      return { borderRadius: size / 2 };
  }
};
