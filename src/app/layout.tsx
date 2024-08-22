import type { Metadata } from "next";
import "./globals.css";
import ReactProvider from "@/redux/AppProvider";
import Footer from "../components/Footer";
import Header from "@/components/Header";
import CompleteProfile from "@/components/CompleteProfile";


export const metadata: Metadata = {
  title: "Web3 Tech Blog",
  description: "Get all Crypto News and Update",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="en">
      <body className="bg-bgPrimary h-auto">
        <ReactProvider>
          <CompleteProfile/>
          <Header/>
            <main className="pt-24">
              {children}
            </main>
          <Footer/>
        </ReactProvider>
      </body>
    </html>
    </>
  );
}

