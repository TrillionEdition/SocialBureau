import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!content) return;

    // Extract headings from HTML content
    const extractHeadings = () => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const extractedHeadings = [];

      headingElements.forEach((heading, index) => {
        // Create slug from heading text
        const slug = heading.textContent
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/--+/g, '-');
        
        // Add id to heading element if not present
        if (!heading.id) {
          heading.id = slug;
        }

        extractedHeadings.push({
          id: heading.id || slug,
          text: heading.textContent,
          level: parseInt(heading.tagName.charAt(1)),
          tag: heading.tagName.toLowerCase(),
        });
      });

      setHeadings(extractedHeadings);
    };

    extractHeadings();
  }, [content]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => {
          const indentClass = {
            1: 'ml-0',
            2: 'ml-4',
            3: 'ml-8',
            4: 'ml-12',
            5: 'ml-16',
            6: 'ml-20',
          }[heading.level] || 'ml-0';

          return (
            <li key={index} className={`${indentClass}`}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="flex items-center gap-3 text-gray-700 hover:text-red-600 p-2 rounded-lg hover:bg-white transition-colors group w-full text-left"
              >
                <span className="text-sm text-red-600 font-medium min-w-[30px]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-sm">{heading.text}</span>
                <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

