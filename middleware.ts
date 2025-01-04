import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const publicRoutes = ["/", "/forget-password", "/api/webhooks/clerk"];

// Define protected routes
const isProtectedRoute = createRouteMatcher(["/client"]);

export default clerkMiddleware((auth, req) => {
  const urlPath = req.nextUrl.pathname;

  // Allow public routes without authentication
  if (publicRoutes.includes(urlPath)) {
    return;
  }

  // Protect the route if it matches the protected routes
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
