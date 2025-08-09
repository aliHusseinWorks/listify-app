import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ThemeType, useTheme } from "@/theme";
import { Data, Props } from "./carousel.type";

export const Carousel = ({
  title,
  data,
  selectedCategories,
  onItemPress,
  loading,
}: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createThemedStyles(theme), [theme]);

  const getIconName = (category: Data): string =>
    category.icon || "albums-outline";

  const isSelected = (item: Data) =>
    selectedCategories.some((cat) => cat.id === item.id);

  const toggleSelection = (item: Data) => {
    let newSelection;
    if (isSelected(item)) {
      newSelection = selectedCategories.filter((cat) => cat.id !== item.id);
    } else {
      newSelection = [...selectedCategories, item];
    }
    onItemPress?.(newSelection);
  };

  const renderItem = ({ item }: { item: Data }) => {
    const selected = isSelected(item);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => toggleSelection(item)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={getIconName(item)}
          size={40}
          color={selected ? theme.primary : theme.text}
        />
        <Text style={[styles.itemText, selected && styles.selectedText]}>
          {t(`category.${item.name.toLowerCase()}`)}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Text style={styles.loadingText}>{t("common.loading")}</Text>;
  }

  if (!data?.length) {
    return <Text style={styles.loadingText}>{t("common.no_results")}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(title)}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const createThemedStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      height: 150,
    },
    title: {
      fontSize: 20,
      marginBottom: 12,
      color: theme.text,
      textAlign: "left",
    },
    listContainer: {
      alignItems: "center",
      gap: 12,
      backgroundColor: theme.card,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    item: {
      minWidth: 90,
      alignItems: "center",
      padding: 8,
      borderRadius: 8,
    },
    itemText: {
      marginTop: 8,
      fontSize: 14,
      textAlign: "center",
      color: theme.text,
    },
    selectedText: {
      color: theme.primary,
      fontWeight: "600",
    },
    loadingText: {
      textAlign: "center",
      color: theme.text,
      marginVertical: 16,
    },
  });
