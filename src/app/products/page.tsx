import React from 'react';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import styles from './products.module.css';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('shop_products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Error</h1>
        <p>Could not load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>All Products</h1>
        <p className={styles.subtitle}>Explore our curated collection of premium goods.</p>
      </header>
      
      {products && products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={{
              ...product,
              imageUrl: product.image_url // Mapping snake_case from DB to camelCase expected by component
            }} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
}
