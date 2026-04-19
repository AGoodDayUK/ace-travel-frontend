import { Link } from 'wouter';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { trpc } from '@/lib/trpc';
import { useMemo } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const settingsQuery = trpc.cms.settings.getPublic.useQuery();
  const s = useMemo(() => {
    const map: Record<string, string> = {};
    settingsQuery.data?.forEach(r => { map[r.key] = r.value ?? ''; });
    return map;
  }, [settingsQuery.data]);

  const footerLinks = {
    destinations: [
      { href: '/destinations/thailand', label: 'Thailand' },
      { href: '/destinations/bali', label: 'Bali' },
      { href: '/destinations/philippines', label: 'Philippines' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/reviews', label: 'Reviews' },
      { href: '/blogs-vlogs', label: 'Vlogs, Blogs & Frogs' },
      { href: '/contact', label: 'Contact' },
    ],
    support: [
      { href: '/faq', label: 'FAQ' },
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
  };

  const socialLinks = [
    { href: s.contact_instagram || 'https://www.instagram.com/acetravelexperiences/', icon: Instagram, label: 'Instagram' },
    { href: s.contact_tiktok || 'https://www.tiktok.com/@acetravelexperiences', icon: FaTiktok, label: 'TikTok' },
    { href: s.contact_facebook || 'https://www.facebook.com/groups/565386292003692', icon: Facebook, label: 'Facebook' },
    { href: `mailto:${s.contact_email || 'admin@acetravelexperiences.com'}`, icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Link href="/" className="mb-4 inline-block">
              <img src="/ace-logo-circle-white.png" alt="ACE Travel Experiences" className="h-16" />
            </Link>
            <p className="text-background/80 text-sm leading-relaxed max-w-xs">
              Epic group travel experiences in Thailand, Bali, and the Philippines for 18-35 year olds. Your first adventure with your future best friends.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-[#ee2f6d]/30 border-2 border-[#ee2f6d]/70 text-[#ff4d8d] hover:bg-[#ee2f6d] hover:border-[#ee2f6d] hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold tracking-tight mb-4 uppercase">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-background/80 hover:text-accent text-sm transition-kinetic kinetic-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold tracking-tight mb-4 uppercase">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-background/80 hover:text-accent text-sm transition-kinetic kinetic-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold tracking-tight mb-4 uppercase">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-background/80 hover:text-accent text-sm transition-kinetic kinetic-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/20 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>© {currentYear} ACE Travel Experiences. All rights reserved.</p>
          <p className="text-xs">
            Designed with precision. Built for adventure.
          </p>
        </div>
      </div>
    </footer>
  );
}
