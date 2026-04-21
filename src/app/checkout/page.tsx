'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import styles from './checkout.module.css';
import { OrderStatus } from '@/types/order';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit_card',
  });

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setFormData(prev => ({
          ...prev,
          email: user.email || '',
        }));
      }
    }
    getUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 1. Create order in shop_orders
      const { data: orderData, error: orderError } = await supabase
        .from('shop_orders')
        .insert({
          user_id: user?.id || null,
          total_price: totalPrice,
          status: 'completed',
          shipping_address: formData.address,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items in shop_order_items
      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('shop_order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      console.log('Order submitted successfully to Supabase');
      setIsCompleted(true);
      clearCart();
    } catch (err: any) {
      console.error('Error during checkout:', err);
      setError(err.message || 'An error occurred during checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (isCompleted) {
    return (
      <div className={styles.container}>
        <div className={styles.successState}>
          <span className={styles.successIcon}>🎉</span>
          <h1 className={styles.successTitle}>Purchase Completed!</h1>
          <p className={styles.successMsg}>
            Thank you for your order. We've sent a confirmation email to {formData.email}.
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/products" className={styles.homeLink}>
              Continue Shopping
            </Link>
            <Link href="/orders" className={styles.homeLink} style={{ backgroundColor: '#4a5568' }}>
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles.successState}>
          <p>Your cart is empty. Please add items before checking out.</p>
          <Link href="/products" className={styles.homeLink}>
            Go to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      
      {error && (
        <div style={{ backgroundColor: '#fed7d7', color: '#c53030', padding: '1rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit}>
            <h2 className={styles.summaryTitle}>Shipping Information</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input} 
                required 
                placeholder="John Doe"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input} 
                required 
                placeholder="john@example.com"
                disabled={!!user}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Shipping Address</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={styles.input} 
                required 
                placeholder="123 Street, City, Country"
              />
            </div>
            
            <h2 className={styles.summaryTitle} style={{ marginTop: '2rem' }}>Payment Method</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Choose Payment</label>
              <select 
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="credit_card">Credit Card (Mock)</option>
                <option value="paypal">PayPal (Mock)</option>
                <option value="bank_transfer">Bank Transfer (Mock)</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className={styles.completeBtn}
              disabled={isSubmitting || !formData.name || !formData.email || !formData.address}
            >
              {isSubmitting ? 'Processing...' : 'Complete Purchase'}
            </button>
          </form>
        </div>
        
        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className={styles.summaryRow}>
              <span>{item.name} (x{item.quantity})</span>
              <span>{formattedPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>{formattedPrice(totalPrice)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
