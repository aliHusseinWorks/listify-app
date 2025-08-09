import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";
import { ThemeType, useTheme } from "@theme";
import { Button, TextField } from "@styled";

export const LoginComponent = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const styles = useMemo(() => createThemedStyles(theme), [theme]);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (!username.trim() || !password) {
      Alert.alert(t("login.error_enter_credentials"));
      return;
    }

    const success = login(username, password);
    if (!success) {
      Alert.alert(t("login.error_invalid_credentials"));
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.inputsContainer}>
          <Text style={styles.title}>{t("login.title")}</Text>

          <TextField
            placeholder={t("login.username_placeholder")}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextField
            placeholder={t("login.password_placeholder")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button title={t("login.login_button")} onPress={handleLogin} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const createThemedStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 32,
      marginBottom: 24,
      alignSelf: "center",
      color: theme.text,
    },
    inputsContainer: {
      gap: 24,
    },
  });
