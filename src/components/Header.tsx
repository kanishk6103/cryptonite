import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
const Header = () => {
  return (
    <div className="w-full flex justify-between items-center p-10">
      <div className="w-max p-2">Logo</div>
      <div className="w-full">
        <SearchBar />
      </div>
      <div className="min-w-max cursor-pointer">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Header;
