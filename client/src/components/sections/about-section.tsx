import { motion } from 'framer-motion';

interface AboutSectionProps {
  ref: (el: HTMLElement | null) => void;
}

export default function AboutSection({ ref }: AboutSectionProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={ref}
      className="px-4 py-16 md:py-0 flex flex-col justify-center min-h-screen snap-start"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">About Us</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>
        
        <motion.div 
          className="mb-16 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <p className="text-neutral-600 mb-4 leading-relaxed">
            At ADIT Joint, we are dedicated to delivering comprehensive solutions in Machinery, Equipment, Energy, and Facility Infrastructure. Our mission is to empower businesses through innovative strategies, ensuring sustainable growth and operational excellence.
          </p>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            With a team of seasoned professionals, we combine industry expertise with cutting-edge technology to address complex challenges. Our collaborative approach fosters strong partnerships, enabling us to tailor solutions that meet the unique needs of each client.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Committed to excellence and innovation, ADIT Joint stands at the forefront of transforming industries and driving progress.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-primary"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold text-secondary mb-4">Mission</h3>
            <p className="text-neutral-600">
              Our mission is to advance innovation, sustainability, and global cooperation across industries, creating long-term value for all stakeholders through expert project management and consultancy.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-primary"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold text-secondary mb-4">Vision</h3>
            <p className="text-neutral-600">
              A future where cross-sector collaboration and strategic partnerships drive technological advancement and sustainable growth, with ADIT Joint serving as the gateway connecting diverse industry players.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-primary"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold text-secondary mb-4">Values</h3>
            <ul className="list-disc list-inside text-neutral-600 space-y-2">
              <li><span className="font-semibold">Collaboration:</span> Fostering multilateral partnerships that drive innovation</li>
              <li><span className="font-semibold">Innovation:</span> Exploring emerging technologies and futuristic business opportunities</li>
              <li><span className="font-semibold">Expertise:</span> Bringing specialized knowledge across multiple domains</li>
              <li><span className="font-semibold">Sustainability:</span> Creating long-term value through environmentally and economically sustainable practices</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
