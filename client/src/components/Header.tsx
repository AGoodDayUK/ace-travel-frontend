import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Calendar, MapPin } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showToursMegaMenu, setShowToursMegaMenu] = useState(false);
  const [showDestinationsMenu, setShowDestinationsMenu] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [location] = useLocation();

  const toursByDestination = {
    Thailand: [
      { name: 'Thailand Intro', slug: 'thailand-intro', days: '10 Days', price: '£899', image: '/thailand-intro-hero.webp' },
      { name: 'Thailand Island Hopper', slug: 'thailand-island-hopper', days: '21 Days', price: '£1,899', image: '/thailand-waterfall.webp' }
    ],
    Bali: [
      { name: 'Bali Explorer', slug: 'bali-explorer', days: '14 Days', price: '£1,199', image: '/bali-temple.jpg' },
      { name: 'Bali Island Hopper', slug: 'bali-island-hopper', days: '10 Days', price: '£999', image: '/bali-beach.webp' }
    ],
    Philippines: [
      { name: 'Philippines Paradise', slug: 'philippines-paradise', days: '14 Days', price: '£1,299', image: '/philippines-lagoon.jpg' }
    ]
  };

  const destinations = [
    { 
      name: 'Thailand', 
      slug: 'thailand', 
      image: '/thailand-elephant.jpg',
      tours: '2 Tours',
      highlight: 'Temples, Islands & Night Markets',
      from: '£899'
    },
    { 
      name: 'Bali', 
      slug: 'bali', 
      image: '/bali-temple.jpg',
      tours: '2 Tours',
      highlight: 'Volcanoes, Beaches & Culture',
      from: '£999'
    },
    { 
      name: 'Philippines', 
      slug: 'philippines', 
      image: '/philippines-beach.jpg',
      tours: '1 Tour',
      highlight: 'Hidden Lagoons & Island Paradise',
      from: '£1,299'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/deals', label: 'Deals' },
    { href: '/about', label: 'About' },
  ];

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
          isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center kinetic-underline">
              <img src="/ace-logo.jpg" alt="ACE Travel" className="h-8 md:h-10" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {/* Destinations Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowDestinationsMenu(true)}
                onMouseLeave={() => setShowDestinationsMenu(false)}
              >
                <button
                  className={`text-sm font-medium tracking-tight transition-kinetic flex items-center gap-1 ${
                    location.startsWith('/destination') ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  Destinations
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showDestinationsMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-background border border-border shadow-xl rounded-lg p-4 w-[600px] animate-fade-in z-50">
                    <div className="grid grid-cols-3 gap-4">
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
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="p-3">
                              <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{dest.name}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{dest.highlight}</p>
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
                  className={`text-sm font-medium tracking-tight transition-kinetic flex items-center gap-1 ${
                    location.startsWith('/tour') ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  Tours
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showToursMegaMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border border-border shadow-xl rounded-lg p-6 w-[800px] animate-fade-in z-50">
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(toursByDestination).map(([destination, tours]) => (
                        <div key={destination}>
                          <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {destination}
                          </h3>
                          <div className="space-y-3">
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
                                    className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                                  />
                                  <div className="p-3">
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

              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-medium tracking-tight kinetic-underline transition-kinetic ${
                    location === link.href ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="https://booking.acetravelexperiences.com/book/" target="_blank" rel="noopener noreferrer">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-tight transition-kinetic"
                >
                  Book Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-fade-in max-h-[80vh] overflow-y-auto">
            <nav className="container py-6 flex flex-col gap-4">
              {/* Destinations Accordion */}
              <div className="border-b border-border pb-4">
                <button
                  onClick={() => setMobileDestinationsOpen(!mobileDestinationsOpen)}
                  className="w-full flex items-center justify-between text-lg font-medium tracking-tight text-foreground py-2"
                >
                  Destinations
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileDestinationsOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileDestinationsOpen && (
                  <div className="mt-4 space-y-3 animate-fade-in">
                    {destinations.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/destinations/${dest.slug}`}
                        className="block"
                        onClick={() => { setIsMobileMenuOpen(false); setMobileDestinationsOpen(false); }}
                      >
                        <div className="flex gap-3 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                          <img 
                            src={dest.image} 
                            alt={dest.name}
                            className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm mb-1">{dest.name}</h4>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{dest.highlight}</p>
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
              <div className="border-b border-border pb-4">
                <button
                  onClick={() => setMobileToursOpen(!mobileToursOpen)}
                  className="w-full flex items-center justify-between text-lg font-medium tracking-tight text-foreground py-2"
                >
                  Tours
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileToursOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileToursOpen && (
                  <div className="mt-4 space-y-4 animate-fade-in">
                    {Object.entries(toursByDestination).map(([destination, tours]) => (
                      <div key={destination}>
                        <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {destination}
                        </h4>
                        <div className="space-y-2">
                          {tours.map((tour) => (
                            <Link
                              key={tour.slug}
                              href={`/tour/${tour.slug}`}
                              className="block"
                              onClick={() => { setIsMobileMenuOpen(false); setMobileToursOpen(false); }}
                            >
                              <div className="flex gap-3 p-3 border border-border rounded-lg hover:border-primary transition-colors">
                                <img 
                                  src={tour.image} 
                                  alt={tour.name}
                                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
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

              {/* Other Nav Links */}
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-lg font-medium tracking-tight transition-kinetic py-2 ${
                    location === link.href ? 'text-primary' : 'text-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Book Now CTA */}
              <a href="https://booking.acetravelexperiences.com/book/" target="_blank" rel="noopener noreferrer" className="mt-2">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Now
                </Button>
              </a>
            </nav>
          </div>
        )}
      </header>
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
