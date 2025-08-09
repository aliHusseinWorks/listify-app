import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

import { useTheme, ThemeType } from "@theme";
import { changeLanguage } from "@translation/localize";
import { ChangeLanguageSheetProps } from "./languageModal.type";

export const ChangeLanguageSheet = ({
  visible,
  onClose,
}: ChangeLanguageSheetProps) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(
    () => createThemedStyles(theme, i18n.language),
    [theme, i18n.language]
  );

  if (!visible) return null;

  const changeLang = async (lang: string) => {
    onClose();
    if (i18n.language !== lang) {
      await changeLanguage(lang);
    }
  };

  return (
    <Animated.View
      style={styles.overlay}
      entering={SlideInDown}
      exiting={SlideOutDown}
    >
      <View style={styles.sheet}>
        <TouchableOpacity
          style={styles.option}
          disabled={i18n.language === "en"}
          onPress={() => changeLang("en")}
        >
          <Text style={styles.optionTextEnglish}>
            English {i18n.language === "en" ? "✓" : ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          disabled={i18n.language === "ar"}
          onPress={() => changeLang("ar")}
        >
          <Text style={styles.optionTextArabic}>
            العربية {i18n.language === "ar" ? "✓" : ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancel} onPress={onClose}>
          <Text style={styles.cancelText}>{t("common.cancel")}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const createThemedStyles = (theme: ThemeType, currentLang: string) =>
  StyleSheet.create({
    overlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    sheet: {
      padding: 20,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: theme.card,
    },
    option: {
      paddingVertical: 12,
    },
    optionTextEnglish: {
      fontSize: 16,
      color: currentLang === "en" ? theme.primary : theme.text,
      fontWeight: currentLang === "en" ? "bold" : "normal",
    },
    optionTextArabic: {
      fontSize: 16,
      color: currentLang === "ar" ? theme.primary : theme.text,
      fontWeight: currentLang === "ar" ? "bold" : "normal",
    },
    cancel: {
      paddingVertical: 14,
      alignItems: "center",
    },
    cancelText: {
      color: theme.primary,
    },
  });
