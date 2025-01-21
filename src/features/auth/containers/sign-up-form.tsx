"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { ButtonLink } from "../ui/button-link";
import { SubmitButton } from "../ui/submit-button";
import { ErrorMassage } from "../ui/submit-button copy";
import { right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";
import { signUpAction } from "../actions/sign-up";

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    right(undefined),
  );

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account to get started"
      action={action}
      fields={<AuthFields />}
      actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
      error={<ErrorMassage error={formState} />}
      link={
        <ButtonLink
          text="Already have an account?"
          linkText="Sign In"
          url="/sign-in"
        />
      }
    />
  );
}
