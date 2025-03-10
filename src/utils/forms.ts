import { CreateFormDataProps } from "@/interfaces/forms";
import { Platform } from "react-native";

export const getLocalImageUri = (uri: string): string => {
  return Platform.OS === "ios" ? uri.replace("file://", "") : uri;
};

export const createFormData = ({ image, body = {} }: CreateFormDataProps) => {
  const formData = new FormData();

  if (image) {
    formData.append("file", {
      name: image.fileName,
      type: image.mimeType,
      uri: getLocalImageUri(image.uri),
      size: image.size,
    } as unknown as Blob);
  }

  Object.keys(body).forEach((key) => {
    formData.append(key, body[key]);
  });

  return formData;
};

export const isEmail = (email?: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email || "");
};
