import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ModalContextProvider } from "@/contexts/ModalContext";
import styles from "@/app/page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ModalContextProvider>
        <body className={inter.className}>
          <div id="overlay-root"></div>
          <main className={`${styles["main"]} mflex`}>{children}</main>
        </body>
      </ModalContextProvider>
    </html>
  );
}
