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
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
