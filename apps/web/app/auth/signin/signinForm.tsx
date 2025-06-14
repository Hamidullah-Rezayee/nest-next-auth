"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function SignInForm() {
  const [state, formAction] = useActionState(signIn, undefined);
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-2">
        {state?.message && <div className="text-red-500">{state?.message}</div>}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            className="p-10"
          />
        </div>
        {state?.error?.email && (
          <p className="text-red-500 text-sm">{state?.error?.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="p-10"
          />
        </div>
        {state?.error?.password && (
          <p className="text-red-500 text-sm">{state?.error?.password}</p>
        )}
        <Link className="text-sm underline" href="#">
          Forgot your password?
        </Link>
        <SubmitButton>Sign In</SubmitButton>
      </div>
    </form>
  );
}
