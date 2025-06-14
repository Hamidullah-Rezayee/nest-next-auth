"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { SignUP } from "@/lib/auth";
import { useActionState } from "react";
export default function SignUpForm() {
  const [state, formAction] = useActionState(SignUP, undefined);
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-2">
        {state?.message && <div className="text-red-500">{state?.message}</div>}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            className="p-10"
          />
        </div>
        {state?.error?.name && (
          <p className="text-red-500 text-sm">{state?.error?.name}</p>
        )}
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
        <SubmitButton>Sign In</SubmitButton>
      </div>
    </form>
  );
}
