import type { H3Event } from "h3";
import cryptoRandomString from "crypto-random-string";
import jsonwebtoken from "jsonwebtoken";
import { findUserByEmail, findUserById, updateOne } from "~/shared/lib/users";

export async function createSession(
  email: string
): Promise<{ sessionToken: string; userId: string | number } | undefined> {
  const sessionToken = cryptoRandomString({ length: 21, type: "base64" });
  const csrfToken = cryptoRandomString({ length: 21, type: "base64" });
  const user = await findUserByEmail(email);
  if (user) {
    const updated = await updateOne(user.id, { sessionToken, csrfToken });
    if (updated) {
      return { sessionToken, userId: user.id };
    }
    return undefined;
  }
}

export async function getCsrfToken(userId: string) {
  const result = await findUserById(userId);
  // console.log('getCsrfToken.user:', result, userId)

  const secret = process.env.NUXT_SESSION_PASSWORD;
  if (secret && secret.length === 32 && result) {
    return jsonwebtoken.sign({ csrfToken: result.csrfToken }, secret, {
      expiresIn: 1,
    });
  }
}

export async function verifyCsrfToken(userId: string, jwt: string) {
  const secret = process.env.NUXT_SESSION_PASSWORD;
  if (secret && secret.length === 32) {
    try {
      const payload = jsonwebtoken.verify(jwt, secret) as { csrfToken: string };
      const token = payload.csrfToken;
      const user = await findUserById(userId);
      return user !== undefined && user.csrfToken !== null
        ? user.csrfToken === token
        : false;
    } catch {
      return false;
    }
  } else {
    return false;
  }
}

export async function verifyCsrf(event: H3Event, session: { userId: string }) {
  const csrfToken = await getRequestHeader(event, "X-CSRF-Token");
  if (typeof csrfToken !== "string") throw createError({ status: 401 });
  if (!(await verifyCsrfToken(session.user.id, csrfToken)))
    throw createError({ status: 401 });
}
