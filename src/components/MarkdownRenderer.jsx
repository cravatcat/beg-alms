import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

function MarkdownRenderer({ content, className = "" }) {
  return (
    <div className={`max-w-none text-left ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 border-b border-gray-200 text-left" style={{ marginBottom: '2rem', paddingBottom: '1rem' }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-gray-800 text-left" style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium text-gray-700 text-left" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-600 leading-7 text-base text-left" style={{ marginBottom: '1.5rem' }}>
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="text-gray-600 text-left" style={{ marginBottom: '1.5rem' }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="text-gray-600 text-left" style={{ marginBottom: '1.5rem' }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start text-left" style={{ marginBottom: '0.5rem' }}>
              <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0" style={{ marginTop: '0.75rem', marginRight: '0.75rem' }}></span>
              <span className="leading-7 text-left">{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-6 py-2 text-gray-600 bg-gray-50 text-left" style={{ margin: '1.5rem 0' }}>
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto" style={{ margin: '2rem 0' }}>
              <table className="min-w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead>
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-100 text-left">
              {children}
            </td>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div style={{ margin: '1.5rem 0' }}>
                <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-left">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-600">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;