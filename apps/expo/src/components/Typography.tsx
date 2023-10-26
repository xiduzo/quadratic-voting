import type { FC, PropsWithChildren } from "react";
import type { TextProps } from "react-native";
import { Text } from "react-native";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const Typography: FC<Props> = ({
  children,
  className,
  intent,
  dimmed,
  ...textProps
}) => {
  return (
    <Text {...textProps} className={typography({ className, intent, dimmed })}>
      {children}
    </Text>
  );
};

interface Props
  extends PropsWithChildren,
    TextProps,
    VariantProps<typeof typography> {
  className?: string;
}

const typography = cva("text-text", {
  variants: {
    intent: {
      "4xl": "text-3xl",
      "3xl": "text-2xl",
      "2xl": "text-xl",
      xl: "text-xs",
      lg: "text-xs",
      base: "text-base",
      sm: "text-xs",
      // "4xl": "font-Poppins_900Black text-3xl",
      // "3xl": "font-Poppins_800ExtraBold text-2xl",
      // "2xl": "font-Poppins_700Bold text-xl",
      // xl: "font-Poppins_600SemiBold text-xs",
      // lg: "font-Poppins_500Medium text-xs",
      // base: "font-Poppins_400Regular text-base",
      // sm: "font-Poppins_300Light text-xs",
    },
    dimmed: {
      true: "opacity-40",
      false: "",
    },
  },
  defaultVariants: {
    intent: "base",
  },
});
