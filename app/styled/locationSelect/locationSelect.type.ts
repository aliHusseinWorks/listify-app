import { Data } from "@/store/slices/slice.type";

export interface Props {
    selected: string | null;
    onSelect: (location: string) => void;
    locations: Data[];
    loading: boolean;
}