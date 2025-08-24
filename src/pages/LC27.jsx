import { useRef } from 'react';
import LCLayout from '../components/LCLayout';
import { 
  useAlgorithmAnimator, 
  ArrayVisualization, 
  MovingElement, 
  ControlPanel 
} from '../components/Animator';

import removeElementMarkdown from '../lc/removeElement.md?raw';
import removeElementCode from '../lc/removeElement.js?raw';

function LC27() {
  const elementRefs = useRef({});
  
  // 初始状态
  const initialState = {
    nums: [3, 2, 2, 3],
    val: 3,
    slow: 0,
    fast: 0,
    currentAction: ''
  };
  
  const [state, animator] = useAlgorithmAnimator(initialState, { speed: 1000 });
  
  // 移除元素算法
  const removeElementAlgorithm = (anim) => {
    anim.setAction('开始移除元素算法执行...');
    anim.delay(1000);
    
    // 使用局部变量跟踪指针位置
    let slow = anim.state.slow;
    let fast = anim.state.fast;
    const nums = [...anim.state.nums];
    const val = anim.state.val;
    
    // 主循环：遍历整个数组
    while (fast < nums.length) {
      const currentValue = nums[fast];
      
      // 高亮当前检查的元素
      anim.highlight([`nums-${fast}`], 800);
      anim.setAction(`检查 nums[${fast}] = ${currentValue}`);
      anim.delay(800);
      
      if (currentValue !== val) {
        // 元素不等于val，需要保留
        if (slow !== fast) {
          // 需要移动元素
          anim.move(
            currentValue,
            `nums-${fast}`,
            `nums-${slow}`,
            `${currentValue} ≠ ${val}，移动到位置 ${slow}`
          );
          anim.updateArray('nums', slow, currentValue);
        } else {
          // 元素已在正确位置
          anim.setAction(`${currentValue} ≠ ${val}，已在正确位置 ${slow}`);
          anim.highlight([`nums-${slow}`], 600);
        }
        
        anim.updatePointer('slow', slow + 1);
        slow++; // 更新局部变量
      } else {
        // 元素等于val，需要移除
        anim.setAction(`${currentValue} = ${val}，跳过此元素`);
        anim.highlight([`nums-${fast}`], 600);
      }
      
      anim.updatePointer('fast', fast + 1);
      fast++; // 更新局部变量
      anim.delay(500);
    }
    
    anim.setAction(`算法完成！新数组长度为 ${slow}`);
    anim.delay(1000);
  };
  
  const handleReset = () => {
    animator.reset(initialState);
  };
  
  // 动画组件
  const AnimationComponent = () => (
    <div className="space-y-6">
      {/* 控制面板 */}
      <ControlPanel 
        animator={animator}
        algorithmFunction={removeElementAlgorithm}
        title="动态移除元素演示"
        onReset={handleReset}
      />
  
      {/* 数组可视化 */}
      <div className="space-y-6">
        <ArrayVisualization
          array={state.nums}
          arrayName="nums"
          title={`nums 数组（移除值为 ${state.val} 的元素）`}
          pointers={{ slow: state.slow, fast: state.fast }}
          comparing={state.comparing || []}
          highlighting={state.highlighting || []}
          elementRefs={elementRefs}
          customStyles={(index, value) => {
            if (value === state.val && index >= state.slow) {
              return 'border-red-500 bg-red-100 text-red-700';
            }
            if (index < state.slow) {
              return 'border-green-500 bg-green-100 text-green-700';
            }
            return '';
          }}
        />
      </div>
  
      {/* 当前操作信息 */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">当前操作：</h4>
        <p className="text-blue-700">{state.currentAction || '点击"开始执行"来运行算法'}</p>
      </div>
  
      {/* 指针状态 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">指针状态：</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-600 font-bold">slow</span>
            <span className="text-gray-600">慢指针: {state.slow}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 font-bold">fast</span>
            <span className="text-gray-600">快指针: {state.fast < state.nums.length ? state.fast : '完成'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-600 font-bold">val</span>
            <span className="text-gray-600">目标值: {state.val}</span>
          </div>
        </div>
      </div>
  
      {/* 算法说明 */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">算法说明：</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• <span className="text-green-600 font-semibold">慢指针(slow)</span>：指向下一个有效元素应该放置的位置</li>
          <li>• <span className="text-blue-600 font-semibold">快指针(fast)</span>：遍历数组，寻找不等于val的元素</li>
          <li>• <span className="text-red-600 font-semibold">红色元素</span>：等于val的元素，需要被移除</li>
          <li>• <span className="text-green-600 font-semibold">绿色区域</span>：已处理的有效元素区域</li>
        </ul>
      </div>
  
      {/* 移动动画 */}
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
      problemContent={removeElementMarkdown}
      codeContent={`\`\`\`javascript\n${removeElementCode}\n\`\`\``}
      animationComponent={<AnimationComponent />}
      title="动态移除元素演示"
    />
  );
}

export default LC27;