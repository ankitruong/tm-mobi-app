import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import {
  TextInputShape,
  TextInputSize,
  TextInputVariant,
} from "@/interfaces/components";
import { clsx } from "clsx";
import { ForwardedRef, ReactNode, forwardRef, memo } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";

const TEXT_INPUT_SIZES: Record<TextInputSize, { className: string }> = {
  xs: { className: "px-2 h-10" },
  sm: { className: "px-3 h-12" },
  md: { className: "px-3 h-14" },
  lg: { className: "px-4 h-16" },
  xl: { className: "px-4 h-20" },
} as const;

const TEXT_INPUT_VARIANTS: Record<TextInputVariant, string> = {
  primary: "border-primary",
  secondary: "bg-secondary-500 border-neutral-content-700",
  ghost: "border-transparent",
  danger: "border-error",
  outline: "border-neutral-content-700",
} as const;

const TEXT_INPUT_SHAPES: Record<TextInputShape, string> = {
  rounded: "rounded-lg",
  square: "rounded-none",
  circle: "rounded-full",
} as const;

export type TextInputProps = RNTextInputProps & {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: TextInputSize;
  variant?: TextInputVariant;
  caption?: string;
  errorMessage?: string;
  shape?: TextInputShape;
  inputClassName?: string;
  required?: boolean;
  testID?: string;
};

const TextInput = memo(
  forwardRef(
    (
      {
        label,
        leftIcon,
        rightIcon,
        size = "md",
        variant = "outline",
        shape = "rounded",
        className,
        caption,
        editable = true,
        errorMessage,
        inputClassName,
        required,
        testID,
        ...props
      }: TextInputProps,
      ref: ForwardedRef<RNTextInput>,
    ) => {
      const { theme } = useTheme();

      return (
        <View className="gap-2">
          {label ? (
            <View className="flex-row items-center gap-1">
              <Text>{label}</Text>
              {required ? <Text className="text-sm text-error">*</Text> : null}
            </View>
          ) : null}
          <View
            className={clsx(
              "flex-row items-center gap-2 border",
              TEXT_INPUT_SHAPES[shape],
              TEXT_INPUT_VARIANTS[variant],
              TEXT_INPUT_SIZES[size].className,
              !editable && "opacity-50",
              className,
            )}
            testID={testID}
          >
            {leftIcon}
            <View className="h-full flex-1">
              <RNTextInput
                ref={ref}
                className={clsx(
                  "h-full w-full font-Inter-Regular leading-[0] text-base-300",
                  size === "xs" && "text-xs",
                  size === "sm" && "text-sm",
                  size === "md" && "text-base",
                  size === "lg" && "text-lg",
                  size === "xl" && "text-xl",
                  inputClassName,
                )}
                editable={editable}
                textAlignVertical="center"
                placeholderTextColor={theme["base-100"].DEFAULT}
                testID={`${testID}-input`}
                {...props}
              />
            </View>
            {rightIcon}
          </View>
          {errorMessage ? (
            <Text className="!text-sm !text-error">{errorMessage}</Text>
          ) : caption ? (
            <Text className="!text-sm">{caption}</Text>
          ) : null}
        </View>
      );
    },
  ),
);

TextInput.displayName = "TextInput";

export default TextInput;
