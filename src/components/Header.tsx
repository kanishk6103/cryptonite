import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
const Header = () => {
  return (
    <div className="w-full flex justify-between items-center py-10 px-24">
      <div className="w-max p-2 text-2xl font-bold">
        <Link href={"/"} style={{ textDecoration: "none" }}>
          Coin<span className="font-light">Info</span>
        </Link>
      </div>
      <div className="w-full">
        <SearchBar placeholder="Search a coin.." />
      </div>
      <div className="min-w-max cursor-pointer flex gap-10 items-center">
        <Link href={"/explore"} className="no-underline font-medium">
          Explore
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Header;
