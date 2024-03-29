export default function dateTimeFormatter(dateTime, options) {
  const date = new Date(dateTime);
  return date.toLocaleString(undefined, options);
}
