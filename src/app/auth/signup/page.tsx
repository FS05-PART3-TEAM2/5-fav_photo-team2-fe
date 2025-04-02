import AuthLink from "@/components/auth/AuthLink";
import SignupForm from "@/components/auth/SignupForm";

export default function Page() {
  return (
    <>
      <SignupForm />
      <AuthLink type="login" />
    </>
  );
}
