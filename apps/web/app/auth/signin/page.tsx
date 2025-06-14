import Link from "next/link";
import SignInForm from "./signinForm";
import { BACKEND_URL } from "@/lib/constants";

export default function SignInPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      <SignInForm />
      <hr />
      <a
        className="border px-4 py-2 rounded bg-sky-600 text-white"
        href={`${BACKEND_URL}/auth/google/login`}
      >
        Sign In With Google
      </a>
      <div className="flex justify-between text-sm">
        <p>Do not have an account?</p>
        <Link href="/auth/signup">
          <p className="text-sm text-blue-800 underline">Sign Up</p>
        </Link>
      </div>
      <div className="flex flex-col gap-2"></div>
    </div>
  );
}
