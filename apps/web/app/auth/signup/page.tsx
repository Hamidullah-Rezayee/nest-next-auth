import Link from "next/link";
import SignUpForm from "./signupForm";

export default function SignUpPage() {
  return (
    <div className="bg-white text-black p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up page </h1>
      <SignUpForm />
      <div className="flex justify-between text-sm">
        <p>Already have an account?</p>
        <Link href="/auth/signin">
          <p className="text-blue-800 ml-2 underline">Sign In</p>
        </Link>
      </div>
    </div>
  );
}
