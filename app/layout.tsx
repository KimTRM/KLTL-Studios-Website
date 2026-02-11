import type { Metadata } from "next";
import "./globals.css";
import Header from "@/features/site/components/Header";
import Footer from "@/features/site/components/Footer";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata: Metadata = {
  title: {
    default: "KLTL Studios | Kim Louise Labrador - Developer, Designer, Musician",
    template: "%s | KLTL Studios"
  },
  description: "Portfolio of Kim Louise Labrador - Full-stack developer, game developer, UI/UX designer, and musician. Specializing in web development, game development with Godot, and interactive experiences.",
  keywords: ["Kim Louise Labrador", "KLTL Studios", "Web Developer", "Game Developer", "UI/UX Designer", "Full Stack Developer", "React", "Next.js", "Godot", "TypeScript", "Portfolio"],
  authors: [{ name: "Kim Louise Labrador", url: "https://github.com/kimtrm" }],
  creator: "Kim Louise Labrador",
  publisher: "KLTL Studios",
  metadataBase: new URL("https://kltl-studios.github.io"),
  icons: {
    icon: "/res/icon/KLTL_Studios.svg",
    apple: "/res/icon/KLTL_Studios.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kltl-studios.github.io",
    siteName: "KLTL Studios",
    title: "KLTL Studios | Kim Louise Labrador - Developer, Designer, Musician",
    description: "Portfolio of Kim Louise Labrador - Full-stack developer, game developer, UI/UX designer, and musician. Explore my projects and creative work.",
    images: [
      {
        url: "/res/DSC_1453.png",
        width: 1200,
        height: 630,
        alt: "KLTL Studios - Kim Louise Labrador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KLTL Studios | Kim Louise Labrador",
    description: "Developer, Designer, Musician - Explore my portfolio of web development, game development, and creative projects.",
    creator: "@kltlstudios",
    images: ["/res/DSC_1453.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
