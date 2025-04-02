import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-4 py-20 flex flex-col items-center justify-center text-center">
      <Link href="/">
        <Image
          src="/assets/icons/logo.png"
          alt="최애의 포토"
          width={330}
          height={60}
          priority
          className="w-[190px] h-[35px] md:w-[330px] md:h-[60px] mb-20"
        />
      </Link>
      {children}
    </section>
  );
}
