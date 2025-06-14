import { CreateSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");

  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);
  console.log("userId", userId);
  console.log("name", name);

  if (!accessToken || !refreshToken || !userId || !name)
    throw new Error("Failed google oAuth");
  await CreateSession({
    user: {
      id: userId,
      name,
    },
    accessToken,
    refreshToken,
  });

  redirect("/");
}
