import React from 'react';

const BlogContentDisplay = ({ content, className = "" }) => {
    // Function to render content with proper paragraph formatting
    const renderParagraphs = (text) => {
        if (!text) return null;
        
        // Split by double line breaks to create paragraphs
        const paragraphs = text
            .split('\n\n')
            .map(paragraph => paragraph.trim())
            .filter(paragraph => paragraph.length > 0);
        
        return paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed text-lg mb-6 last:mb-0">
                {/* Handle single line breaks within paragraphs */}
                {paragraph.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < paragraph.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </p>
        ));
    };

    return (
        <div className={`prose prose-lg max-w-none ${className}`}>
            {renderParagraphs(content)}
        </div>
    );
};

export default BlogContentDisplay;

// Alternative utility function approach for HTML string output
export const formatBlogContent = (content) => {
    if (!content) return '';
    
    return content
        .split('\n\n')
        .map(paragraph => paragraph.trim())
        .filter(paragraph => paragraph.length > 0)
        .map(paragraph => `<p class="text-gray-700 leading-relaxed text-lg mb-6">${paragraph.replace(/\n/g, '<br>')}</p>`)
        .join('');
};