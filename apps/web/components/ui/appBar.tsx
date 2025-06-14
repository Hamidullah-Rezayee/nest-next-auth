import Link from "next/link";
import SignButtons from "./signButtons";

export default function AppBar() {
  return (
    <div className="p-2 h-10 shadow gap-3 bg-gradient-to-br from-blue-400 to-cyan-400 text-white flex items-center justify-between">
      <div className="flex justify-between gap-3">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/profile">Profile</Link>
      </div>
      <SignButtons />
    </div>
  );
}
