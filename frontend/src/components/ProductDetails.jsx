import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProductDetails({ settings }) {
  const [openSection, setOpenSection] = useState('benefits');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const detailsSettings = settings?.product_details || {
    title: 'The Hausmade Difference',
    subtitle: 'Everything you need to know about our Kesar Soap.',
    items: [
      {
        id: 'benefits',
        title: 'Benefits',
        format: 'bullet',
        content: 'Suitable for all skin types.\nSoft touch & deep nourishment.\n100% natural botanical ingredients.\nNaturally removes sun tan and fades dark spots.\nBrightens complexion for a radiant daily glow.'
      },
      {
        id: 'ingredients',
        title: 'Ingredients',
        format: 'paragraph',
        content: 'Kesar (Saffron): Sourced directly from Kashmir, Kesar is renowned for its skin-brightening and anti-inflammatory properties.\nCamphor: Adds a cooling, soothing effect that calms irritated skin and clears pores.\n100% Coconut Oil: Creates a rich, creamy lather that cleanses deeply while locking in essential moisture.'
      },
      {
        id: 'usage',
        title: 'How to use',
        format: 'number',
        content: 'Wet your skin and rub the soap directly onto your body to create a rich lather.\nGently massage the lather into your skin in circular motions.\nRinse thoroughly with water and pat dry.'
      },
      {
        id: 'who',
        title: 'Who is it for?',
        format: 'paragraph',
        content: 'Suitable for all skin types, including dry, sensitive, or sun-damaged skin. Designed for anyone seeking a pure, chemical-free bathing experience.'
      }
    ]
  };

  const renderContentLine = (line, index) => {
    if (line.includes(':')) {
      const parts = line.split(':');
      const boldPart = parts[0];
      const rest = parts.slice(1).join(':');
      return (
        <span key={index}>
          <strong className="font-semibold text-[#3A2E26]">{boldPart}:</strong>
          {rest}
        </span>
      );
    }
    return <span key={index}>{line}</span>;
  };

  const renderFormattedContent = (item) => {
    if (!item || !item.content) return null;
    
    // If content contains raw HTML tags (legacy data in MongoDB), render it dangerously
    if (typeof item.content === 'string' && /<[a-z][\s\S]*>/i.test(item.content)) {
      return (
        <div 
          className="text-[#3A2E26]/80 leading-relaxed text-sm sm:text-base font-light"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      );
    }

    // Otherwise render plain text line-by-line
    const lines = String(item.content).split('\n').filter(line => line.trim() !== '');
    const format = item.format || 'bullet';

    if (format === 'bullet') {
      return (
        <ul className="list-disc pl-5 space-y-2 text-[#3A2E26]/80 leading-relaxed text-sm sm:text-base font-light">
          {lines.map((line, idx) => (
            <li key={idx}>{renderContentLine(line, idx)}</li>
          ))}
        </ul>
      );
    } else if (format === 'number') {
      return (
        <ol className="list-decimal pl-5 space-y-2 text-[#3A2E26]/80 leading-relaxed text-sm sm:text-base font-light">
          {lines.map((line, idx) => (
            <li key={idx}>{renderContentLine(line, idx)}</li>
          ))}
        </ol>
      );
    } else {
      return (
        <div className="space-y-3 text-[#3A2E26]/80 leading-relaxed text-sm sm:text-base font-light">
          {lines.map((line, idx) => (
            <p key={idx}>{renderContentLine(line, idx)}</p>
          ))}
        </div>
      );
    }
  };

  return (
    <section className="pt-2 pb-12 bg-[#FDFBF7] border-t border-[#3A2E26]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-[#3A2E26]">
        
        <div className="border-b border-[#3A2E26]/10 pb-6 mb-8 text-center">
          <h2 className="font-serif-brand text-2xl sm:text-3xl text-[#3A2E26]">{detailsSettings.title}</h2>
          <p className="text-[#3A2E26]/70 mt-2 text-sm sm:text-base">{detailsSettings.subtitle}</p>
        </div>

        <div className="space-y-4">
          {(detailsSettings.items || []).map((section) => {
            const isOpen = openSection === section.id;
            return (
              <div key={section.id} className="border border-[#3A2E26]/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 bg-white hover:bg-[#FDFBF7] transition-colors focus:outline-none"
                >
                  <h3 className="font-serif-brand text-lg sm:text-xl text-[#C97C5D] font-medium">{section.title}</h3>
                  <ChevronDown className={`w-5 h-5 text-[#3A2E26]/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-4 sm:p-5 pt-0 border-t border-[#3A2E26]/5 mt-1">
                    {renderFormattedContent(section)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
