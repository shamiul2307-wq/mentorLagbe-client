
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function AdminDashboard() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-base-content/70">
          Welcome, Admin {session.user.name}!
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <Link href="/users" className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Manage Users</h2>
              <p>View and manage platform users.</p>
            </div>
          </Link>

          <Link href="/tuitions" className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Manage Tuitions</h2>
              <p>Review tuition listings.</p>
            </div>
          </Link>

          <Link href="/transactions" className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Transactions</h2>
              <p>View payment transactions.</p>
            </div>
          </Link>

        </div>

      </div>
    </main>
  );
}
