import type {
	Annonce,
	CartType,
	CategoryType,
	CollectionType,
	CustomProduct,
	CustomerType,
	OrderType,
	ProductType,
	RegionType,
	SearchType,
	ShippingOptionType,
	SwapType,
	VariantType,
} from "./apiType";

export interface ProductRes {
	products: ProductType[];
	count: number;
	offset: number;
	limit: number;
}

export interface SingleProductRes {
	product: ProductType;
}

export interface InfiniteProductRes {
	pages: ProductRes;
	pageParams: [];
}

export interface CategoryRes {
	product_categories: CategoryType[];
	count: number;
	offset: number;
	limit: number;
}

export interface ProductCategoryRes {
	product_category: CategoryType;
}

export interface CartRes {
	cart: CartType;
}

export interface ShippingOptionsRes {
	shipping_options: ShippingOptionType[];
}

export interface CollectionsRes {
	collections: CollectionType[];
}

export interface CollectionRes {
	collection: CollectionType;
}

export interface VariantsRes {
	variants: VariantType[];
}

export interface CustomerRes {
	customer: CustomerType;
}

export interface RegionsRes {
	regions: RegionType[];
	count: number;
	offset: number;
	limit: number;
}

export interface CompleteCartRes {
	type: "order" | "cart" | "swap";
	data: OrderType | CartType | SwapType;
}

export interface SearchRes {
	hits: Array<SearchType>;
	query: string;
	estimatedTotalHits: number;
}

export interface CustomProductRes {
	products: Array<ProductType>;
}

export interface AnnoncesRes {
	annonces: Array<Annonce>;
}
