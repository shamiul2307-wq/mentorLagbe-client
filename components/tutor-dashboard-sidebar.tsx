import Link from "next/link"
import {
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  UserRound,
  Users,
} from "lucide-react"

import { BrandMark } from "@/components/brand-mark"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/tutors/dashboard",
    active: true,
  },
  { label: "Post Tuition", icon: FileText },
  { label: "My Tuitions", icon: BookOpen },
  { label: "Applicants", icon: Users },
  { label: "Profile", icon: UserRound },
]

const itemClass =
  "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium whitespace-nowrap text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:py-2.5 lg:text-sm"

export function TutorDashboardSidebar() {
  return (
    <aside className="w-full shrink-0 bg-[#1F294F] text-white lg:w-60">
      <div className="flex h-16 items-center px-5 lg:h-[76px]">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-white/50"
        >
          <BrandMark className="size-6" />
          <span className="text-base font-semibold tracking-tight">
            MentorLagde
          </span>
        </Link>
      </div>

      <nav
        aria-label="Tutor dashboard"
        className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-3 lg:pb-6"
      >
        {navItems.map(({ label, icon: Icon, href, active }) => {
          const className = cn(itemClass, active && "bg-white/10 text-white")

          if (href) {
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                className={className}
              >
                <Icon className="size-[18px]" />
                {label}
              </Link>
            )
          }

          return (
            <button key={label} type="button" className={className}>
              <Icon className="size-[18px]" />
              {label}
            </button>
          )
        })}

        <span className="mx-2 hidden h-px shrink-0 bg-white/10 lg:block" />

        <Link href="/sign-in" className={itemClass}>
          <LogOut className="size-[18px]" />
          Logout
        </Link>
      </nav>
    </aside>
  )
}
