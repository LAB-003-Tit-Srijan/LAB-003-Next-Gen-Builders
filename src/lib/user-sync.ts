import type { User } from "firebase/auth";

export async function syncAuthenticatedUserToMongo(user: User) {
  const token = await user.getIdToken();
  const response = await fetch("/api/users/sync", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to sync user profile (${response.status}).`);
  }
}
