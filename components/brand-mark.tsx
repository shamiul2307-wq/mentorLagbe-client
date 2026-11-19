import { cn } from "@/lib/utils"

/** Abstract blue mark used next to the MentorLagde wordmark. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7 shrink-0 text-brand", className)}
    >
      <path
        d="M2.5 14.2 29.5 2.5 20.4 29.5l-5.7-9.8-12.2-5.5Z"
        fill="currentColor"
      />
      <path
        d="m14.7 19.7 14.8-17.2-11.9 12.1-2.9 5.1Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  )
}
