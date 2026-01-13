export function formatNumberToPrice(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDateString(dateString) {
  return new Date(dateString).toLocaleDateString("en-IE");
}

export function formatNumberToMileage(value) {
  return new Intl.NumberFormat("en-IE").format(value);
}

export function formatDateStringToDateInput(dateString) {
  return new Date(dateString).toISOString().split("T")[0];
}

export function convertScreamingSnakeToDisplayCase(string) {
  return string
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
