/**
 * Verified business details, taken from the previous live site
 * (synorbit.vercel.app). Do not add details here that the business
 * has not confirmed.
 */
export const site = {
  name: "Synorbit",
  // Set NEXT_PUBLIC_SITE_URL to the permanent production domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://synorbit.vercel.app").replace(/\/$/, ""),
  description:
    "Synorbit designs and develops modern websites and custom web applications for startups, growing businesses, and established organisations.",
  email: "synorbit.solutions@gmail.com",
  phones: [
    { display: "+91 95132 76042", tel: "+919513276042", whatsapp: "https://wa.me/919513276042" },
    { display: "+91 63618 34699", tel: "+916361834699", whatsapp: "https://wa.me/916361834699" },
  ],
  instagram: "https://www.instagram.com/synorbit/",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
] as const;
