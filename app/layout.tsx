import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meus Presentes - Listas de Presentes Personalizadas",
  description: "Crie e compartilhe listas de presentes para qualquer ocasião. Casamento, aniversário, chá de casa nova e muito mais!",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
            {children}
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
