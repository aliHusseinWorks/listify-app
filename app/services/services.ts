import { ADS, CATEGORIES, LOCATIONS } from "@constants";
import { Data, Ads } from "@/store/slices/slice.type";

export const fetchLocationsApi = async () => {
    return new Promise<Data[]>((resolve) => {
        setTimeout(() => {
            resolve(LOCATIONS);
        }, 500);
    });
};

export const fetchCategoriesApi = async () => {
    return new Promise<Data[]>((resolve) => {
        setTimeout(() => {
            resolve(CATEGORIES);
        }, 1000);
    });
}

export const fetchAdsApi = async () => {
    return new Promise<Ads[]>((resolve) => {
        setTimeout(() => {
            resolve(ADS);
        }, 3000);
    });
}
