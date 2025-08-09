import { Data } from "@/store/slices/slice.type";

export interface Props {
    title: string;
    data: Data[];
    loading: boolean;
    selectedCategories: Data[];
    onItemPress?: (selectedCategories: Data[]) => void;
}

export { Data }