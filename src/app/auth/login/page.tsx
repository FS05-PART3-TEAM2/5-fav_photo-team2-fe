'use client';

import LoginForm from '@/components/auth/LoginForm';
import Search from '@/components/input/Search';
import { useState } from 'react';

export default function Page() {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <Search onSearch={setKeyword} />
      <LoginForm />
      <p>검색어: {keyword}</p>
    </>
  );
}
