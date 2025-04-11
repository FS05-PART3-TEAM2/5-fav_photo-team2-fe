export const CircularProgress = () => {
  return (
    // FIXME: 로딩스피너 못생겨서 수정하고 싶긴한데 일단 찾아볼예정
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-main rounded-full animate-spin"></div>
    </div>
  );
};
