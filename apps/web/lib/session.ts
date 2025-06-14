"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    id: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encoded = new TextEncoder().encode(secretKey);

export async function CreateSession(payload: Session) {
  // Correct expiration calculation: add 7 days to now
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encoded);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, encoded, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (error) {
    console.error("Failed to verify the session", error);
    redirect("/auth/signin");
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookieStore = await cookies();
  console.log("All cookies:", cookieStore.getAll());
  const cookie = cookieStore.get("session")?.value;
  console.log("Cookie: ", cookie);
  if (!cookie) {
    console.error("Session cookie not found!");
    return null;
  }

  const { payload } = await jwtVerify<Session>(cookie, encoded);
  console.log("payload: ", payload);

  if (!payload) throw new Error("Session not found!");

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  };
  console.log("newPayload: ", newPayload);
  await CreateSession(newPayload);
  console.log("from update session");
}
