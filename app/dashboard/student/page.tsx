
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function StudentDashboard() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "student") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold">
          Student Dashboard
        </h1>

        <p className="mt-2 text-base-content/70">
          Welcome, {session.user.name}!
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <Link href="/tuitions" className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Find Tuition</h2>
              <p>Browse available tuition opportunities.</p>
              <span className="text-primary font-semibold">
                Explore →
              </span>
            </div>
          </Link>

          <Link href="/post-tuition" className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Post Tuition</h2>
              <p>Create a new tuition requirement.</p>
              <span className="text-primary font-semibold">
                Post Now →
              </span>
            </div>
          </Link>

          <Link href="/my-applications" className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">My Applications</h2>
              <p>Check your tuition applications.</p>
              <span className="text-primary font-semibold">
                View Applications →
              </span>
            </div>
          </Link>

        </div>

        <div className="card bg-base-100 shadow mt-8">
          <div className="card-body">
            <h2 className="text-xl font-bold">Account Information</h2>
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <p>Role: {session.user.role}</p>
            <Link href="/profile" className="btn btn-outline btn-primary mt-4">
              Update Profile
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
