
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'; 
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { Breadcrumbs, Button } from '../../components'; 
import './Cart.scss'; 
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0); 
  const deliveryFee = 15.0;

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === 'FORSALE') {
      setDiscountPercent(20);
      toast.success(`Sizning promo kodingiz "FORSALE" muvaffaqiyatli o'tdi!`);
    } else {
      setDiscountPercent(0);
      toast.error(`Siz kiritgan promo kod topilmadi.`);
    }
  };

  const subtotal = getCartTotal();
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount + deliveryFee;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' },
  ];

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container cart-page empty-cart">
        <Breadcrumbs items={breadcrumbItems} />
        <h2>YOUR CART IS EMPTY</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="continue-shopping-btn">
          <Button type="primary" size="large">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="cart-page__title">YOUR CART</h1>
      <div className="cart-page__content">
        <div className="cart-page__items">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color || 'default'}`}
              className="cart-item"
            >
              <div className="cart-item__image">
                <img
                  src={
                    item.image ||
                    'https://via.placeholder.com/100?text=No+Image'
                  }
                  alt={item.title || 'Product Image'}
                />
              </div>
              <div className="cart-item__details">
                <h3 className="details__title">
                  {item.title || 'Product Name'}
                </h3>
                {item.size && (
                  <p className="details__info">Size: {item.size}</p>
                )}
                {item.color && (
                  <p className="details__info">Color: {item.color}</p>
                )}
                <div className="cart-item__total-price">
                  ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>
              <div className="cart-item__needed-buttons">
                <div className='cart-item__delete-button'>
                  <button
                    className="cart-item__remove-btn"
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    aria-label="Remove item"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
                <div className="cart-item__quantity">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.size,
                        item.color,
                        item.quantity - 1,
                      )
                    }
                    disabled={(item.quantity || 1) <= 1}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.size,
                        item.color,
                        item.quantity + 1,
                      )
                    }
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="clear-cart-container">
            <Button
              type="secondary"
              size="medium"
              onClick={clearCart}
              className="clear-cart-btn-actual"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="cart-page__summary">
          <h2 className="summary__title">Order Summary</h2>
          <div className="summary__item">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discountPercent > 0 && (
            <div className="summary__item discount">
              <span>Discount ({discountPercent}%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary__item">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <hr className="summary__divider" />
          <div className="summary__item total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary__promo-code">
            <input
              type="text"
              placeholder="Add promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button type="primary" onClick={handleApplyPromoCode}>
              Apply
            </Button>
          </div>
          <Link to="/checkout" className="summary__checkout-btn-link">
            {' '}
            {/* Klass nomi o'zgartirildi */}
            <Button type="primary" size="large">
              Go to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
