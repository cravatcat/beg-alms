import { useState, useEffect } from 'react';
import { Card } from 'antd';
import MarkdownRenderer from './MarkdownRenderer';

function LCLayout({
  problemContent,  // 直接传入内容而不是文件名
  codeContent,     // 直接传入内容而不是文件名
  animationComponent,
  title = ""
}) {
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