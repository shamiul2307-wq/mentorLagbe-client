"use client";

export default function ApplicantsPage() {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-base-content">
          Applicants
        </h1>

        <p className="mt-2 text-base-content/70">
          Manage students who have applied to your tuition posts.
        </p>

        <div className="mt-8 rounded-xl bg-base-100 p-8 shadow">
          <div className="text-center">
            <h2 className="text-xl font-semibold">
              No Applicants Yet
            </h2>

            <p className="mt-2 text-base-content/60">
              No one has applied to your tuition posts yet.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}