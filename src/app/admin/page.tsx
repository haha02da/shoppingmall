'use client';

import React, { useEffect, useState } from 'react';
import { Order } from '@/types/order';
import { mockProducts } from '@/lib/mockData';
import styles from './admin.module.css';

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrdersString = localStorage.getItem('orders');
    if (savedOrdersString) {
      const parsedOrders: Order[] = JSON.parse(savedOrdersString);
      setOrders(parsedOrders);
      
      const sales = parsedOrders.reduce((acc, order) => acc + order.totalPrice, 0);
      setTotalSales(sales);
    }
    setLoading(false);
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
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (loading) return <div className={styles.container}>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>관리자 대시보드</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>총 매출액</h3>
          <p className={styles.statValue}>{formattedPrice(totalSales)}</p>
        </div>
        <div className={styles.statCard}>
          <h3>총 주문수</h3>
          <p className={styles.statValue}>{orders.length}건</p>
        </div>
        <div className={styles.statCard}>
          <h3>등록 상품수</h3>
          <p className={styles.statValue}>{mockProducts.length}개</p>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>최근 주문 목록</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>주문ID</th>
                <th>고객명</th>
                <th>날짜</th>
                <th>금액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>주문 내역이 없습니다.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{formattedPrice(order.totalPrice)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>상품 관리 (Mock)</h2>
          <button className={styles.addBtn}>상품 추가</button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>상품명</th>
                <th>카테고리</th>
                <th>가격</th>
                <th>재고</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{formattedPrice(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn}>수정</button>
                      <button className={styles.deleteBtn}>삭제</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
