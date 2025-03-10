import { forwardRef, memo } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { TextInput as RNTextInput } from "react-native";
import SecureTextInput, { SecureTextInputProps } from "./SecureTextInput";

export type FormSecureTextInputProps = SecureTextInputProps &
  UseControllerProps & {
    showError?: boolean;
  };

const FormSecureTextInput = memo(
  forwardRef<RNTextInput, FormSecureTextInputProps>(
    (
      {
        name,
        control,
        rules,
        shouldUnregister,
        errorMessage,
        showError = true,
        ...rest
      },
      ref,
    ) => {
      const { field, fieldState } = useController({
        name,
        control,
        defaultValue: rest.defaultValue,
        disabled: rest.disabled,
        rules,
        shouldUnregister,
      });

      const hasError = !!errorMessage || (!!showError && !!fieldState.error);

      const errorToShow = hasError
        ? errorMessage || fieldState.error?.message
        : undefined;

      return (
        <SecureTextInput
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          errorMessage={errorToShow}
          ref={ref}
          {...rest}
        />
      );
    },
  ),
);

FormSecureTextInput.displayName = "FormSecureTextInput";

export default FormSecureTextInput;
