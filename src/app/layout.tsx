import type { Metadata } from "next";
import { Inter_Tight, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nivaran.ai — Enterprise Post-Discharge Telemetry OS",
  description:
    "Autonomous post-discharge clinical intelligence platform built for hospital networks and surgical centers. Zero hardware, continuous vernacular voice and computer-vision wound monitoring, and on-chain tamper-proof telemetry.",
  keywords: [
    "Healthcare SaaS",
    "Post-Discharge Care",
    "Hospital Information System",
    "ASEPSIS Wound Grading",
    "Clinical Decision Support",
    "Agentic AI",
    "Healthcare Telemetry",
    "ABDM FHIR",
    "Nivaran",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <html lang="en" className={`${interTight.variable} ${playfair.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground font-sans">
        {children}
      </body>
    </html>
  );

  if (clerkKey && clerkKey.startsWith("pk_")) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
