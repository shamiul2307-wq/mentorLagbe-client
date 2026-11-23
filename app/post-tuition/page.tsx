import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import PostTuitionForm from "@/components/PostTuitionForm";

export default async function PostTuitionPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Login না করলে
  if (!session) {
    redirect("/sign-in");
  }

  // শুধু Tutor access পাবে
  if (session.user.role !== "tutor") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-md">
          <h1 className="text-2xl font-bold text-red-600">
            Access Denied!
          </h1>

          <p className="mt-3 text-gray-600">
            Only tutors can post a tuition.
            Students are not allowed to access this page.
          </p>
        </div>
      </main>
    );
  }

  return <PostTuitionForm />;
}