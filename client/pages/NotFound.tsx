import AppShell from "@/components/layout/AppShell";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <AppShell>
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="w-full max-w-lg rounded-[32px] border border-border bg-card/88 p-8 text-center shadow-[0_24px_70px_rgba(77,73,122,0.12)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">404</p>
          <h2 className="mt-4 text-3xl font-semibold text-foreground">This page is still a placeholder</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            There is nothing here yet. Return home to the habit tracker, or continue prompting if you want this route designed next.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_rgba(109,94,252,0.28)] transition hover:translate-y-[-1px]"
          >
            Return home
          </Link>
        </div>
      </div>
    </AppShell>
  );
};

export default NotFound;
