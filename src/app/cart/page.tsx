'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './cart.module.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Your Cart</h1>
        <div className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <Link href="/products" className={styles.shopLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart ({totalItems} items)</h1>
      
      <div className={styles.cartGrid}>
        <div className={styles.cartList}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>{formattedPrice(item.price)}</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
              
              <div className={styles.quantityControl}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className={styles.quantityBtn}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className={styles.quantityBtn}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formattedPrice(totalPrice)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>{formattedPrice(totalPrice)}</span>
          </div>
          
          <Link href="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>
          
          <Link href="/products" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--secondary)', textDecoration: 'none' }}>
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
