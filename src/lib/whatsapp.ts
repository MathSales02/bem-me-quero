import { CartItemWithProduct } from '@/types/product';
import { formatPrice, calculateSubtotal, calculateTotal } from './format';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function getWhatsAppNumber(): string | null {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.trim() === '') {
    return null;
  }
  // Remove any non-digit characters
  const cleaned = WHATSAPP_NUMBER.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    return null;
  }
  return cleaned;
}

export function isWhatsAppConfigured(): boolean {
  return getWhatsAppNumber() !== null;
}

export function buildOrderMessage(items: CartItemWithProduct[]): string {
  if (items.length === 0) return '';

  const lines: string[] = [
    'Olá! Quero fazer um pedido na Bem Me Quero.',
    '',
    '*Meu pedido:*',
    '',
  ];

  items.forEach((item, index) => {
    const subtotal = calculateSubtotal(item.product.priceInCents, item.quantity);
    lines.push(`${index + 1}. ${item.product.name}`);
    lines.push(`   Quantidade: ${item.quantity}`);
    lines.push(`   Preço unitário: ${formatPrice(item.product.priceInCents)}`);
    lines.push(`   Subtotal: ${formatPrice(subtotal)}`);
    
    if (item.selectedVariations) {
      const variations = Object.entries(item.selectedVariations)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      if (variations) {
        lines.push(`   Variações: ${variations}`);
      }
    }
    
    lines.push('');
  });

  const totalItems = items.map(item => ({
    priceInCents: item.product.priceInCents,
    quantity: item.quantity,
  }));
  const total = calculateTotal(totalItems);

  lines.push(`*Total dos produtos: ${formatPrice(total)}*`);
  lines.push('');
  lines.push('Gostaria de confirmar a disponibilidade e combinar os próximos passos.');

  return lines.join('\n');
}

export function buildWhatsAppUrl(items: CartItemWithProduct[]): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const message = buildOrderMessage(items);
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${number}?text=${encodedMessage}`;
}
