export type Nullable<T> = T | null | undefined;

export type MetadataType = unknown;

export type CollectionMetadataType = {
	description?: string;
	discount?: string;
	starts_at?: string;
	ends_at?: string;
} & MetadataType;

export type CategoryType = {
	id: string;
	created_at: string;
	updated_at: string;
	name: string;
	description: string;
	handle: string;
	is_active: boolean;
	is_internal: boolean;
	parent_category_id: Nullable<string>;
	rank: number;
	category_children: Array<CategoryType>;
	parent_category: Nullable<CategoryType>;
	products: Array<ProductType>;
};

export type CollectionType = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	title: string;
	handle: string;
	metadata: Nullable<CollectionMetadataType>;
};

export type ImageType = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	url: string;
	metadata: Nullable<MetadataType>;
};

export type OptionType = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	title: string;
	product_id: string;
	metadata: Nullable<MetadataType>;
};

export type ProfileType = {
	id: string;
	name: string;
	type: "default" | "gift_card" | "custom";
	shipping_options: ShippingOptionType[];
	products: ProductType[];
} & TimestampType;

export type SalesChannelType = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	name: string;
	description: string;
	is_disabled: boolean;
	metadata: Nullable<MetadataType>;
};

export type DimensionType = {
	weight: Nullable<number>;
	length: Nullable<number>;
	height: Nullable<number>;
	width: Nullable<number>;
};

export type VariantOptionType = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	value: string;
	option_id: string;
	variant_id: string;
	metadata: Nullable<MetadataType>;
};

export type VariantPriceType = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	currency_code: string;
	amount: number;
	min_quantity: Nullable<number>;
	max_quantity: Nullable<number>;
	price_list_id: Nullable<number>;
	variant_id: string;
	region_id: Nullable<string>;
};

export type VariantType = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	title: string;
	product_id: string;
	sku: Nullable<string>;
	barcode: Nullable<string>;
	ean: Nullable<string>;
	upc: Nullable<string>;
	variant_rank: number;
	inventory_quantity: number;
	allow_backorder: boolean;
	manage_inventory: boolean;
	hs_code: Nullable<string>;
	origin_country: string;
	mid_code: Nullable<string>;
	material: Nullable<string>;
	metadata: Nullable<MetadataType>;
	options: VariantOptionType[];
	prices: VariantPriceType[];
} & DimensionType;

export type TagType = {
	id: string;
	value: string;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	metadata: Nullable<MetadataType>;
};

export type ProductType = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	title: string;
	handle: string;
	subtitle: string;
	description: string;
	is_giftcard: boolean;
	status: "published" | "draft";
	thumbnail: string;
	hs_code: Nullable<string>;
	origin_country: Nullable<string>;
	mid_code: Nullable<string>;
	material: Nullable<string>;
	collection_id: Nullable<string>;
	type_id: Nullable<string>;
	discountable: boolean;
	external_id: Nullable<string>;
	metadata: MetadataType;
	profile_id: string;
	categories: CategoryType[];
	collection: CollectionType;
	images: ImageType[];
	options: OptionType[];
	profiles: ProfileType[];
	profile: ProfileType;
	sales_channels: SalesChannelType[];
	type: Nullable<string>;
	variants: VariantType[];
} & DimensionType;

export type CustomerType = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	billing_address_id: Nullable<string>;
	phone: Nullable<string>;
	has_account: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	metadata: Nullable<MetadataType>;
	billing_address: Nullable<BillingAddressType>;
	shipping_addresses: ShippingAddressType[];
	orders: Nullable<[]>;
};

export type ContextType = {
	ip: string;
	user_agent: string;
};

export type ShippingTaxLineType = {
	id: string;
	code: Nullable<string>;
	name: string;
	rate: number;
	shipping_method_id: string;
	created_at: string;
	updated_at: string;
	metadata: Nullable<MetadataType>;
};

export type RequirementType = {
	id: string;
	shipping_option_id: string;
	type: "min_subtotal" | "max_subtotal";
	amount: number;
	deleted_at: Nullable<string>;
	shipping_option: Nullable<ShippingOptionType>;
};

