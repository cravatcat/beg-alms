import { useState } from 'react';
import { Slider, Button } from 'antd';

export function ControlPanel({
  animator,
  algorithmFunction,
  title = "算法可视化",
  onReset
}) {
  const [speed, setSpeed] = useState(animator?.speed || 1000);

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  const handlePause = () => {
    if (animator) {
      if (animator.isPaused) {
        animator.resume();
      } else {
        animator.pause();
      }
    }
  };

  const handleStart = () => {
    handleReset();
    if (animator) {
      animator.start(algorithmFunction);
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (animator) {
      animator.setSpeed(newSpeed);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-sm text-gray-500">
          {animator?.state.isComplete ? '✅ 完成' :
            animator?.state.isRunning ? '🔄 执行中' : '⏸️ 待执行'}
        </div>
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <Button
          type="primary"
          onClick={handleStart}
          disabled={animator?.state.isRunning}
        >
          {animator?.state.isRunning ? '🔄 执行中...' : '▶️ 开始执行'}
        </Button>

        {animator?.state.isRunning && (
          <Button
            type={animator?.state.isPaused ? "primary" : "default"}
            onClick={handlePause}
            style={{
              backgroundColor: animator?.state.isPaused ? '#52c41a' : '#faad14',
              borderColor: animator?.state.isPaused ? '#52c41a' : '#faad14',
              color: 'white'
            }}
          >
            {animator?.state.isPaused ? '▶️ 继续' : '⏸️ 暂停'}
          </Button>
        )}

        <Button
          danger
          onClick={handleReset}
          disabled={animator?.state.isRunning && !animator?.state.isPaused}
        >
          🔄 重置
        </Button>
      </div>

      {/* 速度控制 */}
      <div className="flex items-center space-x-3">
        <label className="text-sm font-medium text-gray-700">动画速度:</label>
        <div className="flex-1">
          <Slider
            min={100}
            max={2000}
            step={50}
            value={speed}
            onChange={handleSpeedChange}
            disabled={animator?.state.isRunning}
            tooltip={{
              formatter: (value) => `${value}ms`
            }}
          />
        </div>
        <span className="text-sm text-gray-500 w-16">{speed}ms</span>
      </div>
    </div>
  );
}