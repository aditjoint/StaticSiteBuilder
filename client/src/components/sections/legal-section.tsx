import { motion } from 'framer-motion';
import { TabProvider, useTab } from '../../lib/tab-context';
import { Button } from '@/components/ui/button';
import { legalData } from '../../lib/content-data';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LegalSectionProps {
  ref: (el: HTMLElement | null) => void;
}

function LegalContent() {
  const { activeTab, setActiveTab } = useTab();
  
  // Get content based on active tab
  const content = legalData[activeTab as keyof typeof legalData];
  
  const renderSection = (section: any) => {
    return (
      <div key={section.title} className="mb-6">
        <h4 className="font-semibold">{section.title}</h4>
        <p className="mt-1">{section.content}</p>
        
        {section.listItems && section.listItems.length > 0 && (
          <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
            {section.listItems.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        
        {section.additionalContent && <p className="mt-2">{section.additionalContent}</p>}
        
        {section.footer && <p className="mt-2">{section.footer}</p>}
        
        {section.contact && (
          <div className="mt-2">
            {section.contact.email && <p>Email: {section.contact.email}</p>}
            {section.contact.address && <p>Address: {section.contact.address}</p>}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-wrap border-b border-neutral-200 mb-6">
        <Button 
          variant="ghost" 
          className={`px-6 py-3 rounded-none border-b-2 ${activeTab === 'privacy' ? 'border-primary text-primary' : 'border-transparent text-neutral-600'}`}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy Policy
        </Button>
        <Button 
          variant="ghost" 
          className={`px-6 py-3 rounded-none border-b-2 ${activeTab === 'terms' ? 'border-primary text-primary' : 'border-transparent text-neutral-600'}`}
          onClick={() => setActiveTab('terms')}
        >
          Terms of Use
        </Button>
        <Button 
          variant="ghost" 
          className={`px-6 py-3 rounded-none border-b-2 ${activeTab === 'data' ? 'border-primary text-primary' : 'border-transparent text-neutral-600'}`}
          onClick={() => setActiveTab('data')}
        >
          Data Protection
        </Button>
        <Button 
          variant="ghost" 
          className={`px-6 py-3 rounded-none border-b-2 ${activeTab === 'whistleblowing' ? 'border-primary text-primary' : 'border-transparent text-neutral-600'}`}
          onClick={() => setActiveTab('whistleblowing')}
        >
          Whistleblowing
        </Button>
      </div>
      
      <ScrollArea className="h-96 pr-4">
        <h3 className="text-xl font-bold text-secondary mb-4">{content.title}</h3>
        <p className="text-neutral-600 text-sm mb-6">Last updated: {content.lastUpdated}</p>
        
        <div className="space-y-4 text-neutral-600">
          {content.sections.map(renderSection)}
        </div>
      </ScrollArea>
    </>
  );
}

export default function LegalSection({ ref }: LegalSectionProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="legal" 
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
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Legal Information</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>
        
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <TabProvider defaultTab="privacy">
            <LegalContent />
          </TabProvider>
        </motion.div>
      </div>
    </section>
  );
}
