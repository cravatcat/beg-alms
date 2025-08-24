import MarkdownRenderer from '../components/MarkdownRenderer';
import aboutMarkdown from '../md/about.md?raw';

function About() {
  return (
    <div className="h-full p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 overflow-auto">
          <MarkdownRenderer content={aboutMarkdown} />
        </div>
      </div>
    </div>
  )
}

export default About;