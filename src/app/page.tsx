export default function HomePage() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="container hero-content">
          <h2 className="hero-title">당신을 위한 완벽한 쇼핑 경험</h2>
          <p className="hero-description">
            엄선된 프리미엄 제품 컬렉션을 빠르고 스타일리시하게 만나보세요.
            최고를 추구하는 현대적인 쇼퍼들을 위해 만들어졌습니다.
          </p>
          <div className="hero-actions">
            <a href="/products" className="btn-primary">지금 쇼핑하기</a>
            <a href="/about" className="btn-secondary">더 알아보기</a>
          </div>
        </div>
      </section>

      <section className="featured container">
        <h3 className="section-title">추천 상품</h3>
        <div className="product-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="product-card">
              <div className="product-image-placeholder"></div>
              <div className="product-info">
                <span className="product-category">카테고리</span>
                <h4 className="product-name">프리미엄 상품 {i}</h4>
                <p className="product-price">₩99,000</p>
                <button className="add-to-cart">장바구니 담기</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .home-container {
          padding-bottom: 4rem;
        }
        .hero {
          background: #f8fafc;
          padding: 6rem 0;
          text-align: center;
          margin-bottom: 4rem;
        }
        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--foreground);
        }
        .hero-description {
          font-size: 1.25rem;
          color: var(--secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 0.875rem 2rem;
          border-radius: var(--radius);
          font-weight: 600;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: var(--primary-hover);
        }
        .btn-secondary {
          background: white;
          color: var(--foreground);
          padding: 0.875rem 2rem;
          border-radius: var(--radius);
          font-weight: 600;
          border: 1px solid var(--border);
          transition: border-color 0.2s;
        }
        .btn-secondary:hover {
          border-color: var(--secondary);
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
        .product-card {
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .product-image-placeholder {
          aspect-ratio: 1/1;
          background: #e2e8f0;
        }
        .product-info {
          padding: 1.5rem;
        }
        .product-category {
          font-size: 0.75rem;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.5rem;
        }
        .product-name {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .product-price {
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1.25rem;
        }
        .add-to-cart {
          width: 100%;
          background: var(--muted);
          color: var(--foreground);
          padding: 0.75rem;
          border-radius: var(--radius);
          font-weight: 600;
          transition: background 0.2s;
        }
        .add-to-cart:hover {
          background: #e2e8f0;
        }
      `}</style>
    </div>
  );
}
