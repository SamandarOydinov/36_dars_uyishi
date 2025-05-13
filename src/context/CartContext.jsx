// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Error parsing cart items from localStorage:', error);
      return [];
    }
  });
  const [newItemAdded, setNewItemAdded] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // product bu MainDetails dan kelgan productToAdd obyekti
    console.log('CartContext: addToCart called with product:', product); // Kelgan productni log qilish

    setCartItems((prevItems) => {
      const itemExists = prevItems.find(
        (item) =>
          item.id === product.productId &&
          item.size === product.size &&
          item.color === product.color,
      );

      if (itemExists) {
        toast.info(
          `${product.title} (Size: ${product.size}, Color: ${
            product.color || 'N/A'
          }) - sizning savatingizda mavjud va qiymati o'zgardi`,
        );
        return prevItems.map((item) =>
          item.id === product.productId &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        );
      } else {
        toast.success(
          `${product.title} (Size: ${product.size}, Color: ${
            product.color || 'N/A'
          }) - qo'shilgan!`,
        );

        // Rasm URLini aniqlash
        let imageUrl = 'https://via.placeholder.com/150?text=No+Image'; // Default placeholder

        // `product.images` massivini tekshirish (MainDetails dan keladi)
        if (
          product.images &&
          Array.isArray(product.images) &&
          product.images.length > 0
        ) {
          imageUrl = product.images[0]; // Birinchi rasmni olamiz
        }
        // Agar `product.images` bo'lmasa yoki bo'sh bo'lsa, lekin `product.image` (string) bo'lsa (ba'zi API lar shunday qaytaradi)
        else if (product.image && typeof product.image === 'string') {
          imageUrl = product.image;
        }
        console.log(
          'CartContext: Image URL being saved to cart item:',
          imageUrl,
        );

        return [
          ...prevItems,
          {
            id: product.productId,
            title: product.title,
            price: product.price,
            image: imageUrl, // Aniqlangan rasm URLini saqlash
            color: product.color,
            size: product.size,
            quantity: product.quantity,
          },
        ];
      }
    });
    setNewItemAdded(true);
    setTimeout(() => setNewItemAdded(false), 3000);
  };

  const removeFromCart = (productId, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === productId &&
            item.size === size &&
            item.color === color
          ),
      ),
    );
    toast.error(`siz ${productId} o'chirib tashladingiz`);
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info(`Savat to'liq tozalandi`);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0), // Narx va son mavjudligini tekshirish
      0,
    );
  };

  const totalCartItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 0), // Son mavjudligini tekshirish
    0,
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    totalCartItems,
    newItemAdded,
    setNewItemAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
