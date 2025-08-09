import React, { useMemo } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme, ThemeType } from "@theme";
import { useAuth } from "@hooks";
import { Button } from "../button/button.styled";
import { LogoutModalProps } from "./logoutModal.type";

export const LogoutModal = ({ visible, onClose }: LogoutModalProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { logout } = useAuth();
  const styles = useMemo(() => createThemedStyles(theme), [theme]);

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {t("account.logout_confirmation_title")}
          </Text>
          <Text style={styles.message}>
            {t("account.logout_confirmation_message")}
          </Text>
          <View style={styles.actions}>
            <View style={styles.flexContainer}>
              <Button
                title={t("common.cancel")}
                onPress={onClose}
                variant="secondary"
              />
            </View>
            <View style={styles.flexContainer}>
              <Button
                title={t("common.confirm")}
                onPress={handleLogout}
                variant="danger"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createThemedStyles = (theme: ThemeType) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.semiTransparent,
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      width: "90%",
      alignItems: "center",
      padding: 20,
      borderRadius: 12,
      backgroundColor: theme.card,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },
    message: {
      fontSize: 15,
      marginTop: 8,
      marginBottom: 16,
      color: theme.text,
    },
    actions: {
      flexDirection: "row",
      gap: 12,
    },
    flexContainer: { flex: 1 },
  });
