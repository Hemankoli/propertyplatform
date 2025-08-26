export function formatPrice(price) {
  if (price >= 10000000) {
    // 1 Crore = 1,00,00,000
    return (price / 10000000)?.toFixed(2)?.replace(/\.00$/, '') + " Cr";
  } else if (price >= 100000) {
    // 1 Lakh = 1,00,000
    return (price / 100000)?.toFixed(2)?.replace(/\.00$/, '') + " Lakh";
  } else if (price >= 1000) {
    // Optional: format thousands
    return (price / 1000)?.toFixed(2)?.replace(/\.00$/, '') + " K";
  } else {
    return price?.toString();
  }
}