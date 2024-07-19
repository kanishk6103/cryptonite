import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
const Header = () => {
  return (
    <div className="w-full flex justify-between items-center p-10">
      <div className="w-max p-2 text-2xl font-bold">
        Coin<span className="font-light">Info</span>
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
