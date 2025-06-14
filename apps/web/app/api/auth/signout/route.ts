import authFetch from "@/lib/authFetch";
import { BACKEND_URL } from "@/lib/constants";
import { deleteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
  const signout = await authFetch(`${BACKEND_URL}/auth/signout`, {
    method: "POST",
  });
  if (signout) {
    await deleteSession();
  }

  return NextResponse.json({ success: true });
}
