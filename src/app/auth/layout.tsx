import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
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
