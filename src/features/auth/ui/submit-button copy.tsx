import { Either, matchEither } from "@/shared/lib/either";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import React from "react";

export function ErrorMassage({ error }: { error: Either<string, null> }) {
  return matchEither(error, {
    left: (error) => (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    ),
    right: () => null,
  });
}
