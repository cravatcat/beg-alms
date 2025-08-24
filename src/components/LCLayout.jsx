import { useState, useEffect } from 'react';
import { Card } from 'antd';
import MarkdownRenderer from './MarkdownRenderer';

function LCLayout({
  problemFile,
  codeFile,
  animationComponent,
  title = ""
}) {
  const [problemContent, setProblemContent] = useState('');
  const [codeContent, setCodeContent] = useState('');

  useEffect(() => {
    const loadProblemContent = async () => {
      try {
        const response = await fetch(`/src/lc/${problemFile}`);
        const text = await response.text();
        setProblemContent(text);
      } catch (error) {
        console.error('Failed to load problem content:', error);
      }
    };

    // 加载代码内容
    const loadCodeContent = async () => {
      try {
        const response = await fetch(`/src/lc/${codeFile}`);
        let text = await response.text();
        text = text
          .split('\n')
          .filter(line => !line.trim().startsWith('//# sourceMappingURL='))
          .filter(line => !line.trim().startsWith('//# sourceURL='))
          .join('\n');

        const markdownCode = `\`\`\`javascript\n${text}\n\`\`\``;
        setCodeContent(markdownCode);
      } catch (error) {
        console.error('Failed to load code content:', error);
      }
    };

    if (problemFile) loadProblemContent();
    if (codeFile) loadCodeContent();
  }, [problemFile, codeFile]);

  return (
    <div className="lc-page">
      <div className="flex h-full gap-4">
        {/* 左侧 - 题目描述 */}
        <div className="flex-1">
          <Card
            title="题目描述"
            className="h-full"
            styles={{ body: { padding: '16px', height: 'calc(100% - 57px)' } }}
          >
            <MarkdownRenderer content={problemContent} />
          </Card>
        </div>

        {/* 右侧 - 解题思路、代码内容和动画演示 */}
        <div className="flex-1 flex flex-col gap-4">
          {/* 动画演示区域 */}
          <Card
            title="算法可视化"
            size="small"
            styles={{ body: { padding: '12px', height: 'calc(100% - 49px)' } }}
          >
            {animationComponent}
          </Card>

          {/* 代码内容 */}
          <Card
            title="代码实现"
            size="small"
            className="flex-1"
            styles={{ body: { padding: '12px' } }}
          >
            <MarkdownRenderer content={codeContent} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LCLayout;