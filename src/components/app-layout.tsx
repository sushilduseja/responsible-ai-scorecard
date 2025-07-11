"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookCheck,
  Bot,
  ClipboardCheck,
  FileScan,
  Gauge,
  Lightbulb,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppLogo } from "./icons";

const menuItems = [
  { path: "/dashboard", icon: <Gauge />, label: "Dashboard" },
  { path: "/frameworks", icon: <BookCheck />, label: "Frameworks" },
  { path: "/assessment", icon: <ClipboardCheck />, label: "Assessment" },
  {
    path: "/analysis",
    icon: <Bot />,
    label: "AI Analysis",
    subItems: [
      { path: "/document-analysis", icon: <FileScan />, label: "Document Analysis" },
      { path: "/gap-analysis", icon: <Lightbulb />, label: "Gap Analysis" },
    ],
  },
  { path: "/compliance", icon: <ShieldCheck />, label: "Compliance" },
];

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150" alt="@shadcn" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">User</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide layout for auth pages and landing page
  if (["/login", "/signup", "/"].includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2">
            <AppLogo className="w-6 h-6 text-primary" />
            <span className="font-headline font-semibold text-lg">
              AI Ethics Auditor
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                {item.subItems ? (
                  <>
                    <SidebarMenuButton
                      isActive={item.subItems.some((sub) =>
                        pathname.startsWith(sub.path)
                      )}
                      className="justify-between"
                    >
                        <div className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.path}>
                           <SidebarMenuSubButton
                            asChild
                            isActive={pathname.startsWith(subItem.path)}
                          >
                            <Link href={subItem.path}>
                                {subItem.icon}
                                {subItem.label}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </>
                ) : (
                  <Link href={item.path}>
                    <SidebarMenuButton isActive={pathname.startsWith(item.path)}>
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="font-headline text-lg font-semibold md:text-2xl capitalize">
              {pathname.split("/").pop()?.replace(/-/g, " ") ?? "Dashboard"}
            </h1>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 lg:p-6 bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
