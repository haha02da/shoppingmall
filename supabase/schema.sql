-- 1. 상품 테이블 (shop_products)
CREATE TABLE IF NOT EXISTS shop_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 프로필 테이블 (shop_profiles)
CREATE TABLE IF NOT EXISTS shop_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  address TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 주문 테이블 (shop_orders)
CREATE TABLE IF NOT EXISTS shop_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  total_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 주문 항목 테이블 (shop_order_items)
CREATE TABLE IF NOT EXISTS shop_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES shop_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES shop_products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price_at_purchase NUMERIC NOT NULL
);

-- 초기 상품 데이터 삽입 (예시)
INSERT INTO shop_products (name, description, price, image_url, category)
VALUES 
('프리미엄 후드티', '고품질 면 소재로 제작된 편안한 후드티', 59000, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=687&auto=format&fit=crop', '의류'),
('클래식 스니커즈', '모든 스타일에 어울리는 데일리 스니커즈', 89000, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop', '신발'),
('미니멀리스트 백팩', '깔끔한 디자인의 내구성이 뛰어난 가방', 75000, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=687&auto=format&fit=crop', '액세서리');

-- Row Level Security (RLS) 설정
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_order_items ENABLE ROW LEVEL SECURITY;

-- 정책: 누구나 상품 조회 가능
CREATE POLICY "Public read products" ON shop_products FOR SELECT USING (true);
-- 정책: 사용자는 자신의 주문만 조회 가능
CREATE POLICY "Users read own orders" ON shop_orders FOR SELECT USING (auth.uid() = user_id);
