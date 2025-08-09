import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, Switch } from "react-native";
import { useTranslation } from "react-i18next";

import { useAuth } from "@hooks/useAuth";
import { useTheme, ThemeType } from "@theme";
import { Button, LogoutModal, ChangeLanguageSheet } from "@styled";

export const AccountComponent = () => {
  const { theme, toggleTheme, mode } = useTheme();
  const { t } = useTranslation();
  const { auth } = useAuth();
  const styles = useMemo(() => createThemedStyles(theme), [theme]);

  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showLangSheet, setShowLangSheet] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: `https://i.pravatar.cc`,
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.greeting}>
          {t("account.greeting", {
            username: auth?.user?.name || t("account.user"),
          })}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title={t("account.change_language")}
          onPress={() => setShowLangSheet(true)}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {mode === "dark" ? t("account.dark_mode") : t("account.light_mode")}
          </Text>

          <Switch
            value={mode === "dark"}
            onValueChange={toggleTheme}
            trackColor={{
              false: theme.switchTrackOff,
              true: theme.switchTrackOn,
            }}
            thumbColor={
              mode === "dark" ? theme.switchThumbOn : theme.switchThumbOff
            }
          />
        </View>

        <Button
          title={t("account.logout")}
          onPress={() => setShowLogoutModal(true)}
          variant="danger"
        />
      </View>

      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
      <ChangeLanguageSheet
        visible={showLangSheet}
        onClose={() => setShowLangSheet(false)}
      />
    </View>
  );
};

const createThemedStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    profileSection: {
      alignItems: "center",
      marginBottom: 48,
    },
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      overflow: "hidden",
      backgroundColor: "#ccc",
      marginBottom: 12,
    },
    avatar: {
      width: "100%",
      height: "100%",
    },
    greeting: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    buttonsContainer: {
      gap: 24,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 24,
    },
    switchLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.text,
    },
  });
