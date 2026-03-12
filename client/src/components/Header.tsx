import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Calendar, MapPin, Compass, Tag, Info, HelpCircle, Users, Star, Plane, CreditCard, BookOpen } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showToursMegaMenu, setShowToursMegaMenu] = useState(false);
  const [showDestinationsMenu, setShowDestinationsMenu] = useState(false);
  const [showInfoMenu, setShowInfoMenu] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const [location] = useLocation();

  const toursByDestination = {
    Thailand: [
      { name: 'Thailand Intro', slug: 'thailand-intro', days: '12 Days', price: '£999', image: '/thailand-intro-hero.webp' },
      { name: 'Thailand Island Hopper', slug: 'thailand-island-hopper', days: '21 Days', price: '£1,599', image: '/thailand-waterfall.webp' }
    ],
    Bali: [
      { name: 'Bali Explorer', slug: 'bali-explorer', days: '14 Days', price: '£1,199', image: '/bali-temple.jpg' },
      { name: 'Bali Island Hopper', slug: 'bali-island-hopper', days: '14 Days', price: '£1,199', image: '/bali-beach.webp' }
    ],
    Philippines: [
      { name: 'Philippines Paradise', slug: 'philippines-paradise', days: '10 Days', price: '£999', image: '/philippines-lagoon.jpg' }
    ]
  };

  const destinations = [
    { 
      name: 'Thailand', 
      slug: 'thailand', 
      image: '/thailand-elephant.jpg',
      tours: '2 Tours',
      highlight: 'Temples, Islands & Night Markets',
      from: '£999'
    },
    { 
      name: 'Bali', 
      slug: 'bali', 
      image: '/bali-temple.jpg',
      tours: '2 Tours',
      highlight: 'Volcanoes, Beaches & Culture',
      from: '£1,199'
    },
    { 
      name: 'Philippines', 
      slug: 'philippines', 
      image: '/philippines-beach.jpg',
      tours: '1 Tour',
      highlight: 'Hidden Lagoons & Island Paradise',
      from: '£999'
    }
  ];

  const infoLinks = [
    { label: 'How It Works', href: '/how-it-works', icon: BookOpen, desc: '5 simple steps to paradise' },
    { label: 'FAQs', href: '/faq', icon: HelpCircle, desc: 'Got questions? We have answers' },
    { label: 'About Us', href: '/about', icon: Users, desc: 'Meet the ACE team' },
    { label: 'Reviews', href: '/reviews', icon: Star, desc: 'What our travellers say' },
    { label: 'Vlogs, Blogs & Frogs', href: '/blogs-vlogs', icon: BookOpen, desc: "Libby's travel diaries" },
    { label: 'Payments', href: '/payments', icon: CreditCard, desc: 'Flexible payment plans' },
    { label: 'Flight Support', href: '/flight-support', icon: Plane, desc: 'We help you find flights' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileDestinationsOpen(false);
    setMobileToursOpen(false);
    setMobileInfoOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Scroll progress indicator */}
      <div 
        className="scroll-progress"
        style={{ 
          width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
        }}
      />
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-kinetic ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-white lg:bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <img 
                src="/ace-logo-full.png" 
                alt="ACE Travel Experiences" 
                className="h-7 sm:h-8 lg:h-9 w-auto" 
              />
            </Link>

            {/* Desktop Navigation — only shown on lg+ */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">

              {/* Destinations Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowDestinationsMenu(true)}
                onMouseLeave={() => setShowDestinationsMenu(false)}
              >
                <button
                  className={`text-sm font-bold tracking-tight transition-kinetic flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
                    location.startsWith('/destination') 
                      ? 'bg-slate-200 text-slate-700' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Destinations
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showDestinationsMenu && (
                  <div className="absolute top-full left-0 pt-2 bg-background border border-border shadow-xl rounded-lg p-4 w-[560px] animate-fade-in z-50">
                    <div className="grid grid-cols-3 gap-3">
                      {destinations.map((dest) => (
                        <Link
                          key={dest.slug}
                          href={`/destinations/${dest.slug}`}
                          className="block group"
                        >
                          <div className="border border-border rounded-md overflow-hidden hover:border-primary transition-colors">
                            <img 
                              src={dest.image} 
                              alt={dest.name}
                              className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="p-2.5">
                              <h4 className="font-bold text-sm mb-0.5 group-hover:text-primary transition-colors">{dest.name}</h4>
                              <p className="text-xs text-muted-foreground mb-1.5 line-clamp-1">{dest.highlight}</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{dest.tours}</span>
                                <span className="font-bold text-primary">From {dest.from}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tours Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setShowToursMegaMenu(true)}
                onMouseLeave={() => setShowToursMegaMenu(false)}
              >
                <button
                  className={`text-sm font-bold tracking-tight transition-kinetic flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
                    location.startsWith('/tour') 
                      ? 'bg-[#44c5c3]/30 text-[#1a5a59]' 
                      : 'bg-[#44c5c3]/20 text-[#2a7a79] hover:bg-[#44c5c3]/30 hover:text-[#1a5a59]'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  Tours
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showToursMegaMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 bg-background border border-border shadow-xl rounded-lg p-5 w-[720px] animate-fade-in z-50">
                    <div className="grid grid-cols-3 gap-5">
                      {Object.entries(toursByDestination).map(([destination, tours]) => (
                        <div key={destination}>
                          <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {destination}
                          </h3>
                          <div className="space-y-2">
                            {tours.map((tour) => (
                              <Link
                                key={tour.slug}
                                href={`/tour/${tour.slug}`}
                                className="block group"
                              >
                                <div className="border border-border rounded-md overflow-hidden hover:border-primary transition-colors">
                                  <img 
                                    src={tour.image} 
                                    alt={tour.name}
                                    className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
                                  />
                                  <div className="p-2.5">
                                    <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{tour.name}</h4>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {tour.days}
                                      </span>
                                      <span className="font-bold text-primary">{tour.price}</span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Deals */}
              <Link 
                href="/deals"
                className={`text-sm font-bold tracking-tight transition-kinetic px-3 py-1.5 rounded-md flex items-center gap-1.5 ${
                  location === '/deals'
                    ? 'bg-[#ee2f6d]/20 text-[#c01850]' 
                    : 'bg-[#ee2f6d]/10 text-[#ee2f6d] hover:bg-[#ee2f6d]/20 hover:text-[#c01850]'
                }`}
              >
                <Tag className="w-4 h-4" />
                Deals
              </Link>

              {/* Info Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowInfoMenu(true)}
                onMouseLeave={() => setShowInfoMenu(false)}
              >
                <button
                  className={`text-sm font-bold tracking-tight transition-kinetic flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
                    ['/how-it-works','/faq','/about','/reviews','/blogs-vlogs','/payments','/flight-support'].some(p => location === p)
                      ? 'bg-violet-100 text-violet-700'
                      : 'bg-violet-50 text-violet-600 hover:bg-violet-100 hover:text-violet-700'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  Info
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showInfoMenu && (
                  <div className="absolute top-full right-0 pt-2 bg-background border border-border shadow-xl rounded-lg p-3 w-64 animate-fade-in z-50">
                    <div className="space-y-0.5">
                      {infoLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-start gap-3 px-3 py-2.5 rounded-md transition-colors group ${
                            location === item.href ? 'bg-violet-50 text-violet-700' : 'hover:bg-violet-50'
                          }`}
                        >
                          <item.icon className="w-4 h-4 mt-0.5 text-violet-500 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-semibold group-hover:text-violet-700 transition-colors">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </nav>

            {/* Desktop CTAs — only shown on lg+ */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="https://booking.acetravelexperiences.com/account/signin/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 underline-offset-4 hover:underline whitespace-nowrap"
              >
                Manage booking
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <a href="https://booking.acetravelexperiences.com/book/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight transition-kinetic whitespace-nowrap">
                  Book Now
                </Button>
              </a>
            </div>

            {/* Hamburger — shown on mobile AND tablet (below lg) */}
            <button
              className="lg:hidden p-2 text-slate-700 hover:text-primary transition-colors rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Slide-out Drawer — mobile & tablet */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-background z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-white">
          <img 
            src="/ace-logo-full.png" 
            alt="ACE Travel Experiences" 
            className="h-9 w-auto" 
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-slate-700 hover:text-primary transition-colors rounded-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <nav className="flex-1 overflow-y-auto px-5 pt-4 pb-5 flex flex-col">
          {/* PRIMARY NAV — Destinations, Tours, Deals */}
          <div className="space-y-2 mb-4">

            {/* Destinations Accordion */}
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <button
                onClick={() => setMobileDestinationsOpen(!mobileDestinationsOpen)}
                className="w-full flex items-center justify-between bg-slate-100 hover:bg-slate-200 transition-colors px-4 py-3.5"
              >
                <span className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-base font-bold text-slate-800">Destinations</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${mobileDestinationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileDestinationsOpen && (
                <div className="px-3 pt-2 pb-3 space-y-2">
                  {destinations.map((dest) => (
                    <Link
                      key={dest.slug}
                      href={`/destinations/${dest.slug}`}
                      className="block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex gap-3 p-3 border border-border rounded-lg hover:border-primary hover:bg-accent/30 transition-colors">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm mb-0.5">{dest.name}</h4>
                          <p className="text-xs text-muted-foreground mb-1.5 line-clamp-2">{dest.highlight}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{dest.tours}</span>
                            <span className="font-bold text-primary">From {dest.from}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tours Accordion */}
            <div className="rounded-xl overflow-hidden border border-[#44c5c3]/30">
              <button
                onClick={() => setMobileToursOpen(!mobileToursOpen)}
                className="w-full flex items-center justify-between bg-[#44c5c3]/15 hover:bg-[#44c5c3]/25 transition-colors px-4 py-3.5"
              >
                <span className="flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-[#2a7a79]" />
                  <span className="text-base font-bold text-[#1a5a59]">Tours</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-[#2a7a79] transition-transform duration-200 ${mobileToursOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileToursOpen && (
                <div className="px-3 pt-2 pb-3 space-y-4">
                  {Object.entries(toursByDestination).map(([destination, tours]) => (
                    <div key={destination}>
                      <h4 className="text-xs font-bold text-primary mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5" />
                        {destination}
                      </h4>
                      <div className="space-y-2">
                        {tours.map((tour) => (
                          <Link
                            key={tour.slug}
                            href={`/tour/${tour.slug}`}
                            className="block"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex gap-3 p-3 border border-border rounded-lg hover:border-primary hover:bg-accent/30 transition-colors">
                              <img
                                src={tour.image}
                                alt={tour.name}
                                className="w-14 h-14 object-cover rounded-md flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-sm mb-1">{tour.name}</h5>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    {tour.days}
                                  </span>
                                  <span className="font-bold text-primary">{tour.price}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Deals */}
            <Link
              href="/deals"
              className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-[#ee2f6d]/10 border border-[#ee2f6d]/20 hover:bg-[#ee2f6d]/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Tag className="w-5 h-5 text-[#ee2f6d]" />
              <span className="text-base font-bold text-[#c01850]">Deals</span>
            </Link>

          </div>

          {/* INFO NAV — collapsible */}
          <div className="rounded-xl overflow-hidden border border-violet-200 mb-4">
            <button
              onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
              className="w-full flex items-center justify-between bg-violet-50 hover:bg-violet-100 transition-colors px-4 py-3.5"
            >
              <span className="flex items-center gap-2.5">
                <Info className="w-5 h-5 text-violet-600" />
                <span className="text-base font-bold text-violet-700">Info</span>
              </span>
              <ChevronDown className={`w-5 h-5 text-violet-500 transition-transform duration-200 ${mobileInfoOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileInfoOpen && (
              <div className="px-2 pt-1 pb-2 space-y-0.5">
                {infoLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/40 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4 text-violet-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </nav>

        {/* Drawer Footer - CTAs */}
        <div className="px-5 py-4 border-t border-border bg-white space-y-3">
          <a 
            href="https://booking.acetravelexperiences.com/book/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 text-base">
              Book Now
            </Button>
          </a>
          <a 
            href="https://booking.acetravelexperiences.com/account/signin/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors py-1"
          >
            Manage my booking
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
      </div>
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
