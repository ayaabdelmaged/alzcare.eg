import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu';

// Icons
const BrainIcon = () => (
  <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54"/>
  </svg>
);

const UserCircleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="10" r="3"/>
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
  </svg>
);

const MenuIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

const XIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const ChevronDownIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

// Dashboard icons
const FamilyIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const DoctorIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
    <circle cx="20" cy="10" r="2"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const Navbar = memo(({ isExpanded = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const [navExpanded, setNavExpanded] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // Trigger expansion animation when isExpanded prop changes
  useEffect(() => {
    if (isExpanded) {
      // Small delay to ensure the initial narrow state is rendered first
      const timer = setTimeout(() => {
        setNavExpanded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Update active indicator position
  useEffect(() => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector('[data-active="true"]');
      if (activeLink) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setActiveIndicator({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      }
    }
  }, [location.pathname]);

  // Memoize static data
  const navItems = useMemo(() => [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/dashboard' },
  ], []);

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  // Menu items for StaggeredMenu
  const menuItems = useMemo(() => [
    { label: 'Home', link: '/' },
    { label: 'Features', link: '/features' },
    { label: 'About', link: '/about' },
    { label: 'Dashboard', link: '/dashboard' },
  ], []);

  const socialItems = useMemo(() => [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'GitHub', link: 'https://github.com' },
  ], []);
  
  // Memoized toggle handler
  const handleToggle = useCallback((value) => {
    setIsOpen(value);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pt-4 ${isOpen ? 'z-[9998]' : 'z-[9999]'}`}>
        <nav 
          className={`mx-auto transition-all rounded-2xl ${
            navExpanded ? 'max-w-7xl duration-700 ease-out' : 'max-w-md duration-0'
          } ${
            scrolled 
              ? 'bg-[#0d0520]/95 shadow-[0_8px_40px_rgba(124,58,237,0.25)] border border-purple-500/20' 
              : 'bg-[#0d0520]/80 shadow-[0_4px_24px_rgba(124,58,237,0.15)] border border-white/5'
          }`}
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            transform: navExpanded ? 'scale(1)' : 'scale(0.95)',
            opacity: navExpanded ? 1 : 0.9,
            transition: navExpanded 
              ? 'max-width 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out, background-color 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease'
              : 'none',
          }}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className={`px-6 lg:px-8 transition-all duration-700 ${navExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-center h-[72px]">
              
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  {/* Logo container */}
                  <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 p-2.5 rounded-xl shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-[1.02]">
                    <BrainIcon />
                    {/* Online indicator */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
                    </span>
                  </div>
                </div>
                {/* Mobile: Show name */}
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
                    ALZCare.eg
                  </h1>
                </div>
                {/* Desktop: Show name + tagline */}
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
                    ALZCare.eg
                  </h1>
                  <p className="text-[11px] text-gray-400 font-medium tracking-wide">AI-Powered Alzheimer's Care</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center">
                {/* Nav Links with animated indicator */}
                <div ref={navRef} className="relative flex items-center bg-white/[0.03] rounded-full p-1.5 border border-white/[0.05]">
                  {/* Animated background indicator */}
                  <div 
                    className="absolute h-[calc(100%-12px)] bg-purple-500/20 rounded-full transition-all duration-300 ease-out"
                    style={{
                      left: activeIndicator.left + 6,
                      width: activeIndicator.width - 12,
                      opacity: activeIndicator.width > 0 ? 1 : 0,
                    }}
                  />
                  
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      data-active={isActive(item.path)}
                      className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-purple-300'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth Buttons & Mobile Menu */}
              <div className="flex items-center gap-2">
                {/* Sign In - Text button */}
                <Link
                  to="/auth/login"
                  className="hidden lg:flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-full hover:bg-white/[0.05] transition-all duration-300"
                >
                  Sign In
                </Link>
                
                {/* Get Started - Primary CTA */}
                <Link
                  to="/auth/signup"
                  className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <span>Get Started</span>
                  <ArrowRightIcon />
                </Link>
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2.5 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                  {isOpen ? <XIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        </header>

      {/* Staggered Mobile Menu */}
      <div className="lg:hidden" id="mobile-menu">
        <StaggeredMenu
          isOpen={isOpen}
          onToggle={handleToggle}
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          isFixed={true}
          accentColor="#7C3AED"
          closeOnClickAway={true}
          onMenuClose={handleMenuClose}
        />
      </div>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
