import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-base/75 border-b border-border-subtle">
      <div className="mx-auto max-w-7xl flex items-center gap-6 py-4 px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 text-lg font-bold tracking-tight"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-fg text-sm font-black">
            C
          </span>
          <span>
            Coin<span className="font-light text-ink-secondary">Info</span>
          </span>
        </Link>

        <div className="flex-1 flex justify-center">
          <SearchBar placeholder="Search a coin..." />
        </div>

        <nav className="flex items-center gap-2 shrink-0">
          <Link
            href="/explore"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-ink-secondary hover:text-ink-primary hover:bg-surface-2 transition-colors"
          >
            Explore
          </Link>
          <div className="h-5 w-px bg-border-subtle mx-1" />
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
};

export default Header;
