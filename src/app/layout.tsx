import type { Metadata } from 'next';
import '../styles/globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: '쇼핑몰 - 프리미엄 이커머스',
  description: 'Next.js와 Supabase로 구축된 확장 가능하고 아름다운 기능성 이커머스 플랫폼입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <CartProvider>
          <header className="main-header">
            <div className="container header-content">
              <h1 className="logo">ShoppingMall</h1>
              <nav className="main-nav">
                <a href="/">홈</a>
                <a href="/products">상품</a>
                <a href="/cart">장바구니</a>
                <a href="/orders">주문내역</a>
                <a href="/admin">관리자</a>
                <a href="/mypage" className="login-btn">마이페이지</a>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="main-footer">
            <div className="container">
              <p>&copy; 2026 쇼핑몰. 모든 권리 보유.</p>
            </div>
          </footer>
        </CartProvider>
        <style>{`
          .main-header {
            background: #fff;
            border-bottom: 1px solid var(--border);
            padding: 1.25rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
          }
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary);
            letter-spacing: -0.05em;
          }
          .main-nav {
            display: flex;
            gap: 1.5rem;
            align-items: center;
          }
          .main-nav a {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--secondary);
            transition: color 0.2s;
          }
          .main-nav a:hover {
            color: var(--primary);
          }
          .login-btn {
            background: var(--primary);
            color: #fff !important;
            padding: 0.5rem 1rem;
            border-radius: var(--radius);
          }
          .main-footer {
            margin-top: 4rem;
            padding: 2rem 0;
            border-top: 1px solid var(--border);
            text-align: center;
            color: var(--secondary);
            font-size: 0.875rem;
          }
        `}</style>
      </body>
    </html>
  );
}
