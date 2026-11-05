/**
 * Indian Number Formatting and Currency Utilities
 */

export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  // Formats according to Indian numbering system (lakhs, crores)
  return '₹' + amount.toLocaleString('en-IN');
}

export function calculateDiscount(mrp: number, price: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
