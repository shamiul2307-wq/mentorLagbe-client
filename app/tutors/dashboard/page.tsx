import { ArrowRight, Plus } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stats = [
  { value: "5", label: "Total Tuitions" },
  { value: "3", label: "Approved" },
  { value: "2", label: "Pending" },
]

const applicants = [
  {
    name: "Mitu Islam",
    initials: "MI",
    tuition: "Math Tuition",
    applied: "Applied 2h ago",
  },
  {
    name: "Karim Ahmed",
    initials: "KA",
    tuition: "Physics Tuition",
    applied: "Applied 5h ago",
  },
  {
    name: "Sumaiya Akter",
    initials: "SA",
    tuition: "English Tuition",
    applied: "Applied 1d ago",
  },
]

export default function TutorDashboardPage() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E9F8] bg-white px-5 py-5 md:px-10">
        <h1 className="text-xl font-semibold text-[#303060] md:text-2xl">
          Tutor Dashboard
        </h1>
        <button
          type="button"
          className={cn(
            buttonVariants(),
            "h-10 gap-2 rounded-lg bg-brand px-4 text-sm text-brand-foreground shadow-sm hover:bg-brand/90"
          )}
        >
          <Plus className="size-4" />
          Post New Tuition
        </button>
      </div>

      <div className="px-5 py-8 md:px-10 md:py-10">
        <h2 className="text-2xl font-semibold text-[#303060]">
          Welcome back, Rahim!
        </h2>
        <p className="mt-1 text-sm text-[#535990]">
          Manage your tuitions and applicants.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map(({ value, label }) => (
            <article
              key={label}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E8ECF8]"
            >
              <p className="text-3xl font-bold text-[#303060]">{value}</p>
              <p className="mt-1 text-sm text-[#535990]">{label}</p>
            </article>
          ))}
        </div>

        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-[#303060]">
              Recent Applicants
            </h3>
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand/80"
            >
              View All
              <ArrowRight className="size-4" />
            </button>
          </div>

          <div className="mt-4 divide-y divide-[#EEF1FA] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#E8ECF8]">
            {applicants.map(({ name, initials, tuition, applied }) => (
              <div
                key={name}
                className="flex flex-wrap items-center gap-4 px-5 py-4 sm:flex-nowrap"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#303060] text-xs font-semibold text-white">
                  {initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#303060]">{name}</p>
                  <p className="text-xs text-[#535990]">{tuition}</p>
                </div>
                <p className="w-full text-xs text-[#535990] sm:w-32">{applied}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-[#0BAE5F] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#099A53]"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-[#FEEAEA] px-4 py-2 text-xs font-medium text-[#C23A48] transition-colors hover:bg-[#FDDCDC]"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
