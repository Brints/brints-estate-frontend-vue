export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-NG").format(new Date(value));
}

export function formatCountryCode(value: any): string {
  const { zipcode, name, flag, code } = value;
  return `${flag} (${zipcode}) ${name} - ${code}`;
}
