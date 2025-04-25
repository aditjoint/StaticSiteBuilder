import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function HomePage() {
  // State for video/image background switch
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle scroll behavior and legal tab functionality
  useEffect(() => {
    // Handle URL hash on load
    const handleHashOnLoad = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };
    
    handleHashOnLoad();
    
    // Switch from video to static image after 60 seconds (as per design doc)
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 60000);
    
    // Set up tabbed interface for legal section
    const setupTabs = () => {
      const privacyTab = document.getElementById('privacy-tab');
      const termsTab = document.getElementById('terms-tab');
      const cookiesTab = document.getElementById('cookies-tab');
      
      const privacyContent = document.getElementById('privacy-content');
      const termsContent = document.getElementById('terms-content');
      const cookiesContent = document.getElementById('cookies-content');
      
      if (!privacyTab || !termsTab || !cookiesTab || 
          !privacyContent || !termsContent || !cookiesContent) {
        return;
      }
      
      const activateTab = (tab: HTMLElement, content: HTMLElement) => {
        // Reset all tabs and content
        [privacyTab, termsTab, cookiesTab].forEach(t => {
          if (t) t.className = 'flex-1 py-4 px-4 font-medium text-gray-600 hover:text-blue-600 focus:outline-none';
        });
        
        [privacyContent, termsContent, cookiesContent].forEach(c => {
          if (c) c.className = 'hidden space-y-6';
        });
        
        // Activate selected tab and content
        tab.className = 'flex-1 py-4 px-4 font-medium text-blue-600 border-b-2 border-blue-600 focus:outline-none';
        content.className = 'space-y-6';
      };
      
      privacyTab.addEventListener('click', () => activateTab(privacyTab, privacyContent));
      termsTab.addEventListener('click', () => activateTab(termsTab, termsContent));
      cookiesTab.addEventListener('click', () => activateTab(cookiesTab, cookiesContent));
    };
    
    // Only set up tabs when the elements are in the DOM
    const tabSetupInterval = setInterval(() => {
      if (document.getElementById('privacy-tab')) {
        setupTabs();
        clearInterval(tabSetupInterval);
      }
    }, 500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(tabSetupInterval);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Floating geometric shapes data
  const shapes = [
    { top: '15%', left: '10%', size: '60px', color: 'from-blue-500/20 to-indigo-500/20', delay: 0 },
    { top: '70%', left: '85%', size: '80px', color: 'from-indigo-500/20 to-purple-500/20', delay: 0.5 },
    { top: '40%', left: '80%', size: '40px', color: 'from-sky-500/20 to-blue-500/20', delay: 1 },
    { top: '80%', left: '20%', size: '70px', color: 'from-blue-500/20 to-sky-500/20', delay: 1.5 },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <Navbar />
      
      <main>
        {/* Hero Section with dynamic video background as specified in design doc */}
        <section id="home" className="section relative flex items-center bg-slate-900 overflow-hidden">
          {/* Background Video/Image as specified in design */}
          <div className="absolute inset-0 w-full h-full">
            {showVideo ? (
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover opacity-40"
              >
                <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=ef9b29637b9d2b446ef652aec9e13e96a5dc7004&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=1980&q=80" 
                alt="Data center infrastructure" 
                className="w-full h-full object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/60"></div>
          </div>
          
          {/* Floating geometric shapes as specified in design document */}
          {shapes.map((shape, index) => (
            <motion.div
              key={index}
              className={`geometric-shape absolute rounded-full bg-gradient-to-r ${shape.color}`}
              style={{ 
                top: shape.top, 
                left: shape.left, 
                width: shape.size, 
                height: shape.size 
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ 
                duration: 2,
                delay: shape.delay,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
          
          <div className="container relative z-10 mx-auto px-4 py-20">
            <motion.div 
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Gradient text effects as specified in design doc */}
              <h1 className="text-4xl md:text-[56px] font-bold leading-tight mb-6 text-white">
                Transforming Industries with <span className="gradient-text">Innovative Solutions</span>
              </h1>
              
              {/* Clear value proposition as specified */}
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Comprehensive solutions in Facility Infrastructure, Data Centers, 
                Digital Transformation, AI Applications, and Industrial Automations.
              </p>
              
              {/* Dual CTAs as specified in design doc */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#services" 
                  className="btn btn-primary"
                >
                  Get Started
                </a>
                <a 
                  href="#services" 
                  className="btn btn-secondary"
                >
                  Explore Solutions
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Consultancy Services - Three-Category Organization as specified */}
        <section id="services" className="section py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Consultancy Services
              </h2>
              <p className="text-gray-600">
                Our specialized services span multiple domains, delivered by industry experts to 
                help your business thrive in an ever-evolving technological landscape.
              </p>
            </motion.div>
            
            {/* Three-Category Organization as specified in design doc */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center px-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 019 0m-9 0h16.5m-16.5 0a4.5 4.5 0 019 0m-9 0H12m-9.75 11.25h3.375a3 3 0 013 3V21.75h-9.75v-4.5Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Technology Infrastructure</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive solutions for optimizing your facility and technology infrastructure.
                </p>
              </div>
              
              <div className="text-center px-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Digital Transformation</h3>
                <p className="text-gray-600 mb-6">
                  Strategic services to modernize your operations and enhance digital capabilities.
                </p>
              </div>
              
              <div className="text-center px-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Sustainability Solutions</h3>
                <p className="text-gray-600 mb-6">
                  Environmentally conscious strategies for operational efficiency and future growth.
                </p>
              </div>
            </div>
            
            {/* Data Centers as primary service focus with 8 detailed areas */}
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">Data Centers Consultancy</h3>
                <p className="max-w-3xl mx-auto text-gray-600">
                  Our comprehensive data center solutions address every aspect of modern infrastructure 
                  needs, from initial planning to ongoing optimization.
                </p>
              </div>
              
              {/* Card-Based Layout as specified in design doc */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Data Center Design",
                    description: "Custom-tailored architectures optimized for your specific requirements",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75a2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                      </svg>
                    )
                  },
                  {
                    title: "Power Solutions",
                    description: "Reliable and efficient power infrastructure with redundancy planning",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    )
                  },
                  {
                    title: "Cooling Systems",
                    description: "Energy-efficient cooling solutions optimized for your environment",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    )
                  },
                  {
                    title: "Network Architecture",
                    description: "High-performance, scalable network designs for optimal connectivity",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                      </svg>
                    )
                  },
                  {
                    title: "Security Systems",
                    description: "Comprehensive physical and digital security implementation",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    )
                  },
                  {
                    title: "Monitoring Solutions",
                    description: "Real-time monitoring and analytics for proactive management",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    )
                  },
                  {
                    title: "Disaster Recovery",
                    description: "Robust disaster recovery planning and implementation services",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                    )
                  },
                  {
                    title: "Efficiency Audits",
                    description: "Comprehensive assessments to optimize performance and costs",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                      </svg>
                    )
                  }
                ].map((service, index) => (
                  <div key={index} className="card hover-scale">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-blue-600">
                        {service.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    {/* Consistent "Learn More" buttons as specified */}
                    <a href="#contact" className="text-blue-600 font-medium inline-flex items-center">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Industries Section - Cross-Sector Focus as specified */}
        <section id="industries" className="section bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Industries We Serve
              </h2>
              <p className="text-gray-600">
                Our cross-sector expertise allows us to deliver specialized solutions 
                for diverse industries with their unique challenges and requirements.
              </p>
            </motion.div>
            
            {/* Visual Industry Representations as specified in design doc */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Manufacturing",
                  description: "Specialized solutions for modern manufacturing facilities focusing on automation, efficiency, and quality control.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  )
                },
                {
                  title: "Healthcare",
                  description: "End-to-end infrastructure solutions for modern healthcare facilities with a focus on reliability and patient care.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  )
                },
                {
                  title: "Financial Services",
                  description: "Secure, compliant infrastructure solutions for financial institutions with high availability requirements.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                  )
                },
                {
                  title: "Education",
                  description: "Modern campus technology infrastructure supporting the evolving needs of educational institutions.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  )
                },
                {
                  title: "Government",
                  description: "Specialized infrastructure solutions meeting the strict security and compliance requirements of the public sector.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                  )
                },
                {
                  title: "Retail",
                  description: "Digital infrastructure enabling seamless omnichannel experiences and operational efficiency for retailers.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  )
                }
              ].map((industry, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100"
                  variants={fadeInUp}
                >
                  {/* Visual industry representation as specified */}
                  <div className="h-48 bg-blue-50 flex items-center justify-center">
                    <div className="text-blue-500">
                      {industry.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {industry.description}
                    </p>
                    <a href="#contact" className="text-blue-600 font-medium inline-flex items-center">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Resources Section - Admin-controlled content as specified */}
        <section id="resources" className="section bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Resources
              </h2>
              <p className="text-gray-600">
                Access our knowledge base and industry insights to stay informed about the latest developments
                and best practices in technology infrastructure and digital transformation.
              </p>
            </motion.div>
            
            {/* Card-based layout as specified in design document */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Data Center Design Best Practices",
                  description: "Comprehensive guide covering essential considerations for modern data center design.",
                  date: "April 10, 2025",
                  type: "Whitepaper",
                  category: "Infrastructure"
                },
                {
                  title: "Digital Transformation Roadmap",
                  description: "Strategic framework for organizations embarking on digital transformation journeys.",
                  date: "March 22, 2025",
                  type: "Guide",
                  category: "Transformation"
                },
                {
                  title: "Sustainable Tech Infrastructure",
                  description: "Implementation strategies for environmentally conscious technology infrastructure.",
                  date: "February 15, 2025",
                  type: "Case Study",
                  category: "Sustainability"
                },
                {
                  title: "AI Implementation Strategies",
                  description: "Practical approaches to integrating AI solutions in enterprise environments.",
                  date: "March 5, 2025",
                  type: "Whitepaper",
                  category: "AI & Applications"
                },
                {
                  title: "IIoT Security Framework",
                  description: "Comprehensive security considerations for Industrial Internet of Things deployments.",
                  date: "January 30, 2025",
                  type: "Framework",
                  category: "Automation"
                },
                {
                  title: "Cross-Industry Technology Trends",
                  description: "Analysis of emerging technology trends affecting multiple industries.",
                  date: "April 2, 2025",
                  type: "Report",
                  category: "Trends"
                }
              ].map((resource, index) => (
                <motion.div 
                  key={index}
                  className="card hover-scale h-full flex flex-col"
                  variants={fadeInUp}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-medium text-white bg-blue-600 px-3 py-1 rounded-full">
                      {resource.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {resource.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{resource.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{resource.category}</span>
                    <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                      Download
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Current Initiatives / News & Events Section */}
        <section id="initiatives" className="section bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Current Affairs
              </h2>
              <p className="text-gray-600">
                Stay updated with our latest initiatives, news, and upcoming events in the technology 
                and infrastructure space.
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Featured News Item - Card-based layout as specified */}
              <motion.div 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-64 bg-blue-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Partnership
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">ActFour Technologies Partnership</h3>
                    <span className="text-sm text-gray-500">April 15, 2025</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    ADIT Joint announces strategic partnership with ActFour Technologies to enhance data 
                    center infrastructure capabilities and expand service offerings across the APAC region.
                  </p>
                  <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                    Read Full Announcement
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
              
              {/* Upcoming Event - Card-based layout as specified */}
              <motion.div 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="h-64 bg-indigo-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-indigo-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Webinar
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Industry 4.0 Technology Showcase</h3>
                    <span className="text-sm text-gray-500">May 10, 2025</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Join our virtual event showcasing the latest Industry 4.0 technologies and their 
                    practical applications across manufacturing, logistics, and supply chain operations.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">2:00 PM - 4:00 PM IST</span>
                    <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                      Register Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* News & Events section with detailed card layouts */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-8 text-center">News & Events</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* News Card 1 */}
                <motion.div 
                  className="card hover-scale h-full flex flex-col"
                  variants={fadeInUp}
                >
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      Sustainability
                    </span>
                    <span className="text-xs text-gray-500">March 28, 2025</span>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3">Carbon Neutral Data Centers Initiative Launch</h4>
                  <p className="text-gray-600 mb-4 flex-grow">
                    ADIT Joint announces new sustainability initiative aimed at achieving carbon neutrality for all client data center projects by 2027.
                  </p>
                  
                  <a href="#" className="text-blue-600 font-medium inline-flex items-center mt-auto">
                    Read Full Article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
                
                {/* News Card 2 */}
                <motion.div 
                  className="card hover-scale h-full flex flex-col"
                  variants={fadeInUp}
                >
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <div className="h-48 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-purple-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      Workshop
                    </span>
                    <span className="text-xs text-gray-500">May 22, 2025</span>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3">Digital Transformation Strategies Workshop</h4>
                  <p className="text-gray-600 mb-4 flex-grow">
                    Join our hands-on workshop exploring proven digital transformation frameworks and implementation strategies for enterprise organizations.
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Mumbai, India</span>
                    <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                      Register
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
                
                {/* News Card 3 */}
                <motion.div 
                  className="card hover-scale h-full flex flex-col"
                  variants={fadeInUp}
                >
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <div className="h-48 bg-gradient-to-r from-green-100 to-teal-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      Achievement
                    </span>
                    <span className="text-xs text-gray-500">April 5, 2025</span>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3">Tier IV Data Center Design Certification</h4>
                  <p className="text-gray-600 mb-4 flex-grow">
                    ADIT Joint's innovative data center design methodology receives prestigious Tier IV certification from the Uptime Institute, recognizing the highest level of reliability.
                  </p>
                  
                  <a href="#" className="text-blue-600 font-medium inline-flex items-center mt-auto">
                    Read Press Release
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>
            
            {/* More News Items - Card-based layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Ethics in Infrastructure Conference",
                  date: "June 12, 2025",
                  category: "Event",
                  location: "Virtual"
                },
                {
                  title: "Southeast Asia Expansion Announcement",
                  date: "May 3, 2025",
                  category: "News",
                  location: "Singapore"
                },
                {
                  title: "Next-Gen Cooling Technology Patent",
                  date: "April 18, 2025",
                  category: "Innovation",
                  location: null
                }
              ].map((news, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
                  variants={fadeInUp}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{news.title}</h4>
                  {news.location && (
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {news.location}
                      </span>
                    </p>
                  )}
                  <a href="#" className="text-blue-600 text-sm font-medium inline-flex items-center">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Advisory Panel Section */}
        <section id="advisors" className="section bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Advisory Panel
              </h2>
              <p className="text-gray-600">
                Our team of industry experts provides strategic guidance and specialized knowledge 
                across multiple domains.
              </p>
            </motion.div>
            
            {/* Card-based layout for Advisory Panel */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Anand Sharma",
                  role: "Technology Infrastructure",
                  bio: "Former CTO with 25+ years of experience in data center design and implementation across APAC.",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                },
                {
                  name: "Priya Mehta",
                  role: "Digital Transformation",
                  bio: "Digital strategy consultant who has led transformation initiatives for Fortune 500 companies.",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                },
                {
                  name: "Robert Chen",
                  role: "Sustainability Solutions",
                  bio: "Expert in sustainable technology infrastructure with a focus on energy-efficient designs.",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                }
              ].map((advisor, index) => (
                <motion.div 
                  key={index}
                  className="card hover-scale h-full"
                  variants={fadeInUp}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden mr-4 bg-gray-200">
                      <img 
                        src={advisor.image} 
                        alt={advisor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{advisor.name}</h3>
                      <p className="text-blue-600 font-medium">{advisor.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{advisor.bio}</p>
                  
                  <div className="flex justify-end">
                    <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                      Full Profile
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Technology Partner Onboarding Section */}
        <section id="partners" className="section bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Technology Partner Onboarding
              </h2>
              <p className="text-gray-600">
                Join our ecosystem of technology partners to collaborate on innovative solutions
                and expand your market reach.
              </p>
            </motion.div>
            
            {/* Card-based layout for Partner Onboarding */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Infrastructure Partners",
                  description: "For companies specializing in data center hardware, cooling systems, power solutions, and network infrastructure.",
                  benefits: ["Access to enterprise clients", "Joint solution development", "Marketing collaboration"]
                },
                {
                  title: "Software & AI Partners",
                  description: "For providers of management software, monitoring tools, automation platforms, and AI/ML solutions.",
                  benefits: ["Integration opportunities", "Solution certification", "Co-selling initiatives"]
                },
                {
                  title: "Consulting Partners",
                  description: "For specialized consultancies with expertise in specific industry verticals or technological domains.",
                  benefits: ["Project referrals", "Knowledge sharing", "Training programs"]
                }
              ].map((program, index) => (
                <motion.div 
                  key={index}
                  className="card hover-scale h-full"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3">Key Benefits</h4>
                    <ul className="space-y-2">
                      {program.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <a href="#" className="btn btn-primary w-full flex justify-center">
                      Apply Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Investor Portfolio Section */}
        <section id="investors" className="section bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Investor Portfolio
              </h2>
              <p className="text-gray-600">
                Our strategic investment approach focuses on innovative technologies and sustainable 
                growth opportunities across key domains.
              </p>
            </motion.div>
            
            {/* Featured Investment with card layout */}
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2">
                <div className="bg-blue-50 min-h-[300px] flex items-center justify-center">
                  <div className="p-12 text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      Featured Investment
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-semibold mb-4">EnergyTech Innovations</h3>
                  <p className="text-gray-600 mb-6">
                    A groundbreaking venture developing energy-efficient solutions for data centers, 
                    reducing power consumption by up to 40% while maintaining optimal performance.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Investment Stage</h4>
                      <p className="font-semibold">Series B</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Sector</h4>
                      <p className="font-semibold">Energy & Infrastructure</p>
                    </div>
                  </div>
                  <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                    View Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Portfolio Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "Emerging Technologies",
                  description: "Supporting innovations in quantum computing, edge computing, and advanced materials.",
                  investmentCount: 8,
                  totalAmount: "$14.5M"
                },
                {
                  category: "Sustainable Infrastructure",
                  description: "Funding solutions that minimize environmental impact while maximizing operational efficiency.",
                  investmentCount: 12,
                  totalAmount: "$23.8M"
                },
                {
                  category: "Digital Transformation",
                  description: "Investing in platforms that enable enterprise digital evolution and modernization.",
                  investmentCount: 10,
                  totalAmount: "$18.2M"
                }
              ].map((category, index) => (
                <motion.div 
                  key={index}
                  className="card hover-scale h-full"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-semibold mb-3">{category.category}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Investments</p>
                      <p className="text-2xl font-semibold text-blue-600">{category.investmentCount}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Total</p>
                      <p className="text-2xl font-semibold text-blue-600">{category.totalAmount}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <a href="#" className="text-blue-600 font-medium inline-flex items-center">
                      View Portfolio
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Us Section */}
        <section id="about" className="section bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About ADIT Joint
                </h2>
                
                {/* Company Overview as specified in design doc */}
                <div className="space-y-4 text-gray-600">
                  <p>
                    At ADIT Joint, we are dedicated to delivering comprehensive solutions in Machinery, 
                    Equipment, Energy, and Facility Infrastructure. Our mission is to empower businesses 
                    through innovative strategies, ensuring sustainable growth and operational excellence.
                  </p>
                  
                  {/* Cross-Sector Expertise as specified */}
                  <p>
                    Our cross-sector expertise bridges traditional infrastructure with emerging technologies,
                    allowing us to deliver solutions that address the unique challenges of various industries.
                  </p>
                  
                  {/* Purpose-Driven Innovation as specified */}
                  <p>
                    We focus on solutions with measurable impact, ensuring that our innovations drive
                    real business value and sustainable growth for our clients.
                  </p>
                  
                  {/* Digital Transformation as specified */}
                  <p>
                    Our enterprise systems and AI-powered solutions enable organizations to transform
                    digitally and stay competitive in an increasingly technology-driven world.
                  </p>
                  
                  {/* Collaborative Growth as specified */}
                  <p>
                    Through partnership-driven strategies, we work closely with our clients to develop
                    tailored solutions that align with their unique business objectives.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-3">Mission</h3>
                  <p className="text-gray-600">
                    Our mission is to advance innovation, sustainability, and global cooperation 
                    across industries, creating long-term value for all stakeholders through expert 
                    project management and consultancy.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-3">Vision</h3>
                  <p className="text-gray-600">
                    A future where cross-sector collaboration and strategic partnerships drive 
                    technological advancement and sustainable growth, with ADIT Joint serving as 
                    the gateway connecting diverse industry players.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl shadow-sm md:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-3">Values</h3>
                  <ul className="grid grid-cols-2 gap-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <div>
                        <span className="font-semibold">Collaboration:</span> Fostering multilateral partnerships that drive innovation
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <div>
                        <span className="font-semibold">Innovation:</span> Exploring emerging technologies and futuristic business opportunities
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <div>
                        <span className="font-semibold">Expertise:</span> Bringing specialized knowledge across multiple domains
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <div>
                        <span className="font-semibold">Sustainability:</span> Creating long-term value through environmentally sustainable practices
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Legal Section with Privacy Policy, Terms of Use, and Cookie Policy */}
        <section id="legal" className="section bg-white py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Legal Information
              </h2>
              <p className="text-gray-600">
                Our commitment to transparency, data protection, and user privacy.
              </p>
            </motion.div>
            
            {/* Tab-based layout for legal documents */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button 
                  className="flex-1 py-4 px-4 font-medium text-blue-600 border-b-2 border-blue-600 focus:outline-none"
                  id="privacy-tab"
                >
                  Privacy Policy
                </button>
                <button 
                  className="flex-1 py-4 px-4 font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
                  id="terms-tab"
                >
                  Terms of Use
                </button>
                <button 
                  className="flex-1 py-4 px-4 font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
                  id="cookies-tab"
                >
                  Cookie Policy
                </button>
              </div>
              
              {/* Tab content */}
              <div className="p-8">
                {/* Privacy Policy */}
                <div id="privacy-content" className="space-y-6">
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Data Collection & Usage</h3>
                      <p className="text-gray-600">
                        ADIT Joint collects limited personal information for specific business purposes. We process this data legally and transparently, obtaining clear consent when required by applicable regulations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Data Security</h3>
                      <p className="text-gray-600">
                        We implement robust technical and organizational security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, and regular security assessments.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Your Rights</h3>
                      <p className="text-gray-600">
                        Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal data. You may also have the right to data portability and to withdraw consent. We respond to all requests within legal timeframes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Last Updated: April 15, 2025</p>
                    <a href="#" className="text-blue-600 font-medium flex items-center">
                      Full Privacy Policy
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Terms of Use - hidden by default */}
                <div id="terms-content" className="hidden space-y-6">
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Website Usage</h3>
                      <p className="text-gray-600">
                        This website is provided for informational purposes. By accessing and using this site, you agree to these Terms of Use. We reserve the right to modify these terms at any time without notice.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Intellectual Property</h3>
                      <p className="text-gray-600">
                        All content on this website, including text, graphics, logos, and software, is the property of ADIT Joint and is protected by intellectual property laws. Reproduction or redistribution without written permission is prohibited.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">User Conduct</h3>
                      <p className="text-gray-600">
                        Users must not engage in any activity that interferes with the website's operation, attempt to gain unauthorized access, or use the site for any unlawful purpose. We reserve the right to terminate access for violations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Last Updated: March 22, 2025</p>
                    <a href="#" className="text-blue-600 font-medium flex items-center">
                      Full Terms of Use
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Cookie Policy - hidden by default */}
                <div id="cookies-content" className="hidden space-y-6">
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">What Are Cookies</h3>
                      <p className="text-gray-600">
                        Cookies are small text files that are placed on your device to collect standard internet log information and visitor behavior information. This information is used to track visitor use of the website and to compile statistical reports.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">How We Use Cookies</h3>
                      <p className="text-gray-600">
                        We use cookies to understand how visitors interact with our website, to personalize content, and to analyze our website traffic. We may also share information about your site usage with our analytics partners.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Managing Cookies</h3>
                      <p className="text-gray-600">
                        Most web browsers allow control of cookies through the browser settings. You can set your browser to refuse cookies, delete specific cookies, or notify you when a cookie is being set. Please note that restricting cookies may impact your experience on our website.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Last Updated: March 28, 2025</p>
                    <a href="#" className="text-blue-600 font-medium flex items-center">
                      Full Cookie Policy
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Page as specified in design doc */}
        <section id="contact" className="section bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Contact Us
              </h2>
              <p className="text-gray-600">
                Reach out to discuss how we can help transform your business with our innovative solutions.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Simplified Contact Form as specified */}
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      rows={5} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" 
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Address</h4>
                      {/* Updated office address as specified */}
                      <p className="text-gray-600">ADIT Joint LLP, A-603, SaiKrupa C.H.S, Sector-27, Navi Mumbai - 400706, Maharashtra, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Email</h4>
                      <a href="mailto:aditjoint@gmail.com" className="text-blue-600 hover:underline">aditjoint@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Phone</h4>
                      <a href="tel:+918080280801" className="text-blue-600 hover:underline">+91-8080280801</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Business Hours</h4>
                      <p className="text-gray-600">Monday-Friday: 9:00 AM-6:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gray-200 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                      </svg>
                      <p className="text-gray-600">Google Maps Location</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}