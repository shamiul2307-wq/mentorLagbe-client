 
"use client";

import { AuthForm } from "@/components/auth-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = async (data: Record<string, string>) => {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role as "student" | "tutor",
    });

    if (error) {
      throw new Error(error.message);
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <AuthForm
      mode="sign-up"
      onSubmit={handleSignUp}
    />
  );
}

 

