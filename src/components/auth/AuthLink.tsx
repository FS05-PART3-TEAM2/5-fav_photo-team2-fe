import Link from "next/link";

interface AuthLinkProps {
  type: "login" | "signup";
}

export default function AuthLink({ type }: AuthLinkProps) {
  return (
    <p className="font-normal text-sm xl:text-base flex gap-2">
      {type === "signup" ? "최애의 포토가 처음이신가요?" : "이미 계정이 있으신가요?"}
      <Link
        href={type === "signup" ? "/auth/signup" : "/auth/login"}
        className="text-main hover:underline"
      >
        {type === "signup" ? "회원가입하기" : "로그인하기"}
      </Link>
    </p>
  );
}
