import { getSession } from "@/lib/session";
import Link from "next/link";
import SignOutButton from "./signOutButton";

export default async function SignButtons() {
  const session = await getSession();
  return (
    <div className="flex items-center gap-2 ml-auto">
      {!session || !session.user ? (
        <>
          <Link href="/auth/signin">Sign In</Link>
          <Link href="/auth/signup">Sign Up</Link>
        </>
      ) : (
        <>
          <p>{session.user.name}</p>
          <SignOutButton />
        </>
      )}
    </div>
  );
}
