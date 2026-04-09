// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  return phoneRegex.test(phone);
};

// Postal code validation (basic)
export const isValidPostalCode = (code: string): boolean => {
  return code.trim().length >= 2 && code.trim().length <= 10;
};

// Cart validation
export const isValidCartItem = (quantity: number, stock: number): boolean => {
  return quantity > 0 && quantity <= stock;
};

// Order validation
export const isValidOrder = (email: string, phone: string, address: string): boolean => {
  return isValidEmail(email) && isValidPhone(phone) && address.trim().length > 5;
};
