import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'Portfolio', href: '#projects', icon: '👁️' },
    { name: 'Services', href: '#services', icon: '⚡' },
    { name: 'Testimonials', href: '#testimonials', icon: '💬' },
    { name: 'Contact', href: '#contact', icon: '📞' },
    { name: 'Blog', href: '/blog', icon: '📝' }
  ];

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container-max">
          <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6">
            
            {/* Logo */}
            <div className="flex items-center space-x-2 text-primary font-bold text-lg sm:text-xl">
              <span>⚡</span>
              <span>IZHAR ULLAH</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => handleNavClick('#contact')}
                className="btn-primary px-6 py-2 text-sm font-semibold transition-transform duration-300 hover:scale-105"
              >
                Let's Connect
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden mobile-menu-container">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`relative w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center transition-all duration-300 ${
                  isMobileMenuOpen ? 'bg-primary text-primary-foreground' : 'text-primary hover:bg-primary/30'
                }`}
                aria-label="Toggle mobile menu"
              >
                <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                  <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                  }`}></span>
                  <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        isMobileMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        {/* Menu Panel */}
        <div className={`absolute top-16 sm:top-20 right-4 w-72 max-w-[calc(100vw-2rem)] bg-background border border-border rounded-lg shadow-2xl transition-all duration-300 mobile-menu-container ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : '-translate-y-4 opacity-0 scale-95'
        }`}>
          
          {/* Menu Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-2 text-primary font-bold">
              <span>⚡</span>
              <span>Navigation Menu</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left hover:bg-primary/10 transition-colors duration-200 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="font-medium group-hover:text-primary transition-colors duration-200">
                  {item.name}
                </span>
                <span className="ml-auto text-muted-foreground group-hover:text-primary transition-colors duration-200">
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Menu Footer */}
          <div className="p-4 border-t border-border">
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full btn-primary py-3 text-sm font-semibold transition-transform duration-300 hover:scale-105"
            >
              Let's Connect
            </button>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-3 mt-4">
              {[
                { icon: "📧", link: "mailto:izharullah@example.com", label: "Email" },
                { icon: "💼", link: "https://linkedin.com/in/izharullah", label: "LinkedIn" },
                { icon: "🎨", link: "https://behance.net/izharullah", label: "Portfolio" },
                { icon: "📱", link: "https://wa.me/92XXXXXXXXX", label: "WhatsApp" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-sm hover:bg-primary/30 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
};

export default Navigation;

