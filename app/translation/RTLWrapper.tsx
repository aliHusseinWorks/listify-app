import React from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const RTL_LANGUAGES = ["ar"];

interface RTLWrapperProps {
  children: React.ReactNode;
}

export const RTLWrapper = ({ children }: RTLWrapperProps) => {
  const { i18n } = useTranslation();

  const isRTL = RTL_LANGUAGES.includes(i18n.language);

  return (
    <View style={[styles.container, { direction: isRTL ? "rtl" : "ltr" }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
