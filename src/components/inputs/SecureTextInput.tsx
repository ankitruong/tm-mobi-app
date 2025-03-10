import useTheme from "@/hooks/misc/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { useLingui } from "@lingui/react/macro";
import { ForwardedRef, forwardRef, memo, useCallback, useState } from "react";
import { Pressable, TextInput as RNTextInput } from "react-native";
import TextInput, { TextInputProps } from "./TextInput";

export type SecureTextInputProps = Omit<TextInputProps, "secureTextEntry">;

const SecureTextInput = memo(
  forwardRef((props: SecureTextInputProps, ref: ForwardedRef<RNTextInput>) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { theme } = useTheme();

    const { t } = useLingui();

    const togglePasswordVisibility = useCallback(() => {
      setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    return (
      <TextInput
        {...props}
        ref={ref}
        secureTextEntry={!isPasswordVisible}
        accessibilityLabel={t`Toggle password visibility`}
        rightIcon={
          <Pressable
            onPress={togglePasswordVisibility}
            testID="secure-input-eye-icon-container"
          >
            {isPasswordVisible ? (
              <Feather
                name="eye"
                size={20}
                color={theme["base-300"].DEFAULT}
                testID="secure-input-eye-icon"
              />
            ) : (
              <Feather
                name="eye-off"
                size={20}
                color={theme["base-300"].DEFAULT}
                testID="secure-input-eye-off-icon"
              />
            )}
          </Pressable>
        }
      />
    );
  }),
);

SecureTextInput.displayName = "SecureTextInput";

export default SecureTextInput;
