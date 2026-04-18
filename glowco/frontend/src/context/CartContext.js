import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('glowco_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('glowco_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart & wishlist
  useEffect(() => { localStorage.setItem('glowco_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('glowco_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  // ── Cart ─────────────────────────────────────────────────────────
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === product._id);
      if (existing) return prev.map(i => i._id === product._id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i._id === id ? { ...i, qty } : i));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i._id !== id));
  };

  const clearCart = () => setCart([]);

  const cartTotal     = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount     = cart.reduce((sum, i) => sum + i.qty, 0);

  // ── Wishlist ──────────────────────────────────────────────────────
  const toggleWishlist = (product) => {
    const isIn = wishlist.some(w => w._id === product._id);
    setWishlist(prev => isIn ? prev.filter(w => w._id !== product._id) : [...prev, product]);
    toast(isIn ? 'Removed from wishlist' : '❤️ Saved to wishlist');
  };

  const isWishlisted = (id) => wishlist.some(w => w._id === id);

  return (
    <CartContext.Provider value={{
      cart, wishlist,
      addToCart, updateQty, removeFromCart, clearCart,
      cartTotal, cartCount,
      toggleWishlist, isWishlisted,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
