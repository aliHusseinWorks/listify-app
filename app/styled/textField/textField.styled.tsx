import React, { useMemo } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  I18nManager,
} from "react-native";

import { useTheme, ThemeType } from "@theme";

export const TextField = (props: TextInputProps) => {
  const { theme, mode } = useTheme();
  const styles = useMemo(() => createThemedStyles(theme), [theme]);

  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={theme.placeholder}
      keyboardAppearance={mode ?? "light"}
    />
  );
};

const createThemedStyles = (theme: ThemeType) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderRadius: 6,
      padding: 12,
      backgroundColor: theme.input,
      color: theme.text,
      borderColor: theme.border,
      textAlign: "left",
    },
  });
