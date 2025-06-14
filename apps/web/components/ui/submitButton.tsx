"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} className="w-full mb-2">
      {pending ? (
        <span className="animate-pulse">Submitting...</span>
      ) : (
        children
      )}
    </Button>
  );
}
