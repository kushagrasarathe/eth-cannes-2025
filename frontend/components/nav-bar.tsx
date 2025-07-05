"use client";

import { ConnectedButton } from "./mobile-header";
import Link from "next/link";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Zen Yield</span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <ConnectedButton />
        </div>
      </div>
    </header>
  );
}
