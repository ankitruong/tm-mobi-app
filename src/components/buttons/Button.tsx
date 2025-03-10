import {
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from "@/interfaces/components";
import { clsx } from "clsx";
import { ForwardedRef, ReactNode, forwardRef, memo, useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";

const BUTTON_SIZES: Record<ButtonSize, { className: string }> = {
  xs: { className: "px-2 h-10" },
  sm: { className: "px-3 h-12" },
  md: { className: "px-3 h-14" },
  lg: { className: "px-4 h-16" },
  xl: { className: "px-4 h-20" },
} as const;

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary active:bg-yellow-500",
  secondary: "bg-gray-50 active:bg-gray-200 border border-gray-100",
  danger: "bg-error active:bg-error",
  ghost: "bg-transparent border border-transparent",
  outline: "bg-transparent border border-neutral-content-700",
} as const;

const BUTTON_SHAPES: Record<ButtonShape, string> = {
  rounded: "rounded-xl",
  square: "rounded-none",
  circle: "rounded-full",
} as const;

export type ButtonProps = PressableProps & {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  className?: string;
  textClassName?: string;
  shape?: ButtonShape;
};

const Button = memo(
  forwardRef(
    (
      {
        title,
        leftIcon,
        rightIcon,
        variant = "primary",
        size = "md",
        isLoading = false,
        disabled = false,
        className,
        textClassName,
        style,
        shape = "rounded",
        ...props
      }: ButtonProps,
      ref: ForwardedRef<View>,
    ) => {
      const textColor = useMemo(() => {
        if (variant === "primary") {
          return "text-primary-content";
        }

        if (variant === "secondary") {
          return "text-secondary-content";
        }

        if (variant === "danger") {
          return "text-error-content";
        }

        return "text-base-300";
      }, [variant]);

      return (
        <Pressable
          ref={ref}
          disabled={disabled || isLoading}
          className={clsx(
            "flex-row items-center justify-center gap-4",
            BUTTON_VARIANTS[variant],
            BUTTON_SIZES[size].className,
            BUTTON_SHAPES[shape],
            disabled && "opacity-50",
            className,
          )}
          style={style}
          {...props}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              {leftIcon}
              <Text
                className={clsx(
                  "font-Inter-Medium",
                  textColor,
                  size === "xs" && "text-sm",
                  size === "sm" && "text-base",
                  size === "md" && "text-lg",
                  size === "lg" && "text-xl",
                  size === "xl" && "text-2xl",
                  textClassName,
                )}
              >
                {title}
              </Text>
              {rightIcon}
            </>
          )}
        </Pressable>
      );
    },
  ),
);

Button.displayName = "Button";

export default Button;
