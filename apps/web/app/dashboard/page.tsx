import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  console.log("Session: ", session);
  if (!session || !session.user) redirect("/auth/signin");
  return <h1>Dashboard</h1>;
}
