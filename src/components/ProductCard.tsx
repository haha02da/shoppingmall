import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, imageUrl, category } = product;
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <Link href={`/products/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={name} 
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{formattedPrice}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
