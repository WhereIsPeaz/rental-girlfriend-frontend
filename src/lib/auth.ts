/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/prefer-nullish-coalescing */
// Token management utilities for JWT authentication

const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Get the JWT token from localStorage
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Save the JWT token to localStorage
 */
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Remove the JWT token from localStorage
 */
export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Check if token is valid (basic check, not cryptographic)
 * For a more robust check, you would decode and verify expiration
 */
export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    // Basic JWT structure check: should have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    // Decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]!));
    
    // Check if token has expiration and if it's still valid
    if (payload.exp) {
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    }

    // If no expiration, consider it valid if it has the right structure
    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

/**
 * Get user ID from token
 */
export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]!));
    return payload.id || null;
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    return null;
  }
};

