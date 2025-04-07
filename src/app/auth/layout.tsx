import Link from "next/link";
// import { cookies } from "next/headers";
// import { getCookie } from "cookies-next";
// import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const token = getCookie("token", { cookies }); // 쿠키에서 토큰 가져오기

  // if (token) {
  //   redirect("/"); // 토큰이 있는 경우 홈으로 리다이렉트
  // }

  return (
    <section className="px-4 py-20 flex flex-col items-center justify-center text-center">
      <Link href="/">
        <h1 className="font-BR-B text-5xl md:text-7xl mb-20">
          최애<span className="text-main">의</span>포토
        </h1>
      </Link>
      {children}
    </section>
  );
}
