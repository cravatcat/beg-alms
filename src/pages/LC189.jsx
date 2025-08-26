import { useRef } from 'react';
import LCLayout from '../components/LCLayout';
import {
  useAlgorithmAnimator,
  ArrayVisualization,
  MovingElement,
  ControlPanel
} from '../components/Animator';

import rotateMarkdown from '../lc/rotate.md?raw';
import rotateCode from '../lc/rotate.js?raw';

function LC189() {
  const elementRefs = useRef({});

  // 初始状态
  const initialState = {
    nums: [1, 2, 3, 4, 5, 6, 7],
    k: 3,
    step: 0, // 0: 初始, 1: 第一次反转, 2: 第二次反转, 3: 第三次反转完成
    reverseStart: -1,
    reverseEnd: -1,
    currentAction: '',
    highlighting: []
  };

  const [state, animator] = useAlgorithmAnimator(initialState);

  const rotateAlgorithm = (anim) => {
    const nums = [...anim.state.nums];
    let k = anim.state.k % nums.length;

    if (k === 0) {
      anim.setAction('k为0，无需轮转');
      return;
    }

    anim.setAction(`开始轮转数组，k = ${k}`);
    anim.updateState({ step: 0 });
    anim.delay(1000);

    // 反转函数
    const reverse = (start, end, stepNum, description) => {
      anim.setAction(description);
      anim.updateState({ 
        step: stepNum, 
        reverseStart: start, 
        reverseEnd: end - 1,
        highlighting: [] 
      });
      anim.delay(800);

      let i = start;
      let j = end - 1;
      
      while (i < j) {
        // 高亮当前要交换的元素
        anim.updateState({ highlighting: [i, j] });
        anim.setAction(`交换位置 ${i} 和 ${j} 的元素: ${nums[i]} ↔ ${nums[j]}`);
        anim.delay(1200);
        
        // 添加move动画显示元素交换
        const leftValue = nums[i];
        const rightValue = nums[j];
        
        // 显示左边元素移动到右边
        anim.move(
          leftValue,
          `nums-${i}`,
          `nums-${j}`,
          `移动 ${leftValue} 到位置 ${j}`
        );
        
        // 显示右边元素移动到左边
        anim.move(
          rightValue,
          `nums-${j}`,
          `nums-${i}`,
          `移动 ${rightValue} 到位置 ${i}`
        );
        
        // 执行交换
        [nums[i], nums[j]] = [nums[j], nums[i]];
        anim.updateState({ nums: [...nums] });
        anim.delay(800);
        
        i++;
        j--;
      }
      
      anim.updateState({ highlighting: [] });
      anim.delay(500);
    };

    // 第一次反转：反转整个数组
    reverse(0, nums.length, 1, `第一步：反转整个数组 [0, ${nums.length - 1}]`);

    // 第二次反转：反转前k个元素
    reverse(0, k, 2, `第二步：反转前 ${k} 个元素 [0, ${k - 1}]`);

    // 第三次反转：反转后n-k个元素
    reverse(k, nums.length, 3, `第三步：反转后 ${nums.length - k} 个元素 [${k}, ${nums.length - 1}]`);

    anim.setAction(`轮转完成！数组向右轮转了 ${k} 个位置`);
    anim.updateState({
      step: 3,
      reverseStart: -1,
      reverseEnd: -1,
      highlighting: [],
      currentAction: '算法完成'
    });
  };

  const handleReset = () => {
    animator.reset(initialState);
  };

  const AnimationComponent = () => (
    <div className="space-y-6">
      {/* 控制面板 */}
      <ControlPanel
        animator={animator}
        algorithmFunction={rotateAlgorithm}
        title="三次反转法轮转数组"
        onReset={handleReset}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">轮转数组可视化</h3>

        {/* 参数显示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-600">轮转步数</div>
            <div className="text-2xl font-bold text-blue-800">k = {state.k}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-600">当前步骤</div>
            <div className="text-xl font-bold text-green-800">
              {state.step === 0 && '准备开始'}
              {state.step === 1 && '第一次反转'}
              {state.step === 2 && '第二次反转'}
              {state.step === 3 && '第三次反转'}
            </div>
          </div>
        </div>

        {/* 数组可视化 */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">数组状态：</h4>
          <ArrayVisualization
            array={state.nums}
            arrayName="nums"
            title="轮转数组"
            pointers={{reverseStart: state.reverseStart, reverseEnd: state.reverseEnd}}
            highlighting={state.highlighting || []}
            elementRefs={elementRefs}
            renderElement={(value, index) => {
              const isHighlighted = state.highlighting?.includes(index);
              const isInReverseRange = state.reverseStart >= 0 &&
                index >= state.reverseStart &&
                index <= state.reverseEnd;

              return (
                <div
                  key={index}
                  ref={el => elementRefs.current[`nums-${index}`] = el}
                  className={`
                    w-12 h-12 flex items-center justify-center border-2 rounded-lg font-semibold text-lg
                    transition-all duration-300
                    ${isHighlighted
                      ? 'border-red-500 bg-red-100 text-red-800 scale-110 shadow-lg'
                      : isInReverseRange
                        ? 'border-blue-500 bg-blue-100 text-blue-800'
                        : 'border-gray-300 bg-gray-50 text-gray-700'
                    }
                  `}
                >
                  {value}
                </div>
              );
            }}
          />
        </div>

        {/* 反转范围显示 */}
        {state.reverseStart >= 0 && state.reverseEnd >= 0 && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="text-sm font-medium text-blue-600 mb-2">当前反转范围</div>
            <div className="text-blue-800">
              索引 [{state.reverseStart}, {state.reverseEnd}]
              {state.step === 1 && '（整个数组）'}
              {state.step === 2 && `（前 ${state.k} 个元素）`}
              {state.step === 3 && `（后 ${state.nums.length - state.k} 个元素）`}
            </div>
          </div>
        )}

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
      problemContent={rotateMarkdown}
      codeContent={`\`\`\`javascript\n${rotateCode}\n\`\`\``}
      animationComponent={<AnimationComponent />}
      title="三次反转法轮转数组"
    />
  );
}

export default LC189;