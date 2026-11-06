export type SocialNetwork =
  "facebook" | "instagram" | "linkedin" | "x" | "youtube";

interface SocialLink {
  network: SocialNetwork;
  name: string;
  url: string;
}

// Links published at https://www.utem.cl/; checked on 6 November 2026.
export const socialLinks: SocialLink[] = [
  {
    network: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/utem.cl",
  },
  {
    network: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/utem.cl/",
  },
  {
    network: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/school/universidad-tecnol%C3%B3gica-metropolitana/?originalSubdomain=es",
  },
  { network: "x", name: "X", url: "https://x.com/utem" },
  {
    network: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCOD3DHD_bafDGzGPYxTtRRw",
  },
];
