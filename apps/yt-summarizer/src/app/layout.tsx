import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Background from "../components/background";
import SupabaseListener from "../components/supabase-listener";
import SupabaseProvider from "../components/supabase-provider";
import { createClient } from "../utils/supabase-server";
import "./globals.css";

export const metadata = {
  title: "TubeSum",
  description:
    "Get a summary of a youtube video in a few seconds. By @crissto39",
};

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Background />
          <main className="flex min-h-screen flex-col max-w-2xl mx-auto mt-4 mb-12">
            {children}
          </main>
          <Analytics />
        </SupabaseProvider>
      </body>
    </html>
  );
}
