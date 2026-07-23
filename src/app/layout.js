import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { StoreProvider } from "@/store/provider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AuthHydrator } from "@/features/auth/components/AuthHydrator";
import { getServerSession } from "@/lib/auth/session";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Hiring",
  description: "Multi-tenant smart hiring SaaS platform",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StoreProvider>
          <ThemeProvider>
            <AuthHydrator session={session} />
            {children}
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
