import MarkdownRenderer from '../components/MarkdownRenderer';
import homeMarkdown from '../md/home.md?raw';

function Home() {
  return (
    <div className="h-full p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 overflow-auto">
          <MarkdownRenderer content={homeMarkdown} />
        </div>
      </div>
    </div>
  )
}

export default Home;