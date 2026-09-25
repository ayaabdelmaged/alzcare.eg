import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Icons
const BrainIcon = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54"/>
  </svg>
);

const ShieldIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const HeartIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const MailIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

// Social Icons
const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Footer = memo(() => {
  // Memoize static data to prevent recreation on every render
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Family Dashboard', path: '/family-dashboard' },
    { name: 'Doctor Dashboard', path: '/doctor-dashboard' },
    { name: 'About Us', path: '/about' },
  ];

  const resources = [
    { name: 'Documentation', path: '#' },
    { name: 'Research Papers', path: '#' },
    { name: 'Case Studies', path: '#' },
    { name: 'API Access', path: '#' },
    { name: 'Help Center', path: '#' },
  ];

  const legal = [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Cookie Policy', path: '#' },
    { name: 'HIPAA Compliance', path: '#' },
  ];

  const socialLinks = useMemo(() => [
    { icon: FacebookIcon, href: '#', label: 'Facebook' },
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
  ], []);

  return (
    <footer 
      className="relative bg-[#0a0118] border-t border-purple-500/10 mt-auto"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-white/[0.05]">
          <div className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-500/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Stay Updated with ALZCare.eg
                </h3>
                <p className="text-purple-200">
                  Get the latest updates on Alzheimer's care innovation and AI breakthroughs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
                <button className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Subscribe
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 p-2.5 rounded-xl text-white">
                    <BrainIcon />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    ALZCare.eg
                  </h2>
                  <p className="text-sm text-gray-500">AI-Powered Assistive System for Alzheimer's Patients</p>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Empowering Alzheimer's patients and their families with compassionate AI technology 
                and 24/7 support. Building a world where no one faces memory loss alone.
              </p>
              
              {/* Social Links */}
              <nav aria-label="Social media links" className="flex space-x-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`Follow us on ${label}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="h-11 w-11 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0118]"
                  >
                    <Icon />
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Links */}
            <nav aria-labelledby="footer-quick-links">
              <h3 id="footer-quick-links" className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-3" role="list">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm focus:outline-none focus:text-purple-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Resources */}
            <nav aria-labelledby="footer-resources">
              <h3 id="footer-resources" className="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3" role="list">
                {resources.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.path}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm focus:outline-none focus:text-purple-400"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact & Trust */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h3>
              <div className="space-y-4">
                <a href="mailto:support@neurocare-ai.com" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  <div className="h-9 w-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <MailIcon />
                  </div>
                  <span>alzcare@gmail.com</span>
                </a>
                <a href="tel:1-800-123-4567" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  <div className="h-9 w-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <PhoneIcon />
                  </div>
                  <span>03541234567</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="h-9 w-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <MapPinIcon />
                  </div>
                  <span>Alexandria, Egypt</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center text-white">
                    <ShieldIcon />
                  </div>
                  <span className="font-semibold text-white text-sm">HIPAA Compliant</span>
                </div>
                <p className="text-xs text-gray-500">Enterprise-grade security & encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/[0.05]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <span>© {currentYear} ALZCare.eg. All rights reserved.</span>
              <div className="flex items-center gap-4">
                {legal.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
