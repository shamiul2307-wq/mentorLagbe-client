
"use client";

export default function MyApplicationsPage() {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-base-content">
          My Applications
        </h1>

        <p className="mt-2 text-base-content/70">
          এখানে তোমার Tuition Applications দেখা যাবে।
        </p>

        <div className="mt-8 rounded-xl bg-base-100 p-8 shadow">
          <div className="text-center">
            <h2 className="text-xl font-semibold">
              No Applications Yet
            </h2>

            <p className="mt-2 text-base-content/60">
              You have not submitted any applications yet.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
