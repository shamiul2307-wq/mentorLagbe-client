
"use client";

import { AuthForm } from "@/components/auth-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = async (data: Record<string, string>) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <AuthForm
      mode="sign-in"
      onSubmit={handleSignIn}
    />
  );
}
