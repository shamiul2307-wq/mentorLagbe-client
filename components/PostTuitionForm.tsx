
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import PostTuitionForm from "@/components/PostTuitionForm";

export default async function PostTuitionPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

   
  if (!session) {
    redirect("/sign-in");
  }

 
  if (session.user.role !== "tutor") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600">
            Access Denied!
          </h1>

          <p className="text-gray-600 mt-3">
            Only tutors can post a tuition.
          </p>
        </div>
      </main>
    );
  }
 
  return <PostTuitionForm />;
}
