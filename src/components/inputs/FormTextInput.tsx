import { forwardRef, memo } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { TextInput as RNTextInput } from "react-native";
import TextInput, { TextInputProps } from "./TextInput";

export type FormTextInputProps = TextInputProps &
  UseControllerProps & {
    showError?: boolean;
  };

const FormTextInput = memo(
  forwardRef<RNTextInput, FormTextInputProps>(
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
        <TextInput
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

FormTextInput.displayName = "FormTextInput";

export default FormTextInput;
