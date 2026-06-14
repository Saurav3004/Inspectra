"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutIcon ,
  GithubLogoIcon,
  GitBranchIcon,
  GearIcon,
} from "@phosphor-icons/react";

import {
  DASHBOARD_NAV_ITEMS,
  type DashboardRoute,
} from "@/features/dashboard/lib/routes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NAV_ICONS = {
  "layout-dashboard": LayoutIcon ,
  "folder-git-2": GitBranchIcon,
  github: GithubLogoIcon,
  settings: GearIcon,
} as const;

function isNavActive(pathname: string, href: DashboardRoute) {
  if (href === "/dashboard") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu className="gap-2">
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            const active = isNavActive(pathname, item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
  className="text-base py-6 px-4"
  isActive={active}
  tooltip={item.title}
  render={
    <Link
      href={item.href}
      className="flex items-center gap-4 w-full"
    >
      <Icon className="size-6" />
      <span className="text-base font-medium">
        {item.title}
      </span>
    </Link>
  }
/>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}