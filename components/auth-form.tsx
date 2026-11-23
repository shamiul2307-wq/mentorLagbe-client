 
 
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { BadgeCheck, GraduationCap, Star } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Mode = "sign-in" | "sign-up";

export type FieldProps = {
  name?: string;
  email: string;
  password: string;
  role?: string;
  confirmPassword?: string;
};

type FieldConfig = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  minLength?: number;
  options?: { value: string; label: string }[];
  defaultValue?: string;
};

type AuthFormProps = {
  mode: Mode;
  onSubmit?: (data: Record<string, string>) => Promise<void>;
};

function Field({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  minLength,
  options,
  defaultValue,
}: FieldConfig) {
  const inputClass =
    "h-11 w-full rounded-lg border border-[#DCE2F5] bg-white px-3.5 text-sm text-[#0B0E4A] outline-none transition-colors placeholder:text-[#9AA1BF] focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#0B0E4A]"
      >
        {label}
      </label>

      {options ? (
        <select
          id={name}
          name={name}
          defaultValue={defaultValue}
          required
          className={inputClass}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          required
          className={inputClass}
        />
      )}
    </div>
  );
}

const config: Record<
  Mode,
  {
    title: string;
    subtitle: string;
    submitLabel: string;
    togglePrompt: string;
    toggleLabel: string;
    toggleHref: string;
    fields: FieldConfig[];
  }
> = {
  "sign-in": {
    title: "Sign In",
    subtitle: "Welcome back to MentorLagde. Pick up where you left off.",
    submitLabel: "Sign In",
    togglePrompt: "Don't have an account?",
    toggleLabel: "Sign up",
    toggleHref: "/sign-up",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "you@example.com",
        autoComplete: "email",
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        autoComplete: "current-password",
      },
    ],
  },

  "sign-up": {
    title: "Create Account",
    subtitle: "Join MentorLagde and find the tutor that fits you.",
    submitLabel: "Create Account",
    togglePrompt: "Already have an account?",
    toggleLabel: "Sign in",
    toggleHref: "/sign-in",
    fields: [
      {
        name: "name",
        label: "Full Name",
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "you@example.com",
        autoComplete: "email",
      },
      {
        name: "role",
        label: "I am a",
        options: [
          { value: "student", label: "Student" },
          { value: "tutor", label: "Tutor" },
        ],
        defaultValue: "student",
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Create a password",
        autoComplete: "new-password",
        minLength: 8,
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Re-enter your password",
        autoComplete: "new-password",
        minLength: 8,
      },
    ],
  },
};

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const content = config[mode];

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>;

    setErrorMessage(null);
    setSubmitted(false);

    if (mode === "sign-up" && data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      if (onSubmit) {
        await onSubmit(data);
      } else {
        console.log(`[${mode}] form data`, data);
      }

      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-gradient-to-br from-[#C9D5FF] via-[#EAEEFE] to-[#C0D0FF] px-5 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-24 size-96 rounded-full bg-white/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-blue-300/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
        {/* Left side */}
        <div className="hidden flex-col items-center gap-6 lg:flex">
          <Link href="/" className="flex items-center gap-2.5 self-start">
            <BrandMark />
            <span className="text-lg font-semibold tracking-tight text-[#0B0E4A]">
              MentorLagde
            </span>
          </Link>

          <div className="relative w-full max-w-sm">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 shadow-xl shadow-indigo-200/50">
              <Image
                src="/images/hero-tutor.png"
                alt="A MentorLagde tutor ready to help you learn"
                width={145}
                height={160}
                priority
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="absolute -top-4 -left-4 flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-xs font-medium text-[#0B0E4A] shadow-md backdrop-blur">
              <GraduationCap className="size-4 text-brand" />
              Learn with experts
            </div>

            <div className="absolute -right-3 bottom-8 flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-xs font-medium text-[#0B0E4A] shadow-md backdrop-blur">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              4.8 average rating
            </div>
          </div>

          <p className="max-w-sm text-center text-sm text-[#4A5070]">
            Qualified tutors, flexible learning, and booking that takes minutes.
          </p>
        </div>

        {/* Right side - Auth Form */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-white/80 bg-white p-6 shadow-xl shadow-indigo-200/50 sm:p-8">
            <div className="lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <BrandMark />
                <span className="text-base font-semibold text-[#0B0E4A]">
                  MentorLagde
                </span>
              </Link>
            </div>

            {/* Sign In / Sign Up Tabs */}
            <div
              aria-label="Account access"
              className="mt-4 grid grid-cols-2 gap-1 rounded-lg bg-[#F1F2FD] p-1 lg:mt-0"
            >
              <Link
                href="/sign-in"
                aria-current={mode === "sign-in" ? "page" : undefined}
                className={cn(
                  "rounded-md py-1.5 text-center text-sm font-medium text-[#6B7090] transition-colors",
                  mode === "sign-in" && "bg-white text-[#0B0E4A] shadow-sm"
                )}
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                aria-current={mode === "sign-up" ? "page" : undefined}
                className={cn(
                  "rounded-md py-1.5 text-center text-sm font-medium text-[#6B7090] transition-colors",
                  mode === "sign-up" && "bg-white text-[#0B0E4A] shadow-sm"
                )}
              >
                Sign Up
              </Link>
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-bold tracking-tight text-[#0B0E4A]">
                {content.title}
              </h1>

              <p className="mt-1 text-sm text-[#6B7090]">
                {content.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {content.fields.map((field) => (
                <Field key={field.name} {...field} />
              ))}

              {mode === "sign-in" && (
                <div className="flex items-center justify-between gap-3 text-xs">
                  <label className="flex items-center gap-2 text-[#4A5070]">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="size-4 rounded border-[#DCE2F5] accent-brand"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      console.log("[sign-in] forgot password clicked")
                    }
                    className="font-medium text-brand hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-lg bg-brand text-sm font-medium text-brand-foreground shadow-md shadow-brand/20 hover:bg-brand/90"
              >
                {loading ? "Please wait..." : content.submitLabel}
              </Button>

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
                >
                  {errorMessage}
                </p>
              )}

              {submitted && (
                <p
                  role="status"
                  className="flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700"
                >
                  <BadgeCheck className="mt-px size-4 shrink-0" />
                  Form submitted successfully!
                </p>
              )}
            </form>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#E6E9F7]" />
              <span className="text-xs text-[#9AA1BF]">or continue with</span>
              <span className="h-px flex-1 bg-[#E6E9F7]" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={() => console.log(`[${mode}] Google button clicked`)}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#DCE2F5] bg-white text-sm font-medium text-[#0B0E4A] transition-colors hover:bg-[#F7F8FE]"
            >
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.29 9.14 5.36 12 5.36Z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-[#6B7090]">
              {content.togglePrompt}{" "}
              <Link
                href={content.toggleHref}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto p-0 text-sm font-medium text-brand no-underline hover:text-brand/80 hover:no-underline"
                )}
              >
                {content.toggleLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
