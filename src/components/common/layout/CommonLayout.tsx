import Header from "@/components/gnb/Header";
import { ReactNode } from "react";

// 로그인/회원가입 페이지 제외 모든 필요한 페이지에서 사용
export const CommonLayout = ({ children }: { children: ReactNode }) => {
  const styles = {
    wrapper: "flex flex-col min-h-screen bg-dark",
    main: "flex flex-1 flex-col items-center w-[100%]",
    content: "max-w-[1520px] w-[100%] overflow-x-auto mx-auto px-[15px] md:px-[20px]",
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        {/* XXX: 한샘님 헤더 완성되면 여기에 넣어주시면 됩니다! */}
        <Header />
        {/* <Header /> */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
