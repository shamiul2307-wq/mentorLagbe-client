import type { ReactNode } from "react"

import { TutorDashboardSidebar } from "@/components/tutor-dashboard-sidebar"

export default function TutorDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100svh-64px)] flex-col bg-[#F1F5FE] md:min-h-[calc(100svh-68px)] lg:flex-row">
      <TutorDashboardSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
