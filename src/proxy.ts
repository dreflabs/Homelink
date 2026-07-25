import NextAuth from "next-auth";
import { authConfig } from "../auth.config";
import { jsendFail } from "@/lib/jsend";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (nextUrl.pathname.startsWith("/api/")) {
    if (!isLoggedIn) {
      return Response.json({ status: "fail", data: { message: "Unauthorized" } }, { status: 401 });
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
