 
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, LogOut, LayoutDashboard } from "lucide-react"

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
import { authClient } from "@/lib/auth-client"

const links = [
  { label: "Home", href: "/" },
  { label: "Tuitions", href: "/tuitions" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const { data: session, isPending } = authClient.useSession()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const user = session?.user

  const dashboardHref = "/dashboard"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[68px] md:px-16">

        {/* Logo */}
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

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {links.map((link) => {
              const active = isActive(link.href)

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

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <span className="text-sm text-muted-foreground">
              Loading...
            </span>
          ) : user ? (
            <>
              <span className="max-w-36 truncate text-sm font-medium text-foreground">
                {user.name || user.email}
              </span>

              <Link
                href={dashboardHref}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-10 gap-2 rounded-lg px-4 text-sm"
                )}
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>

              <Button
                variant="ghost"
                onClick={handleLogout}
                className="gap-2 text-sm text-muted-foreground hover:text-destructive"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Menu */}
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
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[85%] gap-0 p-0 sm:max-w-xs"
          >
            <SheetHeader className="border-b px-5 py-5">
              <SheetTitle className="flex items-center gap-2.5">
                <BrandMark className="size-6" />
                MentorLagde
              </SheetTitle>
            </SheetHeader>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => {
                const active = isActive(link.href)

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

            {/* Mobile Authentication */}
            <div className="mt-auto flex flex-col gap-3 border-t px-5 py-5">
              {isPending ? (
                <p className="text-sm text-muted-foreground">
                  Loading...
                </p>
              ) : user ? (
                <>
                  <div className="border-b pb-3">
                    <p className="text-sm font-semibold text-foreground">
                      {user.name || "User"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <SheetClose
                    render={<Link href={dashboardHref} />}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </SheetClose>

                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="justify-start gap-2 text-sm text-destructive"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

