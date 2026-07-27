import { SignJWT } from "jose";
async function run() {
  try {
    const encodedToken = await new SignJWT({ id: 1 })
      .setProtectedHeader({ alg: "HS512" })
      .sign(new TextEncoder().encode("your_nextauth_secret_here"));
    console.log("Success:", encodedToken);
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
