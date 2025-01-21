"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { ButtonLink } from "../ui/button-link";
import { SubmitButton } from "../ui/submit-button";
import { ErrorMassage } from "../ui/submit-button copy";
import { signInAction, SignInFormState } from "../actions/sign-in";
import { useActionState } from "@/shared/lib/react";

export function SignInForm() {
  const [formState, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState,
  );

  return (
    <AuthFormLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account."
      action={action}
      fields={<AuthFields {...formState} />}
      actions={<SubmitButton isPending={isPending}>Sign In</SubmitButton>}
      error={<ErrorMassage error={formState.errors?._errors} />}
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
