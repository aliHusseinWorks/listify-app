import React, { useMemo } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { useTheme } from "@theme";
import { ButtonProps } from "./button.type";

export const Button = ({
  title,
  containerStyle,
  textStyle,
  disabled,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();

  const backgroundColor = useMemo(() => {
    if (disabled) return theme.border;

    switch (variant) {
      case "danger":
        return theme.error;
      case "secondary":
        return theme.secondary;
      default:
        return theme.primary;
    }
  }, [disabled, variant, theme]);

  const textColor = useMemo(() => {
    switch (variant) {
      case "danger":
      case "primary":
        return theme.textOnPrimary;
      case "secondary":
        return theme.text;
      default:
        return theme.text;
    }
  }, [variant, theme]);

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[styles.button, { backgroundColor }, containerStyle]}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
