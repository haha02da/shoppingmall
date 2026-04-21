'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import './AuthStatus.css';

const AuthStatus = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (loading) return null;

  return (
    <div className="auth-status">
      {user ? (
        <>
          <span className="user-name">
            {user.user_metadata?.full_name || user.email}님
          </span>
          <button onClick={handleLogout} className="auth-button logout-btn">
            로그아웃
          </button>
        </>
      ) : (
        <a href="/login" className="auth-button login-btn">
          로그인
        </a>
      )}
    </div>
  );
};

export default AuthStatus;
