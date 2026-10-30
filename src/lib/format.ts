/**
 * Format a price in cents to BRL currency string.
 * Uses Intl.NumberFormat for proper locale formatting.
 */
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents / 100);
}

/**
 * Calculate subtotal for a cart item (price * quantity).
 * Returns value in cents.
 */
export function calculateSubtotal(priceInCents: number, quantity: number): number {
  return priceInCents * quantity;
}

/**
 * Calculate total of all items in cents.
 */
export function calculateTotal(items: Array<{ priceInCents: number; quantity: number }>): number {
  return items.reduce((total, item) => total + calculateSubtotal(item.priceInCents, item.quantity), 0);
}

/**
 * Format a plain price in cents to a string without currency symbol.
 * Useful for WhatsApp messages where we add the symbol manually.
 */
export function formatPricePlain(priceInCents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInCents / 100);
}
