
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

const adminMenus = [
  {
    title: "Manage Users",
    description: "View and manage students and tutors.",
    href: "/admin/users",
  },
  {
    title: "Manage Tuitions",
    description: "Approve or reject tuition posts.",
    href: "/admin/tuitions",
  },
  {
    title: "Manage Applications",
    description: "Manage tuition applications.",
    href: "/admin/applications",
  },
  {
    title: "Manage Payments",
    description: "Monitor payment records.",
    href: "/admin/payments",
  },
];

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 p-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">
            Access Denied
          </h1>
          <p className="mt-3 text-gray-400">
            Only administrators can access this page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mb-8 mt-2 text-gray-400">
          Welcome, {session.user.name}
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {adminMenus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="rounded-xl border border-gray-700 bg-gray-900 p-6 transition hover:border-blue-500"
            >
              <h2 className="mb-2 text-xl font-semibold">
                {menu.title}
              </h2>
              <p className="text-gray-400">
                {menu.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}


