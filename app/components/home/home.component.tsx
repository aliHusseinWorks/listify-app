import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, SafeAreaView, View, I18nManager } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { useTheme, ThemeType } from "@/theme";
import { AppDispatch, RootState } from "@store";
import {
  fetchLocations,
  fetchCategories,
  fetchAds,
} from "@/store/slices/home.slice";
import { LocationSelect } from "@styled/locationSelect/locationSelect.styled";
import { Carousel } from "@/styled/carousel/carousel.styled";
import { AdsList } from "@/styled/adsList/adsList.styled";
import { Data } from "@/store/slices/slice.type";
import { Ad } from "@/styled/adsList/adsList.type";
import { SearchBar } from "@/styled/searchBar/searchBar.styled";

export const HomeComponent = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const styles = useMemo(() => createThemedStyles(theme), [theme]);
  const {
    locations,
    categories,
    ads,
    loadingLocations,
    loadingCategories,
    loadingAds,
  } = useSelector((state: RootState) => state.home);

  const [selectedLocation, setSelectedLocation] = useState<string>("Lebanon");
  const [selectedCategories, setSelectedCategories] = useState<Data[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[string, string]>(["", ""]);

  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchCategories());
    dispatch(fetchAds());
  }, [dispatch]);

  function filterAds(
    ads: Ad[],
    selectedLocation: string,
    selectedCategories: Data[],
    searchText: string,
    priceRange: [string, string]
  ): Ad[] {
    const selectedCategoryIds = selectedCategories.map((cat) => cat.id);
    const selectedLocationLower = selectedLocation.toLowerCase();
    const [minPriceStr, maxPriceStr] = priceRange;

    const minPrice = minPriceStr ? Number(minPriceStr) : undefined;
    const maxPrice = maxPriceStr ? Number(maxPriceStr) : undefined;

    return ads.filter((ad) => {
      const adLocationLower = ad.ad_location_name?.toLowerCase() || "";

      const matchesLocation =
        selectedLocationLower === "lebanon" ||
        selectedLocationLower.includes(adLocationLower);

      const matchesCategory =
        selectedCategoryIds.length === 0 ||
        selectedCategoryIds.includes(ad.ad_category_id);

      const matchesTitle = ad.ad_title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      // Convert ad price to number safely
      const adPriceNum = Number(ad.ad_price);

      const matchesPrice =
        (minPrice === undefined || adPriceNum >= minPrice) &&
        (maxPrice === undefined || adPriceNum <= maxPrice);

      return matchesLocation && matchesCategory && matchesTitle && matchesPrice;
    });
  }

  const filteredAds = useMemo(() => {
    return filterAds(
      ads,
      selectedLocation,
      selectedCategories,
      searchText,
      priceRange
    );
  }, [ads, selectedLocation, selectedCategories, searchText, priceRange]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <LocationSelect
          selected={selectedLocation}
          onSelect={setSelectedLocation}
          locations={locations}
          loading={loadingLocations}
        />
        <SearchBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />
        <Carousel
          title={t("category.all_categories")}
          data={categories}
          loading={loadingCategories}
          selectedCategories={selectedCategories}
          onItemPress={setSelectedCategories}
        />
        <AdsList
          data={filteredAds}
          onPressAd={(ad) => console.log("Selected ad:", ad.ad_title)}
          loading={loadingAds}
        />
      </View>
    </SafeAreaView>
  );
};

const createThemedStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      flex: 1,
      alignItems: "flex-start",
      paddingHorizontal: 24,
      gap: 12,
    },
  });
