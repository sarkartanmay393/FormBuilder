import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FormContextProvider from "./context";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Formbuilder",
  description: "An app by Peerlist Interviewee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <FormContextProvider>{children}</FormContextProvider>
      </body>
    </html>
  );
}