export type ProviderType = {
	id: string;
	is_installed: string;
};

export type ShippingOptionType = {
	id: string;
	name: string;
	region_id: string;
	profile_id: string;
	provider_id: string;
	price_type: "flat_rate" | "calculated";
	amount: Nullable<number>;
	is_return: boolean;
	admin_only: boolean;
	data: unknown;
	price_incl_tax: Nullable<number>;
	tax_amount: Nullable<number>;
	includes_tax: boolean;
	requirements: RequirementType[];
	provider: Nullable<ProviderType>;
	profile: Nullable<ProfileType>;
	region: Nullable<RegionType>;
} & TimestampType;

export type ShippingMethodType = {
	id: string;
	shipping_option_id: string;
	order_id: Nullable<string>;
	claim_order_id: Nullable<string>;
	cart_id: Nullable<string>;
	swap_id: Nullable<string>;
	return_id: Nullable<string>;
	price: number;
	data: unknown;
	tax_total: number;
	total: number;
	subtotal: number;
	includes_tax: boolean;
	tax_lines: ShippingTaxLineType[];
	shipping_option: Nullable<ShippingOptionType>;
	return_order: Nullable<OrderType>;
	swap: Nullable<SwapType>;
	cart: Nullable<CartType>;
	claim_order: Nullable<OrderType>;
	order: Nullable<OrderType>;
};

export type PaymentType = unknown;

export type PaymentSessionType = {
	id: string;
	created_at: string;
	updated_at: string;
	cart_id: string;
	provider_id: string;
	is_selected: boolean;
	is_initiated: boolean;
	status: string;
	data: {
		status: string;
	};
	idempotency_key: Nullable<string>;
	amount: number;
	payment_authorized_at: Nullable<string>;
};

export type GiftCardType = {
	id: string;
	code: string;
	value: number;
	balance: number;
	region_id: string;
	order_id: Nullable<string>;
	is_disabled: boolean;
	ends_at: Nullable<string>;
	tax_rate: Nullable<number>;
	order: Nullable<OrderType>;
	region: Nullable<RegionType>;
};
export type DiscountRuleType = {
	id: string;
	type: "fixed" | "percentage" | "free_shipping";
	description: Nullable<string>;
	value: number;
	allocation: Nullable<"total" | "item">;
	conditions: Array<unknown>;
} & TimestampType;

export type DiscountType = {
	id: string;
	code: string;
	is_dynamic: boolean;
	rule_id: Nullable<string>;
	is_disabled: boolean;
	parent_discount_id: Nullable<string>;
	starts_at: Nullable<string>;
	ends_at: Nullable<string>;
	valid_duration: Nullable<string>;
	usage_limit: Nullable<number>;
	usage_count: number;
	regions: RegionType[];
	parent_discount: Nullable<unknown>;
	rule: Nullable<DiscountRuleType>;
} & TimestampType;

export type CountryType = {
	id: string;
	iso_2: string;
	iso_3: string;
	num_code: string;
	name: string;
	display_name: string;
	region_id: Nullable<string>;
	region: Nullable<RegionType>;
};

export type ProductOptionType = {
	id: string;
	value: string;
} & TimestampType;

export type TaxRateType = {
	id: string;
	rate: Nullable<number>;
	code: Nullable<string>;
	name: string;
	region_id: string;
	shipping_option_count: number;
	product_type_count: number;
	product_type: number;
	shipping_options: ShippingOptionType[];
	product_types: ProductOptionType[];
	products: ProductType[];
} & TimestampType;

export type CurrencyType = {
	code: string;
	symbol: string;
	symbol_native: string;
	name: string;
	includes_tax: boolean;
};

export type RegionType = {
	id: string;
	name: string;
	currency_code: string;
	tax_rate: number;
	tax_code: Nullable<string>;
	gift_cards_taxable: boolean;
	automatic_taxes: boolean;
	tax_provider_id: Nullable<string>;
	includes_tax: boolean;
	fulfillment_providers: ProviderType[];
	tax_provider: Nullable<ProviderType>;
	countries: CountryType[];
	tax_rates: TaxRateType[];
	currency: Nullable<CurrencyType>;
} & TimestampType;

