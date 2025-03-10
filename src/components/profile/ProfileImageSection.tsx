import ProfileImageMenuPopup from "@/components/menus/ProfileImageMenuPopup";
import { MAX_PROFILE_IMAGE_SIZE } from "@/config/constants";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import useUserDetails from "@/hooks/user/useUserDetails";
import { CreateFormDataProps } from "@/interfaces/forms";
import { uploadProfileImage } from "@/services/api/users";
import { ALLOWED_IMAGE_TYPES } from "@/store/constants/form";
import postHogEvents from "@/store/constants/posthogEvents";
import { useAppStore } from "@/store/zustand/useAppStore";
import { createFormData } from "@/utils/forms";
import {
  requestCameraPermission,
  requestMediaLibraryPermission,
} from "@/utils/permissions";
import { showToast } from "@/utils/toast";
import { useLingui } from "@lingui/react/macro";
import { clsx } from "clsx";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";

type SelectedImage = {
  asset?: ImagePicker.ImagePickerAsset;
  uri?: string;
};

type ProfileImageSectionProps = {
  className?: string;
};

const ProfileImageSection = ({ className }: ProfileImageSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | undefined>(
    undefined,
  );

  const [isUploading, setIsUploading] = useState(false);

  const { t } = useLingui();

  const { profileImageUrl, userId } = useUserDetails();

  const accessToken = useAppStore((state) => state.accessToken);

  const updateUserDetails = useAppStore((state) => state.updateUserDetails);

  const { logEvent } = useLogEvent();

  const handleImageSelected = useCallback(
    async (image: ImagePicker.ImagePickerAsset) => {
      if (!image.fileSize || image.fileSize > MAX_PROFILE_IMAGE_SIZE) {
        Alert.alert(t`Error`, t`Profile image size must be less than 3MB`);
        return;
      }

      const fileExtension = image.fileName
        ?.split(".")
        .pop()
        ?.toLocaleLowerCase();

      if (!ALLOWED_IMAGE_TYPES.includes(fileExtension || "")) {
        Alert.alert(
          t`Unsupported image type`,
          `${t`Supported image types:`} ${ALLOWED_IMAGE_TYPES.join(", ")}`,
        );

        return;
      }

      setSelectedImage({
        asset: image,
        uri: image.uri,
      });

      try {
        setIsUploading(true);

        const picture: CreateFormDataProps["image"] = {
          fileName: image.fileName || `${userId}-${Date.now()}-profile.jpg`,
          type: image.type || "image",
          mimeType: image.mimeType || "image/jpeg",
          uri: image.uri,
          size: image.fileSize || 0,
        };

        const formData = createFormData({ image: picture });

        const response = await uploadProfileImage(formData, accessToken || "");

        if (response?.url) {
          showToast(t`Profile image updated successfully`);

          updateUserDetails({
            PROFILE_PICTURE_URL: response?.url,
          });

          logEvent(postHogEvents.PROFILE_IMAGE_UPDATED, {});
        } else {
          throw new Error(t`Failed to update profile image`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : t`Failed to update profile image`;

        Alert.alert("Error", errorMessage);

        logEvent(postHogEvents.PROFILE_IMAGE_UPDATED_FAILED, {});

        setSelectedImage(undefined);
      } finally {
        setIsUploading(false);
      }
    },
    [t, userId, accessToken, updateUserDetails, logEvent],
  );

  const handleTakePhoto = useCallback(async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
      mediaTypes: ["images"],
      exif: false,
    });

    if (!result.canceled) {
      handleImageSelected(result.assets[0]);
    }
  }, [handleImageSelected]);

  const handleChooseFromLibrary = useCallback(async () => {
    const hasPermission = await requestMediaLibraryPermission();

    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      mediaTypes: ["images"],
      exif: false,
    });

    if (!result.canceled) {
      handleImageSelected(result.assets[0]);
    }
  }, [handleImageSelected]);

  useEffect(() => {
    setSelectedImage({
      asset: undefined,
      uri: profileImageUrl || undefined,
    });
  }, [profileImageUrl]);

  return (
    <View className={clsx("items-center gap-4", className)}>
      <ProfileImageMenuPopup
        onTakePhoto={handleTakePhoto}
        onChooseFromLibrary={handleChooseFromLibrary}
        imageUri={selectedImage?.uri}
        isUploading={isUploading}
      />
    </View>
  );
};

ProfileImageSection.displayName = "ProfileImageSection";

export default ProfileImageSection;
