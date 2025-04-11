import AuthLink from "@/components/auth/AuthLink";
import LoginForm from "@/components/auth/LoginForm";

export default function Page() {
  return (
    <>
      <LoginForm />
      <AuthLink type="signup" />
    </>
  );
}
