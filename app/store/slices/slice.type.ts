export interface Data {
    id: number;
    name: string;
    icon?: string
}

export interface Ad {
    ad_image_url: string;
    ad_location_name: string;
    ad_agent_name: string;
    ad_price: number;
    ad_title: string;
    ad_category_id: number;
}

export interface HomeState {
    locations: Data[];
    loadingLocations: boolean;
    categories: Data[];
    loadingCategories: boolean;
    ads: Ad[],
    loadingAds: boolean,
    error: string | null;
}