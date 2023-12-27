"use client";

import React from "react";
import Image from "next/image";
import { useParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
import {
  Badge,
  Button,
  ArrowLeftIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
  LayoutTemplateIcon,
  PenIcon,
  SearchIcon,
  SettingsIcon,
  User2Icon,
  BarChart3Icon,
  SheetTrigger,
  MenuIcon,
  Sheet,
  SheetContent,
  PaletteIcon,
} from "@turbocharger/ui";
import { cn } from "@turbocharger/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config";

export function Sidebar() {
  return (
    <>
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur xl:hidden">
        <div className="container flex h-14 items-center">
          <MobileSideBar />
        </div>
      </header>
      <nav className="bg-card fixed top-0 z-30 hidden h-full w-full flex-col border-r shadow-[0_35px_30px_-15px_rgba(0,0,0,0.3)] xl:flex xl:max-h-screen xl:min-h-screen xl:w-52">
        <SidebarNav />
      </nav>
    </>
  );
}

export function SidebarNav() {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  const { siteId } = useParams() as { siteId?: string };
  const tabs = React.useMemo(() => {
    if (segments[0] === "site" && siteId) {
      return [
        {
          name: "Back to All Sites",
          href: "/",
          icon: <ArrowLeftIcon />,
        },
        {
          name: "Site",
          href: `/site/${siteId}`,
          isActive: segments.length === 2,
          icon: <LayoutGridIcon />,
        },
        {
          name: "Template",
          href: `/site/${siteId}/template`,
          isActive: segments.includes("template"),
          icon: <LayoutTemplateIcon />,
        },
        {
          name: "Settings",
          href: `/site/${siteId}/settings`,
          isActive: segments.includes("settings"),
          icon: <SettingsIcon />,
        },
        {
          name: "Appearance",
          href: `/site/${siteId}/appearance`,
          isActive: segments.includes("appearance"),
          icon: <PaletteIcon />,
        },
        {
          name: "Customize",
          href: `/site/${siteId}/customize`,
          isActive: segments.includes("customize"),
          icon: <PenIcon />,
        },
        {
          name: "Domains",
          href: `/site/${siteId}/domains`,
          isActive: segments.includes("domains"),
          icon: <GlobeIcon />,
        },
        {
          name: "SEO",
          href: `/site/${siteId}/seo`,
          isActive: segments.includes("seo"),
          icon: <SearchIcon />,
        },
        {
          name: "Analytics",
          isPro: true,
          isDisabled: true,
          href: `/site/${siteId}/analytics`,
          isActive: segments.includes("analytics"),
          icon: <BarChart3Icon />,
        },
      ];
    }
    return [
      {
        name: "Sites",
        href: "/",
        isActive: pathname === "/",
        icon: <LayoutDashboardIcon />,
      },
      {
        name: "Account",
        href: "/account",
        isActive: pathname === "/account",
        icon: <User2Icon />,
      },
    ];
  }, [pathname, segments, siteId]);

  // <nav className="bg-card fixed top-0 z-30 hidden h-16 w-full flex-col border-r px-4 py-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  lg:flex lg:max-h-screen lg:min-h-screen lg:w-52">
  return (
    <div className="flex h-full w-full flex-col px-4 py-6">
      <Image
        alt={siteConfig.name}
        width={50}
        height={50}
        className="relative mx-auto dark:rounded-full dark:border"
        src={siteConfig.logo}
      />
      <div className="mt-8 flex flex-1 flex-col gap-2">
        {tabs.map((tab, index) => {
          return (
            <Button
              key={index}
              href={tab.href}
              variant="text"
              disabled={tab.isDisabled}
              className={cn("flex items-center justify-start space-x-3 text-left", {
                "bg-accent hover:bg-accent": tab.isActive,
              })}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.name}</span>
              {tab.isPro && (
                <Badge color="secondary" size="sm" className="mt-[3px]">
                  PRO
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <ThemeToggle />
      </div>
    </div>
  );
}

const MobileSideBar = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="text" color="neutral" size="icon">
          <MenuIcon />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-card w-56 px-0 pb-0">
        <SidebarNav />
        {/* <div className="flex flex-col space-y-8">
            <Link
              href="/"
              className="flex justify-center transition-all hover:opacity-80"
              onClick={handleClose}>
              <Image
                src={siteConfig.global.logo}
                alt={siteConfig.global.name}
                loading="lazy"
                width={30}
                height={30}
                className="aspect-[auto 30 / 30] object-cover"
              />
            </Link>
            <Nav
              items={config.nav.links}
              direction="column"
              onNavItemClick={handleClose}
            />
            <Button href={config.cta.primary.href} size="sm">
              {config.cta.primary.label}
            </Button>
          </div> */}
      </SheetContent>
    </Sheet>
  );
};
