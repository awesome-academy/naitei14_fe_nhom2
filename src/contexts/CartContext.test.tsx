import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CartProvider, useCart } from './CartContext';

//Mock LocalStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CartContext Logic (Unit Test)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  const productA = { id: 1, name: 'Sản phẩm A', price: 100000, image: 'a.jpg' };
  const productB = { id: 2, name: 'Sản phẩm B', price: 200000, image: 'b.jpg' };

  it('SHOULD start with empty cart and total price = 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
  });

  it('SHOULD add new product successfully and calculate correct price', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(productA, 2);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
    expect(result.current.totalPrice).toBe(200000); 
  });

  it('SHOULD accumulate quantity if adding existing product', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(productA, 1);
    });

    act(() => {
      result.current.addToCart(productA, 3);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(4);
    expect(result.current.totalPrice).toBe(400000);
  });

  it('SHOULD update quantity correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(productA, 1);
      result.current.updateQuantity(productA.id, 10);
    });

    expect(result.current.cart[0].quantity).toBe(10);
    expect(result.current.totalPrice).toBe(1000000);
  });

  it('SHOULD remove product from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(productA);
      result.current.addToCart(productB);
    });

    act(() => {
      result.current.removeFromCart(productA.id);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe(productB.id);
    expect(result.current.totalPrice).toBe(200000);
  });

  it('SHOULD clear cart completely', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(productA);
      result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
  });

  it('SHOULD automatically load cart from LocalStorage on refresh', () => {
    const oldCart = JSON.stringify([{ ...productA, quantity: 5 }]);
    window.localStorage.setItem('cart_storage', oldCart);

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(5);
    expect(result.current.totalPrice).toBe(500000);
  });
});
