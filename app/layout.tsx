import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raising F(r)ame",
  description:
    "Raising funds for your startup? Let VCs know you're raising and close rounds faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <nav className="fixed top-0 left-0 right-0 p-6 z-10">
          <div className="max-w-7xl mx-auto">
            <a
              className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              href="/"
            >
              thirdlyr
            </a>
          </div>
        </nav>

        <div className="min-h-screen flex items-center justify-center px-4">
          <main className="max-w-[512px] mx-auto text-center">{children}</main>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full p-6 text-center text-gray-600">
          <p>
            Inspired with ❤️ by{" "}
            <a
              href="https://x.com/jonathanzliu"
              target="_blank"
              className="underline hover:text-gray-800 transition-colors"
            >
              jonathan
            </a>{" "}
            and{" "}
            <a
              href="https://x.com/oliverwb_"
              target="_blank"
              className="underline hover:text-gray-800 transition-colors"
            >
              oliver
            </a>
            , built by{" "}
            <a
              href="https://linkedin.com/in/jackietanyen"
              target="_blank"
              className="underline hover:text-gray-800 transition-colors"
            >
              jackie
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