export type AdjustmentType = {
	id: string;
	item_id: string;
	description: string;
	discount_id: Nullable<string>;
	amount: number;
	metadata: Nullable<MetadataType>;
	discount: Nullable<DiscountType>;
	item: Nullable<LineItemType>;
};

export type TaxLineType = {
	id: string;
	code: Nullable<string>;
	name: string;
	rate: number;
	item_id: string;
	item: Nullable<LineItemType>;
} & TimestampType;

export type LineItemType = {
	id: string;
	cart_id: Nullable<string>;
	order_id: Nullable<string>;
	swap_id: Nullable<string>;
	claim_order_id: Nullable<string>;
	original_item_id: Nullable<string>;
	order_edit_id: Nullable<string>;
	title: string;
	description: Nullable<string>;
	thumbnail: Nullable<string>;
	is_return: boolean;
	is_giftcard: boolean;
	should_merge: boolean;
	allow_discounts: boolean;
	has_shipping: Nullable<boolean>;
	unit_price: number;
	variant_id: Nullable<string>;
	quantity: number;
	fulfilled_quantity: number;
	returned_quantity: number;
	shipped_quantity: number;
	includes_tax: boolean;
	gift_card_total: number;
	raw_discount_total: number;
	discount_total: number;
	original_tax_total: number;
	original_total: number;
	total: number;
	tax_total: number;
	subtotal: number;
	refundable: number;
	variant: Nullable<VariantType>;
	order_edit: Nullable<OrderType>;
	adjustments: AdjustmentType[];
	tax_lines: TaxLineType[];
	claim_order: Nullable<OrderType>;
	swap: Nullable<SwapType>;
	order: Nullable<OrderType>;
	cart: Nullable<CartType>;
} & TimestampType;

export type ShippingAddressType = {
	id: string;
	customer_id: Nullable<string>;
	company: Nullable<string>;
	first_name: Nullable<string>;
	last_name: Nullable<string>;
	address_1: Nullable<string>;
	address_2: Nullable<string>;
	city: Nullable<string>;
	country_code: Nullable<string>;
	province: Nullable<string>;
	postal_code: Nullable<string>;
	phone: Nullable<string>;
	country: Nullable<CountryType>;
	customer: Nullable<CustomerType>;
} & TimestampType;

export type BillingAddressType = {
	id: string;
	customer_id: Nullable<string>;
	company: Nullable<string>;
	first_name: Nullable<string>;
	last_name: Nullable<string>;
	address_1: Nullable<string>;
	address_2: Nullable<string>;
	city: Nullable<string>;
	country_code: Nullable<string>;
	province: Nullable<string>;
	postal_code: Nullable<string>;
	phone: Nullable<string>;
	country: Nullable<CountryType>;
	customer: Nullable<CustomerType>;
} & TimestampType;

export type CartType = {
	id: string;
	email: Nullable<string>;
	billing_address_id: Nullable<string>;
	shipping_address_id: Nullable<string>;
	region_id: string;
	customer_id: Nullable<string>;
	payment_session: Nullable<PaymentSessionType>;
	payment_id: Nullable<string>;
	type: "default" | "swap" | "draft_order" | "payment_link" | "clain";
	completed_at: Nullable<string>;
	payment_authorized_at: Nullable<string>;
	idempotency_key: Nullable<string>;
	context: Nullable<ContextType>;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	metadata: Nullable<MetadataType>;
	gift_card_tax_total: number;
	gift_card_total: number;
	refundable_amount: number;
	subtotal: number;
	total: number;
	refunded_total: number;
	tax_total: number;
	shipping_tax_total: number;
	item_tax_total: number;
	raw_discount_total: number;
	discount_total: number;
	shipping_total: number;
	sales_channel_id: Nullable<string>;
	sales_channel: Nullable<SalesChannelType>;
	shipping_methods: ShippingMethodType[];
	payment: Nullable<PaymentType>;
	payment_sessions: PaymentSessionType[];
	customer: Nullable<CustomerType>;
	gift_cards: GiftCardType[];
	discounts: DiscountType[];
	region: Nullable<RegionType>;
	items: LineItemType[];
	shipping_address: Nullable<ShippingAddressType>;
	billing_address: Nullable<BillingAddressType>;
};

