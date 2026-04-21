'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './orders.module.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchOrders() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from('shop_orders')
          .select(`
            *,
            shop_order_items (
              *,
              shop_products (*)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
        } else {
          setOrders(data || []);
        }
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className={styles.container}>로딩 중...</div>;
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>내 주문 내역</h1>
        <div className={styles.emptyState}>
          <p>주문 내역을 확인하려면 로그인이 필요합니다.</p>
          <Link href="/login" className={styles.homeLink}>
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>내 주문 내역</h1>
      
      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <p>아직 주문 내역이 없습니다.</p>
          <Link href="/products" className={styles.homeLink}>
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <span className={styles.orderId}>주문번호: {order.id.substring(0, 8).toUpperCase()}</span>
                  <span className={styles.orderDate}>{formatDate(order.created_at)}</span>
                </div>
                <span className={`${styles.status} ${styles[order.status.toLowerCase()] || ''}`}>
                  {order.status}
                </span>
              </div>
              
              <div className={styles.orderItems}>
                {order.shop_order_items.map((item: any) => (
                  <div key={item.id} className={styles.item}>
                    <span>{item.shop_products?.name || 'Unknown Product'} (x{item.quantity})</span>
                    <span>{formattedPrice(item.price_at_purchase * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className={styles.orderFooter}>
                <span className={styles.totalLabel}>총 결제금액</span>
                <span className={styles.totalPrice}>{formattedPrice(order.total_price)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
