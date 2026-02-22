// Shared utility helpers

/**
 * Format a number as Indian Rupees.
 */
export function formatCurrency(amount: number): string {
    const hasFraction = amount % 1 !== 0;
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: hasFraction ? 2 : 0,
        maximumFractionDigits: hasFraction ? 2 : 0,
    }).format(amount);
}

/**
 * Calculate delivery charge. Free above ₹499.
 */
export function getDeliveryCharge(subtotal: number): number {
    if (subtotal >= 499) return 0;
    if (subtotal >= 299) return 30;
    return 50;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Slugify a string.
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

/**
 * Truncate a string to a max length.
 */
export function truncate(text: string, max: number): string {
    return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}
