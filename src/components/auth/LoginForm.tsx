'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormSchema } from '@/schema/formSchema';
import InputText from '@/components/common/input/Input';
import Password from '@/components/common/input/Password';
import Textarea from '@/components/common/input/Textarea';

/**
 * useForm<LoginFormSchema> 제네릭으로 LoginFormSchema 타입을 넣어줍니다.
 * resolver에 zodResolver(loginSchema)를 넣어줍니다.
 * LoginFormSchema, loginSchema는 form 형태에 따라 커스텀해야합니다.
 *
 * InputText, Password, Textarea 컴포넌트를 사용할 때 name 속성으로 사용합니다.
 */

export default function LoginForm() {
  const {
    control,
    formState: { isValid, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '', // 텍스트 필드 테스트용 속성
      password: '', // 비밀번호 필드 테스트용 속성
      wishContent: '', // 텍스트 에어리어 테스트용 속성
    },
  });

  return (
    <form className="max-w-110 md:w-110 xl:w-130 flex flex-col gap-[30px]">
      <InputText name="email" control={control} />
      <Password name="password" control={control} />
      <Textarea name="wishContent" control={control} />
      <button disabled={!isValid || isSubmitting}>로그인</button>
    </form>
  );
}
