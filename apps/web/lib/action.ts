"use server";

import authFetch from "./authFetch";
import { BACKEND_URL } from "./constants";

export default async function Action() {
  // const session = await getSession();
  // const response = await fetch(`${BACKEND_URL}/auth/protected`, {
  //   headers: {
  //     Authorization: `Bearer ${session?.accessToken}`,
  //   },
  // });

  const response = await authFetch(`${BACKEND_URL}/auth/protected`);
  const result = response.json();
  return result;
}
