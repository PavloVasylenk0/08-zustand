import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub - Manage Your Notes Efficiently",
  description:
    "NoteHub is a simple and efficient application designed for managing personal notes. Keep your thoughts organized and accessible in one place.",
  openGraph: {
    title: "NoteHub - Manage Your Notes Efficiently",
    description:
      "NoteHub is a simple and efficient application designed for managing personal notes.",
    url: "https://notehub.com/home",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Application",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
