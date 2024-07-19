import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
const Header = () => {
  return (
    <div className="w-full flex justify-between items-center p-10">
      <div className="w-max p-2 text-2xl font-bold">
        <Link href={"/"} style={{ textDecoration: "none" }}>
          Coin<span className="font-light">Info</span>
        </Link>
      </div>
      <div className="w-full">
        <SearchBar placeholder="Search a coin.." />
      </div>
      <div className="min-w-max cursor-pointer">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Header;
