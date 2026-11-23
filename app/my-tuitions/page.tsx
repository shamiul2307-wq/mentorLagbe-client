"use client";

export default function MyTuitionsPage() {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-base-content">
          My Tuitions
        </h1>

        <p className="mt-2 text-base-content/70">
          Manage your posted tuition requests.
        </p>

        <div className="mt-8 rounded-xl bg-base-100 p-8 shadow">
          <div className="text-center">
            <h2 className="text-xl font-semibold">
              No Tuitions Found
            </h2>

            <p className="mt-2 text-base-content/60">
              You have not posted any tuition yet.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}