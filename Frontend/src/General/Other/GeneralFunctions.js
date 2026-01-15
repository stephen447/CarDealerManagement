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
export function formatRegistration(registration) {
  //e.g. 131-d123 -> 131-D-123, 12MH-1222 -> 12-MH-1222
  return registration
    .replace(/([0-9])([a-zA-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])([0-9])/g, "$1-$2");
}
