import { Ad } from "@/store/slices/slice.type";

export interface Props {
    data: Ad[];
    onPressAd: (ad: Ad) => void;
    loading: boolean
}

export { Ad }