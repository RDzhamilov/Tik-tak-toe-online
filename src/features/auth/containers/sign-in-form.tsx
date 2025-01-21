"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { ButtonLink } from "../ui/button-link";
import { SubmitButton } from "../ui/submit-button";
import { ErrorMassage } from "../ui/submit-button copy";
import { right } from "@/shared/lib/either";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fil in all fields");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Success", { email, password });
      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong");
    }
  };
  return (
    <AuthFormLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account."
      onSubmit={handleSubmit}
      fields={
        <AuthFields
          login={email}
          onChangeLogin={setEmail}
          password={password}
          onChangePassword={setPassword}
        />
      }
      actions={<SubmitButton>Sign Up</SubmitButton>}
      error={<ErrorMassage error={right(null)} />}
      link={
        <ButtonLink
          text="Don't have an account?"
          linkText="Sign Up"
          url="/sign-up"
        />
      }
    />
  );
}
