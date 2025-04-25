import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentAffairsOpen, setCurrentAffairsOpen] = useState(false);
  
  // Track scroll position for navbar styling and active section
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id');
        if (sectionTop < window.innerHeight / 3 && sectionTop > -window.innerHeight / 2 && sectionId) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (currentAffairsOpen) setCurrentAffairsOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setCurrentAffairsOpen(false);
  };

  const toggleCurrentAffairs = () => {
    setCurrentAffairsOpen(!currentAffairsOpen);
  };

  // Following the design specifications from the document
  const navLinks = [
    { id: 'services', label: 'Consultancy Services' },
    { id: 'industries', label: 'Industries' },
    { id: 'resources', label: 'Resources' },
    { id: 'about', label: 'About Us' },
    { 
      id: 'current-affairs', 
      label: 'Current Affairs', 
      isDropdown: true,
      dropdownItems: [
        { id: 'initiatives', label: 'Current Initiatives' },
        { id: 'news', label: 'News & Events' }
      ]
    }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-white/90 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo as specified in design parameters */}
          <a href="#home" className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-gray-800">ADIT Joint</span>
          </a>
          
          {/* Clean, minimal navigation as specified */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isDropdown ? (
                <div key={link.id} className="relative group">
                  <button 
                    className="py-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                    onClick={() => setCurrentAffairsOpen(!currentAffairsOpen)}
                  >
                    {link.label}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`ml-1 w-4 h-4 transition-transform ${currentAffairsOpen ? 'rotate-180' : ''}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Dropdown as specified in design document */}
                  <AnimatePresence>
                    {currentAffairsOpen && (
                      <motion.div 
                        className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-20"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.dropdownItems?.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => setCurrentAffairsOpen(false)}
                          >
                            {item.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  className={`py-1 text-sm font-medium transition-colors ${
                    activeSection === link.id 
                      ? 'text-blue-600 gradient-border' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
            
            {/* "Get in Touch" CTA as specified in design */}
            <a 
              href="#contact" 
              className="btn btn-primary text-sm py-2 px-5 ml-2"
            >
              Get in Touch
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </header>
      
      {/* Mobile menu - responsive design as specified */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 lg:hidden pt-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-1 px-6 py-6">
              {navLinks.map((link) => (
                link.isDropdown ? (
                  <div key={link.id} className="py-2">
                    <button 
                      className="flex items-center justify-between w-full py-2 text-base font-medium text-gray-700"
                      onClick={toggleCurrentAffairs}
                    >
                      {link.label}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`ml-1 w-5 h-5 transition-transform ${currentAffairsOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <AnimatePresence>
                      {currentAffairsOpen && (
                        <motion.div 
                          className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.dropdownItems?.map((item) => (
                            <a
                              key={item.id}
                              href={`#${item.id}`}
                              className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                              onClick={closeMobileMenu}
                            >
                              {item.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a 
                    key={link.id}
                    href={`#${link.id}`} 
                    className={`py-3 px-4 text-base font-medium rounded-md transition-colors ${
                      activeSection === link.id 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                )
              ))}
              
              <div className="pt-4">
                <a 
                  href="#contact" 
                  className="btn btn-primary w-full"
                  onClick={closeMobileMenu}
                >
                  Get in Touch
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
