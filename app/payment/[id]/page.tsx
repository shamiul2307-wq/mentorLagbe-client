
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import PaymentButton from "@/components/PaymentButton";
import { auth } from "@/lib/auth";
import { getTuitionById } from "@/lib/api";
 ;

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const role = (
    session.user as typeof session.user & { role?: string }
  ).role;

  if (role !== "student") {
    redirect("/tuitions");
  }

  let tuition;

  try {
    tuition = await getTuitionById(id);
  } catch {
    notFound();
  }

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/tuitions/${id}`}
          className="font-semibold text-blue-700 hover:underline"
        >
          ← Back to Tuition Details
        </Link>

        <div className="mt-7 overflow-hidden rounded-2xl border bg-white shadow-lg">
          <div className="bg-blue-700 px-7 py-8 text-white">
            <p className="text-sm font-medium text-blue-100">
              SECURE CHECKOUT
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">
              Choose Payment Option
            </h1>
            <p className="mt-2 text-blue-100">
              Complete your application payment securely.
            </p>
          </div>

          <div className="p-7">
            <h2 className="text-xl font-bold text-gray-900">
              Tuition Information
            </h2>

            <div className="mt-4 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-gray-900">
                {tuition.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Subject: {tuition.subject}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Location: {tuition.location}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Student: {session.user.name}
              </p>
            </div>

            <h2 className="mt-8 text-xl font-bold text-gray-900">
              Payment Method
            </h2>

            <div className="mt-4 rounded-xl border-2 border-blue-600 bg-blue-50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-2xl">
                  💳
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    SSLCOMMERZ
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Secure online payment gateway
                  </p>
                </div>

                <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 text-xs text-white">
                  ✓
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                Continue to SSLCOMMERZ to select an available payment
                method, such as card or supported mobile banking.
              </p>
            </div>

            <div className="mt-6 rounded-xl border p-4">
              <p className="font-semibold text-gray-800">
                Application Fee
              </p>
              <p className="mt-1 text-sm text-gray-500">
                The final fee and payable amount will be shown by the
                payment gateway before you confirm payment.
              </p>
            </div>

            <div className="mt-7">
              <PaymentButton
  tuitionId={tuition._id}
  studentId={session.user.id}
/>
            </div>

            <p className="mt-4 text-center text-xs text-gray-500">
              Your payment will be verified by the server before your
              application is marked as paid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
