import type {
	CartType,
	CategoryType,
	CollectionType,
	CustomerType,
	ProductType,
	ShippingOptionType,
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
