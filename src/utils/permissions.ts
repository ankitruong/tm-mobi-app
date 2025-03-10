import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const requestPermission = async (
  requestFn: () => Promise<{ status: string }>,
  permissionType: string,
  permissionMessage: string,
): Promise<boolean> => {
  try {
    const { status } = await requestFn();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        `Sorry, we need ${permissionType} permissions to make this work! ${permissionMessage}`,
      );
      return false;
    }
    return true;
  } catch (error) {
    Alert.alert(
      "Error",
      `An unexpected error occurred while requesting ${permissionType} permissions.`,
    );
    return false;
  }
};

export const requestCameraPermission = async (): Promise<boolean> => {
  return requestPermission(
    ImagePicker.requestCameraPermissionsAsync,
    "camera",
    "",
  );
};

export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  return requestPermission(
    ImagePicker.requestMediaLibraryPermissionsAsync,
    "media library",
    "",
  );
};
