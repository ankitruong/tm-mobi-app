import Button from "@/components/buttons/Button";
import FormTextInput from "@/components/inputs/FormTextInput";
import Layout from "@/components/layouts/Layout";
import { Screens } from "@/enums/navigation";
import useLogEvent from "@/hooks/analytics/useLogEvent";
import useTheme from "@/hooks/misc/useTheme";
import useUserDetails from "@/hooks/user/useUserDetails";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { updateUserProfile } from "@/services/api/users";
import postHogEvents from "@/store/constants/posthogEvents";
import {
  TUpdateProfileFormSchema,
  UpdateProfileFormSchema,
} from "@/store/constants/zodSchema";
import { useAppStore } from "@/store/zustand/useAppStore";
import { showToast } from "@/utils/toast";
import { userObjectMerge } from "@/utils/user";
import Feather from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLingui } from "@lingui/react/macro";
import React, { useCallback, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Alert, View } from "react-native";

const UpdateProfile = ({
  navigation,
}: RootStackScreenProps<Screens.UPDATE_PROFILE>) => {
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] = useState(false);

  const accessToken = useAppStore((state) => state.accessToken);

  const authenticatedUser = useAppStore((state) => state.authenticatedUser);

  const setAppStore = useAppStore((state) => state.setAppStore);

  const { theme } = useTheme();

  const { logEvent } = useLogEvent();

  const { t } = useLingui();

  const {
    firstName: userFirstName,
    lastName: userLastName,
    name: userName,
  } = useUserDetails();

  const { handleSubmit, control } = useForm<TUpdateProfileFormSchema>({
    defaultValues: {
      firstName: userFirstName || userName || "",
      lastName: userLastName || "",
    },
    resolver: zodResolver(UpdateProfileFormSchema),
  });

  const onSubmit: SubmitHandler<TUpdateProfileFormSchema> = useCallback(
    async (formData) => {
      try {
        setIsLoadingUpdateProfile(true);

        const data = await updateUserProfile(
          { firstName: formData.firstName, lastName: formData.lastName },
          accessToken || "",
        );

        logEvent(postHogEvents.PROFILE_UPDATED, {
          firstName: formData.firstName,
          lastName: formData.lastName,
        });

        setAppStore({
          authenticatedUser: {
            ...(authenticatedUser || {}),
            user: userObjectMerge(
              formData.firstName,
              formData.lastName,
              authenticatedUser?.user,
            ),
          },
          userDetails: data,
        });

        showToast(t`Profile updated successfully.`);

        navigation.pop();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";

        logEvent(postHogEvents.PROFILE_UPDATED_FAILED, {
          reason: errorMessage,
        });

        Alert.alert(
          t`Update Failed!`,
          t`An error occurred while updating your profile.`,
        );
      } finally {
        setIsLoadingUpdateProfile(false);
      }
    },
    [accessToken, authenticatedUser, logEvent, navigation, setAppStore, t],
  );

  const onError: SubmitErrorHandler<TUpdateProfileFormSchema> = useCallback(
    (error) => {
      const errorMessages = Object.values(error)
        .map((err) => err?.message)
        .join("\n");

      showToast(errorMessages);
    },
    [],
  );

  const handleUpdateProfile = handleSubmit(onSubmit, onError);

  return (
    <Layout>
      <View className="flex-auto pb-9 pt-5">
        <View className="flex-auto gap-5">
          <FormTextInput
            label={t`First Name`}
            // @ts-expect-error react hook form types
            control={control}
            name="firstName"
            leftIcon={
              <Feather
                name="user"
                size={20}
                color={theme["base-300"].DEFAULT}
              />
            }
          />

          <FormTextInput
            label={t`Last Name`}
            // @ts-expect-error react hook form types
            control={control}
            name="lastName"
            leftIcon={
              <Feather
                name="user"
                size={20}
                color={theme["base-300"].DEFAULT}
              />
            }
          />
        </View>
        <View className="pt-4">
          <Button
            title={t`Update`}
            onPress={handleUpdateProfile}
            isLoading={isLoadingUpdateProfile}
          />
        </View>
      </View>
    </Layout>
  );
};

UpdateProfile.displayName = "ChangePasswordScreen";

export default UpdateProfile;
