
 
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { getTuitionById } from "@/lib/api";
import { auth } from "@/lib/auth";

export default async function TuitionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate MongoDB ObjectId
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    notFound();
  }

  // Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Get tuition details
  // Keep the real error visible instead of hiding it with notFound()
  let tuition;

  try {
    tuition = await getTuitionById(id);
  } catch (error) {
    console.error("Tuition loading error:", error);

    // Only show 404 if the backend actually says not found
    if (
      error instanceof Error &&
      error.message.includes("404")
    ) {
      notFound();
    }

    throw error;
  }

  // Get user role
  const role = session?.user
    ? (session.user as { role?: string }).role
    : undefined;

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-16">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <Link
          href="/tuitions"
          className="font-semibold text-blue-700 hover:underline"
        >
          ← Back to Tuitions
        </Link>

        {/* Tuition Details Card */}
        <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm md:p-10">

          {/* Status and Salary */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              {tuition.status}
            </span>

            <span className="text-xl font-bold text-blue-700">
              ৳{tuition.salary}/month
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            {tuition.title}
          </h1>

          {/* Description */}
          <p className="mt-4 leading-7 text-gray-600">
            {tuition.description || "No description available."}
          </p>

          {/* Information Grid */}
          <div className="mt-8 grid gap-6 rounded-xl bg-gray-50 p-6 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">Subject</p>
              <p className="mt-1 font-bold text-gray-900">
                {tuition.subject}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Class</p>
              <p className="mt-1 font-bold text-gray-900">
                {tuition.class}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="mt-1 font-bold text-gray-900">
                {tuition.location}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Medium</p>
              <p className="mt-1 font-bold text-gray-900">
                {tuition.medium}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Days Per Week
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {tuition.daysPerWeek} Days
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Monthly Salary
              </p>
              <p className="mt-1 font-bold text-blue-700">
                ৳{tuition.salary}
              </p>
            </div>

          </div>

          {/* Apply Button Section */}
          <div className="mt-10">

            {!session ? (
              <Link
                href="/sign-in"
                className="block rounded-xl bg-blue-700 px-6 py-3 text-center font-bold text-white transition hover:bg-blue-800"
              >
                Login to Apply →
              </Link>
            ) : role === "student" ? (
              <Link
                href={`/payment/${tuition._id}`}
                className="block rounded-xl bg-blue-700 px-6 py-3 text-center font-bold text-white transition hover:bg-blue-800"
              >
                Apply for This Tuition →
              </Link>
            ) : role === "tutor" ? (
              <p className="rounded-xl bg-yellow-50 p-4 text-center font-medium text-yellow-800">
                Tutor accounts cannot apply for tuition.
              </p>
            ) : (
              <p className="rounded-xl bg-gray-100 p-4 text-center text-gray-600">
                You do not have permission to apply.
              </p>
            )}

            <Link
              href="/tuitions"
              className="mt-4 block rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Back to Tuitions
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
