
import Link from "next/link";
import { getTuitions } from "@/lib/api";
import type { Tuition } from "@/types/tuition";
export const dynamic = "force-dynamic";
export default async function TuitionsPage() {
  let tuitions: Tuition[] = [];
  let errorMessage = "";

  try {
    tuitions = await getTuitions();
  } catch (error) {
    console.error("Tuition loading error:", error);
    errorMessage = "Unable to load tuitions. Please try again.";
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Available Tuitions
          </h1>

          <p className="mt-3 text-gray-600">
            Find your preferred tuition and apply today.
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="rounded-xl bg-red-100 p-5 text-center text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Empty State */}
        {!errorMessage && tuitions.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-bold text-gray-800">
              No Tuitions Available
            </h2>
            <p className="mt-2 text-gray-500">
              Please check again later.
            </p>
          </div>
        )}

        {/* Tuition Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Status */}
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {tuition.status}
                </span>

                <span className="text-lg font-bold text-blue-700">
                  ৳{tuition.salary}/month
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-5 text-xl font-bold text-gray-900">
                {tuition.title}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {tuition.description || "No description available."}
              </p>

              {/* Information */}
              <div className="mt-5 space-y-3 text-sm text-gray-700">
                <p>
                  <strong>Subject:</strong> {tuition.subject}
                </p>

                <p>
                  <strong>Class:</strong> {tuition.class}
                </p>

                <p>
                  <strong>Location:</strong> {tuition.location}
                </p>

                <p>
                  <strong>Medium:</strong> {tuition.medium}
                </p>

                <p>
                  <strong>Days per week:</strong> {tuition.daysPerWeek}
                </p>
              </div>

              {/* View Details */}
              <div className="mt-auto pt-6">
                <Link
                  href={`/tuitions/${tuition._id}`}
                  className="block rounded-xl bg-blue-700 px-5 py-3 text-center font-bold text-white transition hover:bg-blue-800"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}


 