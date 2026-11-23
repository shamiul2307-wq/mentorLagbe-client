
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function DashboardPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/sign-in");
  }

  switch (session.user.role) {
    case "student":
      redirect("/dashboard/student");

    case "tutor":
      redirect("/dashboard/tutor");

    case "admin":
      redirect("/dashboard/admin");

    default:
      redirect("/");
  }
}
