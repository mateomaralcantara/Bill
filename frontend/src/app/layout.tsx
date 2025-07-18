import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "ImpuestosRD | Tu Tranquilidad Fiscal",
  description: "Asesoría fiscal moderna y automatizada para República Dominicana.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex flex-col items-center px-2">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
