import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Map, User as UserIcon, LogOut, Bookmark, Plane, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <Map className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            CityStories.in
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/cities" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Destinations
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/contributor" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Become a Guide
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.phone}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocation("/saved")}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>Saved Places</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation("/trips")}>
                  <Plane className="mr-2 h-4 w-4" />
                  <span>My Trips</span>
                </DropdownMenuItem>
                {user?.role === "contributor" && (
                  <DropdownMenuItem onClick={() => setLocation("/contributor")}>
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>My Submissions</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setLocation("/login")} variant="default" className="rounded-full px-6">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}