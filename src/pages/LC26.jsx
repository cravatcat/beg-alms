import { useRef } from 'react';
import LCLayout from '../components/LCLayout';
import {
  useAlgorithmAnimator,
  ArrayVisualization,
  MovingElement,
  ControlPanel
} from '../components/Animator';

function LC26() {
  const elementRefs = useRef({});

  // 初始状态
  const initialState = {
    nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
    k: 1,
    i: 1,
    currentAction: ''
  };

  const [state, animator] = useAlgorithmAnimator(initialState);

  const removeDuplicatesAlgorithm = (anim) => {
    anim.setAction('开始删除重复元素算法执行...');
    anim.delay(1000);

    // 使用局部变量跟踪指针位置
    let k = anim.state.k;
    let i = anim.state.i;
    const nums = [...anim.state.nums];

    // 主循环：遍历数组
    while (i < nums.length) {
      // 高亮当前比较的元素
      anim.highlight([`nums-${k-1}`, `nums-${i}`], 800);
      
      // 比较当前元素和最后一个唯一元素
      anim.compare(
        `nums-${k-1}`,
        `nums-${i}`,
        `比较 nums[${k-1}]=${nums[k-1]} 和 nums[${i}]=${nums[i]}`
      );

      if (nums[k-1] !== nums[i]) {
        // 发现不同元素，需要移动
        if (k !== i) {
          // 移动元素到新位置
          anim.move(
            nums[i],
            `nums-${i}`,
            `nums-${k}`,
            `发现新的唯一元素 ${nums[i]}，移动到位置 ${k}`
          );
        } else {
          anim.setAction(`元素 ${nums[i]} 已在正确位置 ${k}`);
        }
        
        nums[k] = nums[i]; // 先更新数组
        anim.updateArray('nums', k, nums[i]);
        k++; // 再移动慢指针
        anim.updatePointer('k', k);
      } else {
        anim.setAction(`nums[${k-1}]=${nums[k-1]} 等于 nums[${i}]=${nums[i]}，跳过重复元素`);
      }

      // 移动快指针
      i++;
      anim.updatePointer('i', i);
      anim.delay(800);
    }

    // 算法完成
    anim.setAction(`算法完成！数组前 ${k} 个元素为去重后的结果`);
    
    // 高亮最终结果
    const resultIndices = [];
    for (let idx = 0; idx < k; idx++) {
      resultIndices.push(`nums-${idx}`);
    }
    anim.highlight(resultIndices, 2000);
  };

  const handleReset = () => {
    animator.reset(initialState);
  };

  const AnimationComponent = () => (
    <div className="space-y-6">
      {/* 控制面板 */}
      <ControlPanel
        animator={animator}
        algorithmFunction={removeDuplicatesAlgorithm}
        title="动态删除有序数组重复项"
        onReset={handleReset}
      />

      {/* 数组可视化 */}
      <div className="space-y-6">
        <ArrayVisualization
          array={state.nums}
          arrayName="nums"
          title="nums 数组（有序数组）"
          pointers={{ k: state.k, i: state.i }}
          comparing={state.comparing || []}
          highlighting={state.highlighting || []}
          elementRefs={elementRefs}
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
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-600 font-bold">k</span>
            <span className="text-gray-600">慢指针（唯一元素位置）: {state.k}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 font-bold">i</span>
            <span className="text-gray-600">快指针（遍历位置）: {state.i < state.nums.length ? state.i : '完成'}</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">当前唯一元素个数：</span> {state.k}
        </div>
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
      problemFile="removeDuplicates.md"
      codeFile="removeDuplicates.js"
      animationComponent={<AnimationComponent />}
      title="动态删除有序数组中的重复项"
    />
  );
}

export default LC26;