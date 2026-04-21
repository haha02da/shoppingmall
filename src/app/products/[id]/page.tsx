'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import styles from './product-detail.module.css';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('shop_products')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) {
          console.error('Error fetching product:', error);
          setError(error.message);
        } else {
          setProduct({
            ...data,
            imageUrl: data.image_url // Mapping snake_case from DB to camelCase expected by component
          });
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error || !product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className={styles.container}>
      <Link href="/products" className={styles.backLink}>
        &larr; Back to all products
      </Link>
      
      <div className={styles.grid}>
        <div className={styles.imageSection}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={styles.image}
          />
        </div>
        
        <div className={styles.infoSection}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>{formattedPrice}</p>
          <div className={styles.description}>
            <p>{product.description}</p>
          </div>
          
          <div className={styles.actionArea}>
            <button 
              className={styles.addToCartBtn}
              onClick={() => {
                addToCart(product);
                alert('Added to cart!');
              }}
            >
              Add to Cart
            </button>
            <div className={styles.stockInfo}>
              Availability: <span className={styles.stockCount}>{product.stock} in stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
