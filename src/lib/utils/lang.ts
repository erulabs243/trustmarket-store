export const setCurrency = (amount: number): number => amount / 100;

export const displayCurrency = (amount: number): string =>
	setCurrency(amount).toLocaleString("fr-FR", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	});
