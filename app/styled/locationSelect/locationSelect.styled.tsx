import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { ThemeType, useTheme } from "@/theme";
import { TextField } from "@styled";
import { Props } from "./locationSelect.type";

export const LocationSelect = ({
  selected,
  onSelect,
  locations,
  loading,
}: Props) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createThemedStyles(theme), [theme]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const filtered = locations?.filter((loc) =>
    loc?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="location-outline" size={20} color={theme.primary} />
        <Text style={styles.text}>
          {selected || t("location.select_location")}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={theme.primary} />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.searchRow}>
                  <TextField
                    style={styles.searchInput}
                    placeholder={t("location.search_location")}
                    value={search}
                    onChangeText={setSearch}
                  />
                  <TouchableOpacity onPress={() => setSearch("")}>
                    <Text style={styles.clearText}>{t("common.clear")}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    onSelect("Lebanon");
                    setSearch("");
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.seeAll}>{t("location.see_all")}</Text>
                </TouchableOpacity>
                {loading ? (
                  <Text>{t("common.loading")}</Text>
                ) : filtered?.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      {t("common.no_results")}
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={filtered}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                          onSelect(item?.name);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.text}>{item?.name}</Text>
                      </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContainer}
                  />
                )}

                <TouchableOpacity
                  style={styles.closeContainer}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeText}>{t("common.close")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const createThemedStyles = (theme: ThemeType) =>
  StyleSheet.create({
    selector: {
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      backgroundColor: theme.card,
      borderRadius: 8,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: theme.semiTransparent,
    },
    modalContent: {
      backgroundColor: theme.background,
      padding: 24,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      maxHeight: "80%",
      gap: 24,
    },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    searchInput: {
      flex: 1,
    },
    clearText: {
      color: theme.text,
    },
    item: {
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.card,
    },
    closeContainer: {
      paddingBottom: 12,
    },
    closeText: {
      color: theme.primary,
      textAlign: "center",
    },
    text: {
      color: theme.text,
      fontSize: 16,
      textAlign: "left",
    },
    seeAll: {
      color: theme.primary,
      fontSize: 12,
      textAlign: "left",
    },
    emptyContainer: {
      alignItems: "center",
    },
    emptyText: {
      color: theme.text,
      fontSize: 16,
    },
    listContainer: { gap: 16 },
  });
