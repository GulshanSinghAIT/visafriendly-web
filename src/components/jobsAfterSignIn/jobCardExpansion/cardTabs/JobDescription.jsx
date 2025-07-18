import React from 'react'

const formatJobDescription = (htmlContent) => {
    if (!htmlContent) return '';
    
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Remove inline styles that might interfere with Tailwind
    const elementsWithStyles = tempDiv.querySelectorAll('[style]');
    elementsWithStyles.forEach(el => {
        el.removeAttribute('style');
    });
    
    // Clean up any Microsoft Word specific classes and spans
    const msoElements = tempDiv.querySelectorAll('.MsoNormal, span');
    msoElements.forEach(el => {
        if (el.className === 'MsoNormal' || (el.tagName === 'SPAN' && !el.innerHTML.trim())) {
            el.className = '';
        }
    });
    
    // Remove empty paragraphs and spans
    const emptyElements = tempDiv.querySelectorAll('p, span');
    emptyElements.forEach(el => {
        if (el.innerHTML.trim() === '' || el.innerHTML.trim() === '&nbsp;') {
            el.remove();
        }
    });
    
    // Handle special sections first (before other formatting)
    const specialSections = [
        'ABOUT THE ROLE:', 'ABOUT REEVO:', 'WHO YOU ARE:', 'WHAT YOU WILL DO:', 
        'WHAT YOU BRING:', 'DESCRIPTION:', 'QUALIFICATIONS:', 'About Company', 'Company'
    ];
    
    specialSections.forEach(section => {
        const regex = new RegExp(`(${section})`, 'gi');
        tempDiv.innerHTML = tempDiv.innerHTML.replace(regex, '<h3 class="font-bold text-gray-900 text-lg mb-4 mt-8 first:mt-0">$1</h3>');
    });
    
    // Add Tailwind classes to common elements
    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
        // Skip if it's already a heading
        if (!p.innerHTML.match(/^(ABOUT THE ROLE:|ABOUT REEVO:|WHO YOU ARE:|WHAT YOU WILL DO:|WHAT YOU BRING:|DESCRIPTION:|QUALIFICATIONS:|About Company|Company)/i)) {
            p.className = `${p.className} mb-4 leading-relaxed text-gray-700 text-justify`.trim();
        }
    });
    
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
        const baseClasses = 'font-semibold text-gray-900 mb-3 mt-6';
        const sizeClasses = {
            h1: 'text-2xl',
            h2: 'text-xl',
            h3: 'text-lg',
            h4: 'text-base',
            h5: 'text-sm',
            h6: 'text-xs'
        };
        heading.className = `${baseClasses} ${sizeClasses[heading.tagName.toLowerCase()]}`;
    });
    
    const lists = tempDiv.querySelectorAll('ul, ol');
    lists.forEach(list => {
        list.className = `${list.className} mb-6 ml-6 space-y-2`.trim();
    });
    
    const listItems = tempDiv.querySelectorAll('li');
    listItems.forEach(li => {
        li.className = `${li.className} text-gray-700 leading-relaxed mb-2 text-justify`.trim();
    });
    
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
        link.className = `${link.className} text-blue-600 hover:text-blue-800 underline`.trim();
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
    
    const strongElements = tempDiv.querySelectorAll('strong, b');
    strongElements.forEach(el => {
        el.className = `${el.className} font-semibold text-gray-900`.trim();
    });
    
    const emElements = tempDiv.querySelectorAll('em, i');
    emElements.forEach(el => {
        el.className = `${el.className} italic`.trim();
    });
    
    // Handle div elements (like company descriptions)
    const divs = tempDiv.querySelectorAll('div');
    divs.forEach(div => {
        if (!div.querySelector('h1, h2, h3, h4, h5, h6, p, ul, ol')) {
            div.className = `${div.className} mb-4 leading-relaxed text-gray-700 text-justify`.trim();
        }
    });
    
    return tempDiv.innerHTML;
};

const JobDescription = ({discriptionData}) => {
    return (
        <div
            className="prose prose-lg w-full max-w-none py-2 bg-gray-50  px-2   rounded-lg border border-gray-200 overflow-y-auto max-h-96 scrollbar-hide shadow-sm"
            style={{
                fontFamily: 'Gellix, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.875rem',
                lineHeight: '1.75'
            }}
            dangerouslySetInnerHTML={{ __html: formatJobDescription(discriptionData) }}
        />
    )
}

export default JobDescription