export type TimestampType = {
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	metadata: Nullable<MetadataType>;
};

export type ExpandedCollection = {
	collection: CollectionType;
	products: Array<ProductType>;
};

export type OrderStatus =
	| "pending"
	| "completed"
	| "archived"
	| "canceled"
	| "requires_action";

export type FulfillmentStatus =
	| "not_fulfilled"
	| "partially_fulfilled"
	| "fulfilled"
	| "partially_shipped"
	| "shipped"
	| "partially_returned"
	| "returned"
	| "canceled"
	| "requires_action";

export type PaymentStatus =
	| "not_paid"
	| "awaiting"
	| "captured"
	| "partially_refunded"
	| "refunded"
	| "canceled"
	| "requires_action";

export type OrderType = {
	id: string;
	status: OrderStatus;
	fulfillment_status: FulfillmentStatus;
	payment_status: PaymentStatus;
	display_id: number;
	cart_id: Nullable<string>;
	customer_id: string;
	email: string;
	billing_address_id: Nullable<string>;
	shipping_address_id: Nullable<string>;
	region_id: string;
	currency_code: string;
	tax_rate: Nullable<number>;
	draft_order_id: Nullable<string>;
	canceled_at: Nullable<string>;
	no_notification: Nullable<boolean>;
	idempotency_key: Nullable<string>;
	external_id: Nullable<string>;
	created_at: string;
	updated_at: string;
	metadata: Nullable<MetadataType>;
	cart: Nullable<CartType>;
	billing_address: Nullable<BillingAddressType>;
	shipping_address: Nullable<ShippingAddressType>;
	region: Nullable<RegionType>;
	currency: Nullable<CurrencyType>;
	discounts: Array<DiscountType>;
	gift_cards: Array<GiftCardType>;
	shipping_methods: Array<ShippingMethodType>;
	payments: Array<PaymentType>;
	fulfillments: Array<unknown>;
	returns: Array<unknown>;
	claims: Array<unknown>;
	refunds: Array<unknown>;
	swaps: Array<SwapType>;
	draft_order: Nullable<unknown>;
	items: Array<LineItemType>;
	edits: Array<unknown>;
	gift_card_transactions: Array<GiftCardType>;
	sales_channel_id: Nullable<string>;
	sales_channel: Nullable<SalesChannelType>;
	shipping_total: Nullable<number>;
	shipping_tax_total: number;
	raw_discount_total: number;
	discount_total: number;
	tax_total: number;
	items_tax_total: Nullable<number>;
	refunded_total: number;
	total: number;
	subtotal: number;
	paid_total: number;
	refundable_amount: number;
	gift_card_total: number;
	gift_card_tax_total: number;
	returnable_items: Array<LineItemType>;
};

export type SwapType = {
	id: string;
	fulfillment_status: FulfillmentStatus;
	payment_status: PaymentStatus;
	order_id: string;
	difference_due: Nullable<number>;
	shipping_address_id: Nullable<string>;
	cart_id: Nullable<string>;
	confirmed_at: Nullable<string>;
	canceled_at: Nullable<string>;
	no_notification: Nullable<boolean>;
	allow_backorder: boolean;
	idempotency_key: Nullable<string>;
	created_at: string;
	updated_at: string;
	deleted_at: Nullable<string>;
	metadata: Nullable<MetadataType>;
	order: Nullable<OrderType>;
	additional_items: Array<LineItemType>;
	return_order: Nullable<OrderType>;
	fulfillments: Nullable<unknown>;
	payment: Nullable<PaymentType>;
	shipping_address: Nullable<ShippingAddressType>;
	shipping_methods: Array<ShippingMethodType>;
	cart: Nullable<CartType>;
};

export type SearchType = {
	title: string;
	description: string;
	handle: string;
	thumbnail: string;
	id: string;
	variants: Array<VariantType>;
};
