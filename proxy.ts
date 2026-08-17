import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const url = request.nextUrl;
  const pathname = url.pathname;

  const publicPaths = [
    "/",
    "/busca",
    "/relatorio",
    "/auth/login",
    "/auth/cadastro",
    "/auth/confirm",
    "/privacidade",
    "/termos",
    "/contato",
    "/api/analyze",
    "/api/scanner/search",
    "/api/google/usage",
    "/api/stripe/webhook",
    "/_next",
  ];

  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!isPublic && !user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    (pathname === "/auth/login" || pathname === "/auth/cadastro") &&
    user
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/leads/:path*",
    "/opportunities/:path*",
    "/intelligence/:path*",
    "/notifications/:path*",
    "/settings/:path*",
    "/auth/login",
    "/auth/cadastro",
  ],
};
