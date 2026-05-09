import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, MessageCircle, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/chat", label: "Messages" },
];

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-brand-gradient text-primary-foreground shadow-elegant">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Smart<span className="text-brand-gradient">Campus</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                path.startsWith(l.to) && "bg-secondary text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <Link to="/login" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/signup" className="hidden sm:inline-flex">
            <Button size="sm" className="rounded-full bg-brand-gradient text-primary-foreground shadow-soft hover:opacity-90">
              Get started
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 p-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link to="/login" className="flex-1"><Button variant="outline" className="w-full">Sign in</Button></Link>
              <Link to="/signup" className="flex-1"><Button className="w-full bg-brand-gradient">Get started</Button></Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
