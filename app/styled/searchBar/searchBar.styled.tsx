import React, { useState, useMemo } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useTheme, ThemeType } from "@/theme";
import { Props } from "./searchBar.type";
import { TextField } from "../textField/textField.styled";

export const SearchBar = ({
  searchText = "",
  onSearchTextChange,
  priceRange,
  onPriceRangeChange,
}: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createThemedStyles(theme), [theme]);

  const [text, setText] = useState<string>(searchText);
  const [minPrice, maxPrice] = priceRange;

  const clearText = () => {
    setText("");
    onSearchTextChange("");
  };

  const onChangeText = (value: string) => {
    setText(value);
    onSearchTextChange(value);
  };

  const clearMinPrice = () => onPriceRangeChange(["", maxPrice]);
  const clearMaxPrice = () => onPriceRangeChange([minPrice, ""]);

  const onMinPriceChange = (value: string) =>
    onPriceRangeChange([value, maxPrice]);
  const onMaxPriceChange = (value: string) =>
    onPriceRangeChange([minPrice, value]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={20} color={theme.secondary} />
          <TextField
            style={styles.input}
            placeholder={t("common.search")}
            value={text}
            onChangeText={onChangeText}
            autoCorrect={false}
          />
          {text.length > 0 && (
            <TouchableOpacity onPress={clearText}>
              <Ionicons name="close-circle" size={20} color={theme.secondary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceWrapper}>
            <Text style={styles.priceLabel}>{t("search.min_price")}</Text>
            <TextField
              style={styles.priceInput}
              placeholder="0"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={onMinPriceChange}
              returnKeyType="done"
            />
            {minPrice.length > 0 && (
              <TouchableOpacity
                style={styles.clearPriceBtn}
                onPress={clearMinPrice}
              >
                <Ionicons
                  name="close-circle"
                  size={16}
                  color={theme.secondary}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.priceWrapper}>
            <Text style={styles.priceLabel}>{t("search.max_price")}</Text>
            <TextField
              style={styles.priceInput}
              placeholder="0"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={onMaxPriceChange}
              returnKeyType="done"
            />
            {maxPrice.length > 0 && (
              <TouchableOpacity
                style={styles.clearPriceBtn}
                onPress={clearMaxPrice}
              >
                <Ionicons
                  name="close-circle"
                  size={16}
                  color={theme.secondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const createThemedStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginVertical: 12,
    },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.card,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 8,
    },
    input: {
      flex: 1,
      color: theme.text,
      fontSize: 16,
    },
    priceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
      gap: 12,
    },
    priceWrapper: {
      flex: 1,
      position: "relative",
    },
    priceLabel: {
      fontSize: 12,
      color: theme.secondary,
      marginBottom: 4,
      textAlign: "left",
    },
    priceInput: {
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === "ios" ? 12 : 8,
      color: theme.text,
      fontSize: 16,
      paddingRight: 28,
    },
    clearPriceBtn: {
      position: "absolute",
      right: 6,
      top: Platform.OS === "ios" ? 30 : 26,
    },
  });
