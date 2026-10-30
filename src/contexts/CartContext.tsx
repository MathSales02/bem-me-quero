'use client';

import React, { createContext, useContext, useCallback, useEffect, useReducer } from 'react';
import { CartItem, CartItemWithProduct, Product } from '@/types/product';
import { getProductById } from '@/data/products';
import { calculateSubtotal, calculateTotal } from '@/lib/format';

// ─── State ───────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isHydrated: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  isHydrated: false,
};

// ─── Actions ─────────────────────────────────────────────────────────────────

type CartAction =
  | { type: 'HYDRATE'; items: CartItem[] }
  | { type: 'ADD_ITEM'; productId: string; quantity: number; selectedVariations?: Record<string, string> }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, items: action.items, isHydrated: true };

    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.productId
      );
      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + action.quantity,
        };
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: action.productId,
            quantity: action.quantity,
            selectedVariations: action.selectedVariations,
          },
        ],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.productId),
      };

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.productId !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'OPEN_CART':
      return { ...state, isOpen: true };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  itemsWithProducts: CartItemWithProduct[];
  itemCount: number;
  totalInCents: number;
  isOpen: boolean;
  isHydrated: boolean;
  addItem: (productId: string, quantity?: number, variations?: Record<string, string>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'bemMeQuero_cart';

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage may be full or unavailable
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    const stored = loadCartFromStorage();
    dispatch({ type: 'HYDRATE', items: stored });
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    if (state.isHydrated) {
      saveCartToStorage(state.items);
    }
  }, [state.items, state.isHydrated]);

  const itemsWithProducts: CartItemWithProduct[] = state.items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((item): item is CartItemWithProduct => item !== null);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const totalInCents = calculateTotal(
    itemsWithProducts.map((item) => ({
      priceInCents: item.product.priceInCents,
      quantity: item.quantity,
    }))
  );

  const addItem = useCallback(
    (productId: string, quantity = 1, selectedVariations?: Record<string, string>) => {
      dispatch({ type: 'ADD_ITEM', productId, quantity, selectedVariations });
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemsWithProducts,
        itemCount,
        totalInCents,
        isOpen: state.isOpen,
        isHydrated: state.isHydrated,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
