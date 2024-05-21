export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-NG").format(new Date(value));
}

export function formatCountryCode(value): string {
  const { zipcode, name } = value;
  return `(${zipcode}) - ${name}`;
}
