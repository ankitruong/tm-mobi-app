import {
  IconButtonShape,
  IconButtonSize,
  IconButtonVariant,
} from "@/interfaces/components";
import { clsx } from "clsx";
import { ForwardedRef, forwardRef, memo } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
} from "react-native";

const ICON_BUTTON_SIZES: Record<IconButtonSize, { className: string }> = {
  xs: { className: "h-8 w-8" },
  sm: { className: "h-10 w-10" },
  md: { className: "h-12 w-12" },
  lg: { className: "h-14 w-14" },
  xl: { className: "h-16 w-16" },
} as const;

const ICON_BUTTON_VARIANTS: Record<IconButtonVariant, string> = {
  primary: "bg-primary active:bg-yellow-500",
  secondary: "bg-gray-50 active:bg-gray-100",
  danger: "bg-error active:bg-error",
  ghost: "bg-transparent active:bg-gray-100",
  outline: "bg-transparent border border-neutral-content-700",
} as const;

const ICON_BUTTON_SHAPES: Record<IconButtonShape, string> = {
  rounded: "rounded-lg",
  square: "rounded-none",
  circle: "rounded-full",
} as const;

export type IconButtonProps = PressableProps & {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  shape?: IconButtonShape;
};

const IconButton = memo(
  forwardRef(
    (
      {
        variant = "primary",
        size = "md",
        isLoading = false,
        disabled = false,
        shape = "circle",
        className,
        children,
        style,
        ...props
      }: IconButtonProps,
      ref: ForwardedRef<View>,
    ) => {
      return (
        <Pressable
          ref={ref}
          disabled={disabled || isLoading}
          className={clsx(
            ICON_BUTTON_VARIANTS[variant],
            ICON_BUTTON_SIZES[size].className,
            "flex-row items-center justify-center",
            ICON_BUTTON_SHAPES[shape],
            disabled && "opacity-50",
            className,
          )}
          style={style}
          {...props}
        >
          {isLoading ? <ActivityIndicator /> : children}
        </Pressable>
      );
    },
  ),
);

IconButton.displayName = "IconButton";

export default IconButton;
