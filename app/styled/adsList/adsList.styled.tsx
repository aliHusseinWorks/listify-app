import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useTheme, ThemeType } from "@/theme";
import { Ad, Props } from "./adsList.type";

export const AdsList = ({ data, onPressAd, loading }: Props) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createThemedStyles(theme), [theme]);

  const renderItem = ({ item }: { item: Ad }) => (
    <TouchableOpacity style={styles.card} onPress={() => onPressAd(item)}>
      <Image source={{ uri: item?.ad_image_url }} style={styles.image} />
      <Text style={styles.price}>
        $ {item?.ad_price?.toLocaleString("en-US")}
      </Text>
      <Text style={styles.title} numberOfLines={2}>
        {item?.ad_title}
      </Text>
      <Text style={styles.location}>{item?.ad_location_name || ""}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loader]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const createThemedStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 8,
      marginBottom: 12,
      flex: 1,
      marginHorizontal: 4,
    },
    image: {
      width: "100%",
      height: 120,
      borderRadius: 6,
      resizeMode: "cover",
      marginBottom: 8,
    },
    price: {
      color: theme.primary,
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "left",
    },
    title: {
      color: theme.text,
      fontSize: 14,
      marginTop: 4,
      marginBottom: 4,
      textAlign: "left",
    },
    location: {
      color: theme.secondary,
      fontSize: 12,
      textAlign: "left",
    },
    columnWrapper: { justifyContent: "space-between" },
  });
