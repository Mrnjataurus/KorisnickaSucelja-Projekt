export function formatCategory(category: string) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatRating(rating: number) {
  return rating.toFixed(1)
}
