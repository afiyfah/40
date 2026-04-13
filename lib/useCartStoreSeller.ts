import { create } from 'zustand';
import { Order, dummyOrders } from './seller';

interface CartItem {
  id: number;
  nama: string;
  harga: number;
  qty: number;
  diskon: number;
  catatan: string;
}

interface AppStore {
  // Store status
  tokoOpen: boolean;
  toggleToko: () => void;

  // Orders (home kanban)
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  terimaOrder: (id: string) => void;
  tolakOrder: (id: string) => void;

  // Cart (kasir)
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  diskonKeranjang: number;
  setDiskonKeranjang: (v: number) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  tokoOpen: true,
  toggleToko: () => set(s => ({ tokoOpen: !s.tokoOpen })),

  orders: dummyOrders,
  setOrders: (orders) => set({ orders }),
  terimaOrder: (id) => set(s => ({
    orders: s.orders.map(o => o.id === id ? { ...o, col: 'p' as const, waktu: 15 * 60 } : o)
  })),
  tolakOrder: (id) => set(s => ({
    orders: s.orders.filter(o => o.id !== id)
  })),

  cart: [],
  addToCart: (item) => set(s => {
    const idx = s.cart.findIndex(c => c.id === item.id);
    if (idx >= 0) {
      const cart = [...s.cart];
      cart[idx] = item;
      return { cart };
    }
    return { cart: [...s.cart, item] };
  }),
  removeFromCart: (id) => set(s => ({ cart: s.cart.filter(c => c.id !== id) })),
  clearCart: () => set({ cart: [] }),
  diskonKeranjang: 0,
  setDiskonKeranjang: (v) => set({ diskonKeranjang: v }),
}));