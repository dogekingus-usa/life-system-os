// site.ts — LifeSystemOS per-site config (Phase 1.2 shared library)
export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  logo?: { src: string; alt: string };
  nav: { href: string; label: string }[];
  footerColumns: { heading: string; links: { href: string; label: string }[] }[];
  social: { label: string; href: string }[];
  newsletter: { magnetName: string; valueProp: string; downloadUrl: string };
  legalNote: string;
}

export const site: SiteConfig = {
  name: 'LifeSystemOS',
  tagline: 'Build your life operating system — productivity, systems, habits, and mental clarity.',
  url: 'https://lifesystemos.com',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/all-articles', label: 'Articles' },
    { href: '/about', label: 'About' },
  ],
  footerColumns: [
    {
      heading: 'Quick Links',
      links: [
        { href: '/all-articles', label: 'All Articles' },
        { href: '/about', label: 'About' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { href: '/checklist', label: 'Checklist' },
        { href: '/products', label: 'Products' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy' },
        { href: '/disclaimer', label: 'Disclaimer' },
      ],
    },
  ],
  social: [
    { label: 'X', href: 'https://x.com/LifeSystemOS' },
    { label: 'YouTube', href: 'https://www.youtube.com/@LifeSystemOS' },
  ],
  newsletter: {
    magnetName: 'Life OS Starter Kit',
    valueProp: 'Get the free Life OS Starter Kit — the core templates and routines to run your life like a system.',
    downloadUrl: '/downloads/life-os-starter-kit.html',
  },
  legalNote: 'For general information only, not medical advice.',
};
