import { motion } from 'framer-motion';
import { verticals, solutions } from '../../lib/content-data';

interface ServicesSectionProps {
  ref: (el: HTMLElement | null) => void;
}

export default function ServicesSection({ ref }: ServicesSectionProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section 
      id="services" 
      ref={ref}
      className="bg-white px-4 py-16 md:py-0 flex flex-col justify-center min-h-screen snap-start"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-neutral-600">
            We provide comprehensive solutions across various domains, leveraging our expertise to deliver value-driven results for our clients.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-secondary mb-6">Industry Verticals</h3>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {verticals.map((vertical) => (
              <motion.div 
                key={vertical.id}
                className="bg-neutral-100 p-6 rounded-lg hover:shadow-md transition duration-300 border border-neutral.200"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {vertical.icon}
                </div>
                <h4 className="text-lg font-semibold text-secondary mb-2">{vertical.title}</h4>
                <p className="text-neutral-600">{vertical.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-secondary mb-6">Solution Categories</h3>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {solutions.map((solution) => (
              <motion.div 
                key={solution.id}
                className="bg-neutral-100 p-6 rounded-lg hover:shadow-md transition duration-300 border border-neutral.200"
                variants={fadeInUp}
              >
                <h4 className="text-lg font-semibold text-secondary mb-2">{solution.title}</h4>
                <p className="text-neutral-600">{solution.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
