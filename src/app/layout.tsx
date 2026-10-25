import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { LaunchLoader } from "@/components/layout/LaunchLoader";
import { Navbar } from "@/components/layout/Navbar";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { LOADER_SESSION_KEY, LOADER_SKIP_CLASS } from "@/lib/loader";
import { site } from "@/lib/site";
import { ThemeRegistry } from "@/theme/ThemeRegistry";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Synorbit | Website and Web Application Development",
    template: "%s | Synorbit",
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
  colorScheme: "dark",
};

/**
 * Runs before first paint: the launch loader plays once per browser session.
 * Later page loads in the same session hide it immediately.
 */
const loaderScript = `(function(){try{var k=${JSON.stringify(LOADER_SESSION_KEY)};if(sessionStorage.getItem(k)){document.documentElement.classList.add(${JSON.stringify(LOADER_SKIP_CLASS)})}else{sessionStorage.setItem(k,"1")}}catch(e){}})();`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/android-chrome-512x512.png`,
  email: site.email,
  sameAs: [site.instagram],
  contactPoint: site.phones.map((phone) => ({
    "@type": "ContactPoint",
    telephone: phone.tel,
    contactType: "sales",
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The loader script may add a class to <html> before hydration.
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
      </head>
      <body>
        <LaunchLoader />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeRegistry>
          <Navbar />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <RevealObserver />
        </ThemeRegistry>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
