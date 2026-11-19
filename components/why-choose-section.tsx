import { CalendarCheck, GraduationCap, Laptop } from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Qualified Tutors",
    description:
      "Find experienced and qualified tutors for your academic needs.",
    iconClass: "bg-blue-100 text-brand",
  },
  {
    icon: Laptop,
    title: "Flexible Learning",
    description:
      "Choose online or offline tuition according to your preference.",
    iconClass: "bg-orange-100 text-orange-500",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description:
      "Apply for your preferred tuition with a simple, hassle-free booking process.",
    iconClass: "bg-emerald-100 text-emerald-500",
  },
]

export function WhyChooseSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-16">
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#0B0E4A] sm:text-3xl">
          Why Choose <span className="text-brand">MentorLagde?</span>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description, iconClass }) => (
            <article
              key={title}
              className="rounded-2xl bg-[#F1F2FD] p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-7"
            >
              <span
                className={`flex size-12 items-center justify-center rounded-xl ${iconClass}`}
              >
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-[#0B0E4A]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7090]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
