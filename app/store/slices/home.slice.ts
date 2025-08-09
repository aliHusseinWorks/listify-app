import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { fetchLocationsApi, fetchCategoriesApi, fetchAdsApi } from "@services";
import { HomeState } from "./slice.type";

const initialState: HomeState = {
    locations: [],
    loadingLocations: false,
    categories: [],
    loadingCategories: false,
    ads: [],
    loadingAds: false,
    error: null,
};

export const fetchLocations = createAsyncThunk(
    "home/fetchLocations",
    async () => {
        return await fetchLocationsApi();
    }
);

export const fetchCategories = createAsyncThunk(
    "home/fetchCategories",
    async () => {
        const categories = await fetchCategoriesApi();
        return categories;
    }
);

export const fetchAds = createAsyncThunk(
    "home/fetchAds",
    async () => {
        const categories = await fetchAdsApi();
        return categories;
    }
);

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.loadingLocations = true;
                state.error = null;
            })
            .addCase(fetchLocations.fulfilled, (state, action: PayloadAction<{ id: number; name: string }[]>) => {
                state.loadingLocations = false;
                state.locations = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.loadingLocations = false;
                state.error = action.error.message || "Failed to fetch locations";
            });

        builder.addCase(fetchCategories.pending, (state) => {
            state.loadingCategories = true;
            state.error = null;
        })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loadingCategories = false;
                state.error = action.error.message || "Failed to fetch categories";

            });

        builder.addCase(fetchAds.pending, (state) => {
            state.loadingAds = true;
            state.error = null;
        })
            .addCase(fetchAds.fulfilled, (state, action) => {
                state.loadingAds = false;
                state.ads = action.payload;
            })
            .addCase(fetchAds.rejected, (state, action) => {
                state.loadingAds = false;
                state.error = action.error.message || "Failed to fetch ads";

            });
    },
});

export default homeSlice.reducer;
