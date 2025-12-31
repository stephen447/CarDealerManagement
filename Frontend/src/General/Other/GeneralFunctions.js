export function formatNumberToPrice(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDateString(dateString) {
  return new Date(dateString).toLocaleDateString("en-IE");
}
