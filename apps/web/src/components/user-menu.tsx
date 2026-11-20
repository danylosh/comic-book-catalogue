import { Button } from "@comic-book-catalogue/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@comic-book-catalogue/ui/components/dropdown-menu";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Button variant="outline" size="icon" disabled>
        <User className="h-4 w-4" />
        <span className="sr-only">Loading account</span>
      </Button>
    );
  }

  if (!session) {
    return (
      <Button variant="outline" size="sm" render={<Link to="/login" />}>
        Sign in
      </Button>
    );
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out");
    await navigate({ to: "/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="icon" />}
        aria-label="Open user menu"
      >
        <User className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">{session.user.name}</span>
            <span className="truncate font-normal">{session.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={<Link to="/dashboard" />}
          className="cursor-pointer"
        >
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleSignOut} className="cursor-pointer">
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}