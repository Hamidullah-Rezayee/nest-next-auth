"use client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });

    router.replace("/auth/signin");
    router.refresh();
  }

  return <button onClick={handleSignOut}>Sign out</button>;
}
