export function formatPrice(price: number) {
  return `₡${price.toLocaleString("es-CR", { maximumFractionDigits: 0 })}`;
}

export function formatArrivalMonth(date: string | null) {
  if (!date) return "Fecha por confirmar";

  const parsedDate = new Date(`${date}T00:00:00`);
  const month = new Intl.DateTimeFormat("es-CR", { month: "long" }).format(parsedDate);

  return `Llega en ${month}`;
}

export function formatAdminDate(date: string | null) {
  if (!date) return "Fecha por confirmar";

  return new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
