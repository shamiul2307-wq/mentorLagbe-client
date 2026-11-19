"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { BrandMark } from "@/components/brand-mark"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const links = [
  { label: "Home", href: "/" },
  { label: "Tutors", href: "/tutors" },
  { label: "About", href: "/about" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[68px] md:px-16">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="MentorLagde home"
        >
          <BrandMark />
          <span className="text-[17px] font-semibold tracking-tight text-foreground">
            MentorLagde
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    render={<Link href={link.href} />}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      active && "bg-muted/70 text-foreground"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "link" }),
              "px-0 text-sm font-medium text-brand no-underline hover:text-brand/80 hover:no-underline"
            )}
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants(),
              "h-10 rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground shadow-sm hover:bg-brand/90"
            )}
          >
            Sign up
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Open menu"
                className="md:hidden"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] gap-0 p-0 sm:max-w-xs">
            <SheetHeader className="border-b px-5 py-5">
              <SheetTitle className="flex items-center gap-2.5">
                <BrandMark className="size-6" />
                MentorLagde
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => {
                const active = pathname === link.href
                return (
                  <SheetClose
                    key={link.href}
                    render={<Link href={link.href} />}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                      active && "bg-muted/70 text-foreground"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </SheetClose>
                )
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-3 border-t px-5 py-5">
              <SheetClose
                render={<Link href="/sign-in" />}
                className="text-sm font-medium text-brand hover:underline"
              >
                Sign in
              </SheetClose>
              <SheetClose
                render={<Link href="/sign-up" />}
                className="flex h-10 w-full items-center justify-center rounded-lg bg-brand text-sm font-medium text-brand-foreground shadow-sm hover:bg-brand/90"
              >
                Sign up
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
