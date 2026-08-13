import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ProcDNA",
    template: "%s | ProcDNA",
  },
  description:
    "Data, analytics, and technology solutions for businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-200 bg-white text-gray-900">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <a
              href="/"
              className="text-xl font-bold text-gray-900"
            >
              ProcDNA
            </a>

            <nav className="flex items-center gap-8">
              <a
                href="/"
                className="text-sm text-gray-700 hover:text-black"
              >
                Home
              </a>

              <a
                href="/articles"
                className="text-sm text-gray-700 hover:text-black"
              >
                Articles
              </a>

              <a
                href="/about"
                className="text-sm text-gray-700 hover:text-black"
              >
                About
              </a>

              <a
                href="/contact"
                className="text-sm text-gray-700 hover:text-black"
              >
                Contact
              </a>
            </nav>

            <a
              href="/contact"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
            >
              Contact Us
            </a>
          </div>
        </header>

        <main className="min-h-screen bg-white text-gray-900">
          {children}
        </main>
      </body>
    </html>
  );
}