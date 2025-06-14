"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { CreateSession } from "./session";
import { FormState, SignInFormSchema, SignUpFormSchema } from "./types";

export async function SignUP(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect("/auth/signin");
  } else {
    return {
      message:
        response.status === 409
          ? "The user is already existed!"
          : response.statusText,
    };
  }
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    const result = await response.json();
    await CreateSession({
      user: {
        id: result.id,
        name: result.name,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    redirect("/");
  } else {
    return {
      message:
        response.status === 401 ? "Invalid Credentials!" : response.statusText,
    };
  }
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${oldRefreshToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to refresh token!");

    const { accessToken, refreshToken } = await response.json();

    const updateRes = await fetch("http://localhost:3000/api/auth/update", {
      method: "POST",
      body: JSON.stringify({ accessToken, refreshToken }),
      credentials: "include", // <-- THIS IS REQUIRED!
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!updateRes) throw new Error("Failed to update the tokens");

    return accessToken;
  } catch (error) {
    console.error("Refresh token failed: ", error);
    return null;
  }
};
