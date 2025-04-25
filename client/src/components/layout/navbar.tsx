import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-primary flex items-center">
            <span>ADIT</span>
            <span className="text-secondary">Joint</span>
          </a>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-neutral-600 hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-neutral-600 hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-neutral-600 hover:text-primary transition-colors">Services</a>
            <a href="#contact" className="text-neutral-600 hover:text-primary transition-colors">Contact</a>
            <a href="#legal" className="text-neutral-600 hover:text-primary transition-colors">Legal</a>
          </nav>
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-neutral-600 hover:text-primary transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 md:hidden pt-20"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col space-y-6 px-6 py-8">
              <a 
                href="#home" 
                className="text-xl text-neutral-600 hover:text-primary transition-colors" 
                onClick={closeMobileMenu}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-xl text-neutral-600 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                About
              </a>
              <a 
                href="#services" 
                className="text-xl text-neutral-600 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                Services
              </a>
              <a 
                href="#contact" 
                className="text-xl text-neutral-600 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </a>
              <a 
                href="#legal" 
                className="text-xl text-neutral-600 hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                Legal
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
