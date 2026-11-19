import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  Star,
  Users,
} from "lucide-react"

import { BrandMark } from "@/components/brand-mark"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Students learning",
    tint: "bg-blue-100 text-brand",
  },
  {
    icon: GraduationCap,
    value: "2,500+",
    label: "Qualified tutors",
    tint: "bg-violet-100 text-violet-600",
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "Average rating",
    tint: "bg-amber-100 text-amber-500",
  },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EAEEFE] via-[#F1F4FE] to-[#E7DEFD]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-white/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-blue-200/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:px-16 md:py-24 lg:grid-cols-2 lg:gap-8">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-[#0B0E4A] shadow-sm">
            <BrandMark className="size-4" />
            Your learning journey starts here
          </div>

          <h1 className="text-[2.5rem] leading-[1.12] font-bold tracking-tight text-[#0B0E4A] sm:text-5xl lg:text-[3.25rem]">
            Find Your Ideal
            <br />
            <span className="text-brand">Tutor</span> Today!
          </h1>

          <p className="max-w-md text-pretty text-base leading-relaxed text-[#4A5070]">
            Connect with qualified tutors and discover the perfect learning
            experience, tailored to your goals and your pace.
          </p>

          <Link
            href="/tutors"
            className={cn(
              buttonVariants(),
              "h-11 gap-2 rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground shadow-md shadow-brand/20 hover:bg-brand/90"
            )}
          >
            Find a Tutor
            <ArrowRight className="size-4" />
          </Link>

          <div className="flex items-center gap-3 pt-1 text-xs text-[#4A5070]">
            <div className="flex -space-x-2">
              {["from-blue-500 to-blue-700", "from-violet-400 to-violet-600", "from-amber-400 to-orange-500"].map(
                (gradient) => (
                  <span
                    key={gradient}
                    className={`size-7 rounded-full border-2 border-white bg-gradient-to-br ${gradient}`}
                  />
                )
              )}
            </div>
            <span>Loved by learners around the world</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/40 shadow-xl shadow-indigo-200/50">
            <Image
              src="/images/hero-tutor.png"
              alt="A friendly tutor ready to help you learn"
              width={145}
              height={160}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="absolute -top-3 -left-3 flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-xs font-medium text-[#0B0E4A] shadow-md backdrop-blur">
            <BadgeCheck className="size-4 text-brand" />
            Verified tutors
          </div>

          <div className="absolute -right-2 bottom-6 flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-xs font-medium text-[#0B0E4A] shadow-md backdrop-blur">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            4.8 average rating
          </div>
        </div>
      </div>

      <div className="relative bg-white/85">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-3 md:px-16">
          {stats.map(({ icon: Icon, value, label, tint }) => (
            <div key={label} className="flex items-center gap-3">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                <Icon className="size-5" />
              </span>
              <div>
                <div className="text-lg font-semibold text-[#0B0E4A]">{value}</div>
                <div className="text-xs text-[#6B7090]">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
