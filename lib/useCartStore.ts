import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItemData, DUMMY_CART_ITEMS } from "@/lib/dummyData";

interface CartStore {
  items: CartItemData[];
  favorites: number[];
  toast: string;
  addItem: (item: Omit<CartItemData, "id" | "checked">) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  toggleItemCheck: (id: string) => void;
  toggleStoreCheck: (tokoId: number, checked: boolean) => void;
  clearCart: () => void;
  setToast: (msg: string) => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  selectedTotal: () => number;
  selectedCount: () => number;
  selectedStore: () => number | null;
  cartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: DUMMY_CART_ITEMS,
      favorites: [],
      toast: "",

      addItem: (newItem) => {
        const existing = get().items.find(i =>
          i.productId === newItem.productId && i.tokoId === newItem.tokoId && i.varian === newItem.varian
        );
        if (existing) {
          set(s => ({ items: s.items.map(i => i.id === existing.id ? { ...i, qty: i.qty + 1 } : i) }));
        } else {
          set(s => ({ items: [...s.items, { ...newItem, id: "c" + Date.now(), checked: false }] }));
        }
        get().setToast(newItem.nama + " ditambahkan ke keranjang! 🛒");
      },

      removeItem: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),

      changeQty: (id, delta) =>
        set(s => ({ items: s.items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i) })),

      toggleItemCheck: (id) =>
        set(s => ({ items: s.items.map(i => i.id === id ? { ...i, checked: !i.checked } : i) })),

      toggleStoreCheck: (tokoId, checked) =>
        set(s => ({ items: s.items.map(i => i.tokoId === tokoId ? { ...i, checked } : i) })),

      clearCart: () => set({ items: [] }),

      setToast: (msg) => {
        set({ toast: msg });
        setTimeout(() => set({ toast: "" }), 3200);
      },

      toggleFavorite: (productId) =>
        set(s => ({
          favorites: s.favorites.includes(productId)
            ? s.favorites.filter(id => id !== productId)
            : [...s.favorites, productId],
        })),

      isFavorite: (productId) => get().favorites.includes(productId),
      selectedTotal: () => get().items.filter(i => i.checked).reduce((a, i) => a + i.harga * i.qty, 0),
      selectedCount: () => get().items.filter(i => i.checked).reduce((a, i) => a + i.qty, 0),
      selectedStore: () => {
        const checked = get().items.filter(i => i.checked);
        if (!checked.length) return null;
        const ids = [...new Set(checked.map(i => i.tokoId))];
        return ids.length === 1 ? ids[0] : -1;
      },
      cartCount: () => get().items.reduce((a, i) => a + i.qty, 0),
    }),
    { name: "market-kita-cart-v2" }
  )
);