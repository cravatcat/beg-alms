import { useRef } from 'react';
import LCLayout from '../components/LCLayout';
import {
  useAlgorithmAnimator,
  ArrayVisualization,
  MovingElement,
  ControlPanel
} from '../components/Animator';

import majorityElementMarkdown from '../lc/majorityElement.md?raw';
import majorityElementCode from '../lc/majorityElement.js?raw';

function LC169() {
  const elementRefs = useRef({});

  // 初始状态
  const initialState = {
    nums: [2, 2, 1, 1, 1, 2, 2],
    nominee: 2,
    counter: 1,
    i: 1,
    currentAction: ''
  };

  const [state, animator] = useAlgorithmAnimator(initialState);

  const majorityElementAlgorithm = (anim) => {
    anim.setAction('开始摩尔投票法算法执行...');
    // 使用局部变量跟踪状态
    let nominee = anim.state.nominee;
    let counter = anim.state.counter;
    let i = anim.state.i;
    const nums = [...anim.state.nums];

    anim.setAction(`初始化：候选者 = ${nominee}, 计数器 = ${counter}`);
    anim.highlight([`nums-${i}`], 800);
    // 更新初始状态显示
    anim.updatePointer('i', i);

    // 主循环：从第二个元素开始遍历
    while (i < nums.length) {


      anim.setAction(`处理元素 nums[${i}] = ${nums[i]}`);

      if (counter === 0) {
        // 计数器为0，更换候选者
        nominee = nums[i];
        counter = 1;
        anim.setAction(`计数器为0，更换候选者为 ${nominee}，计数器重置为 1`);
        // 更新动画状态
      } else if (nominee === nums[i]) {
        // 当前元素与候选者相同，计数器加1
        counter++;
        anim.setAction(`元素 ${nums[i]} 与候选者 ${nominee} 相同，计数器 +1 = ${counter}`);
      } else {
        // 当前元素与候选者不同，计数器减1
        counter--;
        anim.setAction(`元素 ${nums[i]} 与候选者 ${nominee} 不同，计数器 -1 = ${counter}`);
      }
      anim.updatePointer('i', i);
      anim.updateState({
        nominee,
        counter
      });
      anim.highlight([`nums-${i}`], 1200);
      i++;
    }

    anim.setAction(`算法结束，多数元素为：${nominee}`);
    anim.highlight([`nums-result`], 1500);
    anim.setState({ nominee, counter, currentAction: '算法完成' });
  };

  const handleReset = () => {
    animator.reset(initialState);
  };

  const AnimationComponent = () => (
    <div className="space-y-6">
      {/* 控制面板 */}
      <ControlPanel
        animator={animator}
        algorithmFunction={majorityElementAlgorithm}
        title="摩尔投票法求多数元素"
        onReset={handleReset}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">摩尔投票法可视化</h3>

        {/* 数组可视化 */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">输入数组：</h4>
          <ArrayVisualization
            array={state.nums}
            arrayName="nums"
            title="输入数组"
            pointers={{ i: state.i }}
            highlighting={state.highlighting || []}
            elementRefs={elementRefs}
            renderElement={(value, index) => (
              <div
                key={index}
                ref={el => elementRefs.current[`nums-${index}`] = el}
                className={`
                  w-12 h-12 flex items-center justify-center border-2 rounded-lg font-semibold text-lg
                  transition-all duration-300
                  ${state.highlighting?.includes(`nums-${index}`)
                    ? 'border-blue-500 bg-blue-100 text-blue-800 scale-110'
                    : 'border-gray-300 bg-gray-50 text-gray-700'
                  }
                  ${index === state.i ? 'ring-2 ring-orange-400' : ''}
                `}
              >
                {value}
              </div>
            )}
          />
        </div>

        {/* 状态显示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-600">当前候选者</div>
            <div className="text-2xl font-bold text-blue-800">{state.nominee}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-600">计数器</div>
            <div className="text-2xl font-bold text-green-800">{state.counter}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-orange-600">当前位置</div>
            <div className="text-2xl font-bold text-orange-800">{state.i}</div>
          </div>
        </div>

        {/* 当前操作显示 */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">当前操作：</h4>
          <p className="text-blue-700">{state.currentAction || '点击"开始执行"来运行算法'}</p>
        </div>
      </div>

      {/* 移动元素动画 */}
      {state.moving && (
        <MovingElement
          value={state.moving.value}
          fromPos={state.moving.from}
          toPos={state.moving.to}
          elementRefs={elementRefs}
        />
      )}
    </div>
  );

  return (
    <LCLayout
      problemContent={majorityElementMarkdown}
      codeContent={`\`\`\`javascript\n${majorityElementCode}\n\`\`\``}
      animationComponent={<AnimationComponent />}
      title="摩尔投票法求多数元素"
    />
  );
}

export default LC169;