import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const HeroSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section 
      id="home" 
      ref={ref}
      className="flex flex-col justify-center bg-gradient-to-br from-primary/5 to-neutral-100 px-4 relative min-h-screen snap-start"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="md:flex items-center">
          <motion.div 
            className="md:w-3/5 py-16 md:py-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4 leading-tight">
              Transforming Industries with <span className="text-primary">Innovative Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl">
              Comprehensive solutions in Machinery, Equipment, Energy, and Facility Infrastructure. Empowering businesses through innovation and operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-primary/20 text-center">
                Our Services
              </a>
              <a href="#contact" className="inline-block bg-white hover:bg-neutral-100 text-primary border border-primary font-semibold py-3 px-6 rounded-lg transition-colors text-center">
                Contact Us
              </a>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-2/5 mt-8 md:mt-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80" 
              alt="Modern office building representing facility infrastructure" 
              className="rounded-lg shadow-2xl w-full max-w-md object-cover h-[375px]" 
            />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
        </svg>
      </motion.div>
    </section>
  );
});

export default HeroSection;
