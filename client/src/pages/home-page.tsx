import { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ServicesSection from '@/components/sections/services-section';
import ContactSection from '@/components/sections/contact-section';
import LegalSection from '@/components/sections/legal-section';

export default function HomePage() {
  // Create refs for each section
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const legalRef = useRef<HTMLElement>(null);

  // Apply scroll-snap styling to the body
  useEffect(() => {
    // Add scroll snap styles
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollSnapType = 'y mandatory';
    
    // Cleanup function to remove styles when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.documentElement.style.scrollSnapType = '';
    };
  }, []);

  // Determine which section to show based on hash in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen font-sans bg-neutral-100 text-secondary">
      <Navbar />
      
      <main className="pt-16">
        <section 
          id="home" 
          ref={heroRef}
          className="flex flex-col justify-center bg-gradient-to-br from-primary/5 to-neutral-100 px-4 relative min-h-screen snap-start"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="md:flex items-center">
              <div className="md:w-3/5 py-16 md:py-0">
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
              </div>
              <div className="md:w-2/5 mt-8 md:mt-0 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80" 
                  alt="Modern office building representing facility infrastructure" 
                  className="rounded-lg shadow-2xl w-full max-w-md object-cover h-[375px]" 
                />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </section>
        
        <section 
          id="about" 
          ref={aboutRef}
          className="px-4 py-16 md:py-0 flex flex-col justify-center min-h-screen snap-start"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">About Us</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            </div>
            
            <div className="mb-16 max-w-4xl mx-auto">
              <p className="text-neutral-600 mb-4 leading-relaxed">
                At ADIT Joint, we are dedicated to delivering comprehensive solutions in Machinery, Equipment, Energy, and Facility Infrastructure. Our mission is to empower businesses through innovative strategies, ensuring sustainable growth and operational excellence.
              </p>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                With a team of seasoned professionals, we combine industry expertise with cutting-edge technology to address complex challenges. Our collaborative approach fosters strong partnerships, enabling us to tailor solutions that meet the unique needs of each client.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Committed to excellence and innovation, ADIT Joint stands at the forefront of transforming industries and driving progress.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-primary">
                <h3 className="text-xl font-bold text-secondary mb-4">Mission</h3>
                <p className="text-neutral-600">
                  Our mission is to advance innovation, sustainability, and global cooperation across industries, creating long-term value for all stakeholders through expert project management and consultancy.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-primary">
                <h3 className="text-xl font-bold text-secondary mb-4">Vision</h3>
                <p className="text-neutral-600">
                  A future where cross-sector collaboration and strategic partnerships drive technological advancement and sustainable growth, with ADIT Joint serving as the gateway connecting diverse industry players.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-primary">
                <h3 className="text-xl font-bold text-secondary mb-4">Values</h3>
                <ul className="list-disc list-inside text-neutral-600 space-y-2">
                  <li><span className="font-semibold">Collaboration:</span> Fostering multilateral partnerships that drive innovation</li>
                  <li><span className="font-semibold">Innovation:</span> Exploring emerging technologies and futuristic business opportunities</li>
                  <li><span className="font-semibold">Expertise:</span> Bringing specialized knowledge across multiple domains</li>
                  <li><span className="font-semibold">Sustainability:</span> Creating long-term value through environmentally and economically sustainable practices</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section 
          id="services" 
          ref={servicesRef}
          className="bg-white px-4 py-16 md:py-0 flex flex-col justify-center min-h-screen snap-start"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Services</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-neutral-600">
                We provide comprehensive solutions across various domains, leveraging our expertise to deliver value-driven results for our clients.
              </p>
            </div>
            
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-secondary mb-6">Industry Verticals</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Facility Infrastructure */}
                <div className="bg-neutral-100 p-6 rounded-lg hover:shadow-md transition duration-300 border border-neutral-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-secondary mb-2">Facility Infrastructure</h4>
                  <p className="text-neutral-600">Comprehensive facility design, implementation, and management solutions.</p>
                </div>
                
                {/* Data Centers */}
                <div className="bg-neutral-100 p-6 rounded-lg hover:shadow-md transition duration-300 border border-neutral-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-secondary mb-2">Data Centers Infrastructure</h4>
                  <p className="text-neutral-600">Specialized infrastructure solutions for modern data centers.</p>
                </div>
                
                {/* Digital Transformation */}
                <div className="bg-neutral-100 p-6 rounded-lg hover:shadow-md transition duration-300 border border-neutral-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-secondary mb-2">Digital Transformation</h4>
                  <p className="text-neutral-600">Strategic digital transformation services to modernize businesses.</p>
                </div>
                
                {/* AI Applications */}
                <div className="bg-neutral-100 p-6 rounded-lg hover:shadow-md transition duration-300 border border-neutral-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-secondary mb-2">AI and Applications Engineering</h4>
                  <p className="text-neutral-600">Development of AI-powered solutions and specialized applications.</p>
                </div>
                
                {/* Industrial Automations */}
                <div className="bg-neutral-100 p-6 rounded-lg hover:shadow-md transition duration-300 border border-neutral-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-secondary mb-2">Industrial Automations including IIOT</h4>
                  <p className="text-neutral-600">Advanced industrial automation solutions incorporating Internet of Things technology.</p>
                </div>
                
                {/* Audit and Consultancies */}
                <div className="bg-neutral-100 p-6 rounded-lg hover:shadow-md transition duration-300 border border-neutral-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-secondary mb-2">Audit and Consultancies</h4>
                  <p className="text-neutral-600">Expert auditing and consultancy services to optimize operations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section 
          id="contact" 
          ref={contactRef}
          className="bg-gradient-to-br from-primary/5 to-neutral-100 px-4 py-16 md:py-0 flex flex-col justify-center min-h-screen snap-start"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Contact Us</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-neutral-600">
                Reach out to us for more information about our services or to discuss how we can help your business.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-6">Get in Touch</h3>
                
                <form className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-neutral-600">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full mt-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-neutral-600">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="johndoe@example.com" 
                      className="w-full mt-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-neutral-600">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      className="w-full mt-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-neutral-600">Subject</label>
                    <input 
                      type="text"
                      placeholder="How can we help you?" 
                      className="w-full mt-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-neutral-600">Message</label>
                    <textarea 
                      placeholder="Your message here..." 
                      rows={4}
                      className="w-full mt-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-primary/20"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-6">Contact Information</h3>
                
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                  <div className="flex items-start mb-6">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-secondary mb-1">Email</h4>
                      <a href="mailto:aditjoint@gmail.com" className="text-neutral-600 hover:text-primary transition-colors">aditjoint@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-secondary mb-1">Phone</h4>
                      <a href="tel:+918080280801" className="text-neutral-600 hover:text-primary transition-colors">+91-8080280801</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-secondary mb-1">Address</h4>
                      <p className="text-neutral-600">ADIT_SKHS, Sector-27, Navi Mumbai - 400706, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden h-64">
                  <div className="bg-neutral-200 w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mx-auto mb-2 text-neutral-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                      </svg>
                      <p className="text-neutral-600">Google Maps Location</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section 
          id="legal" 
          ref={legalRef}
          className="px-4 py-16 md:py-0 flex flex-col justify-center min-h-screen snap-start"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Legal Information</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-wrap border-b border-neutral-200 mb-6">
                <button className="px-6 py-3 rounded-none border-b-2 border-primary text-primary">
                  Privacy Policy
                </button>
                <button className="px-6 py-3 rounded-none border-b-2 border-transparent text-neutral-600">
                  Terms of Use
                </button>
                <button className="px-6 py-3 rounded-none border-b-2 border-transparent text-neutral-600">
                  Data Protection
                </button>
                <button className="px-6 py-3 rounded-none border-b-2 border-transparent text-neutral-600">
                  Whistleblowing
                </button>
              </div>
              
              <div className="h-96 pr-4 overflow-y-auto">
                <h3 className="text-xl font-bold text-secondary mb-4">Privacy & Cookie Policy</h3>
                <p className="text-neutral-600 text-sm mb-6">Last updated: April 15, 2025</p>
                
                <div className="space-y-4 text-neutral-600">
                  <div className="mb-6">
                    <h4 className="font-semibold">1. Introduction</h4>
                    <p className="mt-1">ADIT Joint ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold">2. Information We Collect</h4>
                    <p className="mt-1">We collect several types of information from and about users of our website, including:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                      <li>Personal information such as name, email address, telephone number, or any other identifier by which you may be contacted online or offline</li>
                      <li>Information that is about you but individually does not identify you, such as IP address or browser information</li>
                      <li>Information about your internet connection, the equipment you use to access our website, and usage details</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold">3. How We Collect Your Information</h4>
                    <p className="mt-1">We collect this information:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                      <li>Directly from you when you provide it to us, such as by filling out forms or corresponding with us</li>
                      <li>Automatically as you navigate through the site, using cookies and other tracking technologies</li>
                      <li>From third parties, for example, our business partners</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold">4. How We Use Your Information</h4>
                    <p className="mt-1">We use information that we collect about you or that you provide to us:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                      <li>To present our website and its contents to you</li>
                      <li>To provide you with information, products, or services that you request from us</li>
                      <li>To fulfill any other purpose for which you provide it</li>
                      <li>To carry out our obligations and enforce our rights</li>
                      <li>To notify you about changes to our website or any products or services we offer</li>
                      <li>For any other purpose with your consent</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
