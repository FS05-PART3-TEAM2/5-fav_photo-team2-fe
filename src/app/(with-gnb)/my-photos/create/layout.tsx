export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-4 md:px-5 xl:px-55">
      <div className="hidden md:flex md:flex-col md:gap-5">
        <h1 className="font-BR-B font-normal xl:text-6xl md:text-5xl">포토카드 생성</h1>
        <hr className="border-t-2 border-gray-100" />
      </div>
      <div className="px-4 py-20 flex flex-col items-center justify-center">{children}</div>
    </section>
  );
}
