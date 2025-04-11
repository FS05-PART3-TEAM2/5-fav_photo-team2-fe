export const buildMarketCountUrl = (
  {
    grade,
    genre,
    isSoldOut,
  }: {
    grade?: string;
    genre?: string;
    isSoldOut?: string;
  },
  basePath: string = "/market/count" // 기본값으로 설정
) => {
  const params = new URLSearchParams();

  if (grade) params.append("grade", grade);
  if (genre) params.append("genre", genre);
  if (isSoldOut && isSoldOut !== "default") {
    params.append("status", isSoldOut);
  }

  return `${basePath}${params.toString() ? `?${params.toString()}` : ""}`;
};
