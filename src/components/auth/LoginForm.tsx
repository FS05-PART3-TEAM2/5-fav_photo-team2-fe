'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormSchema } from '@/schema/formSchema';
import InputText from '@/components/common/input/Input';
import Password from '@/components/common/input/Password';
import Textarea from '../common/input/Textarea';
import Search from '../common/input/Search';
import { useState } from 'react';

export default function LoginForm() {
  const {
    control,
    formState: { isValid, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      wishContent: '',
    },
  });
  const [keyword, setKeyword] = useState('');

  return (
    <form className="max-w-110 md:w-110 xl:w-130 flex flex-col gap-[30px]">
      <InputText name="email" control={control} />
      <Password name="password" control={control} />
      <Textarea name="wishContent" control={control} />
      <Search onSearch={setKeyword} />
      keyword: {keyword}
      <button disabled={!isValid || isSubmitting}>로그인</button>
    </form>
  );
}
