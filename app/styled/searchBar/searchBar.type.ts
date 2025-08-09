export interface Props {
    searchText?: string;
    onSearchTextChange: (text: string) => void;
    priceRange: [string, string];
    onPriceRangeChange: (range: [string, string]) => void;
}
