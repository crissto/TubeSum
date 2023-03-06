import { Inter } from "next/font/google";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
