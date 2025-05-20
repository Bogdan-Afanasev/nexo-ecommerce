import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pluralizeTovarPhrase(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  let noun: string;
  if (mod10 === 1 && mod100 !== 11) {
    noun = "товар";
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    noun = "товара";
  } else {
    noun = "товаров";
  }

  const verb = mod10 === 1 && mod100 !== 11 ? "остался" : "осталось";

  return `${verb} ${count} ${noun}`;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  })
    .format(price)
    .replace(",", ".");
};
