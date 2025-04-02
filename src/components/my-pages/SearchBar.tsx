import React from "react";
import Image from "next/image";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("searchQuery") as string;
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex-1 md:w-[200px] lg:w-[320px] md:flex-none"
    >
      <input
        type="text"
        name="searchQuery"
        placeholder="검색"
        className="w-full h-[45px] px-5 bg-dark text-gray-200 border border-gray-200 rounded-[2px] text-[14px]"
      />
      <button type="submit" className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <Image
          src="/assets/icons/search.png"
          alt="search"
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      </button>
    </form>
  );
};

export default SearchBar;
