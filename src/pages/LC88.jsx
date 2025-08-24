import { useRef } from 'react';
import LCLayout from '../components/LCLayout';
import {
  useAlgorithmAnimator,
  ArrayVisualization,
  MovingElement,
  ControlPanel
} from '../components/Animator';

function LC88() {
  const elementRefs = useRef({});

  // 初始状态
  const initialState = {
    nums1: [1, 2, 3, 0, 0, 0],
    nums2: [2, 5, 6],
    m: 3,
    n: 3,
    i: 2,
    j: 2,
    k: 5,
    currentAction: ''
  };

  const [state, animator] = useAlgorithmAnimator(initialState);

  const mergeAlgorithm = (anim) => {
    anim.setAction('开始合并算法执行...');
    anim.delay(1000);

    // 使用局部变量跟踪指针位置
    let i = anim.state.i;
    let j = anim.state.j;
    let k = anim.state.k;
    const nums1 = [...anim.state.nums1];
    const nums2 = [...anim.state.nums2];

    // 主循环：当两个数组都还有元素时
    while (i >= 0 && j >= 0) {
      const val1 = nums1[i];
      const val2 = nums2[j];

      // 比较两个元素
      anim.compare(
        `nums1-${i}`,
        `nums2-${j}`,
        `比较 nums1[${i}]=${val1} 和 nums2[${j}]=${val2}`
      );

      if (val1 > val2) {
        anim.move(
          val1,
          `nums1-${i}`,
          `nums1-${k}`,
          `${val1} > ${val2}，移动 nums1[${i}] 到位置 ${k}`
        );

        anim.updateArray('nums1', k, val1);
        if (k !== i) {
          anim.updateArray('nums1', i, 0);
        }
        anim.updatePointer('i', i - 1);
        i--; // 更新局部变量
      } else {
        // 移动 nums2[j] 到 nums1[k]
        anim.move(
          val2,
          `nums2-${j}`,
          `nums1-${k}`,
          `${val2} >= ${val1}，移动 nums2[${j}] 到位置 ${k}`
        );

        anim.updateArray('nums1', k, val2);
        anim.updatePointer('j', j - 1);
        j--; // 更新局部变量
      }

      anim.updatePointer('k', k - 1);
      k--; // 更新局部变量
      anim.delay(500);
    }

    // 处理剩余的 nums1 元素
    while (i >= 0) {
      const val = nums1[i];

      if (k !== i) {
        anim.setAction(`移动剩余元素 nums1[${i}]=${val} 到位置 ${k}`);
        anim.move(
          val,
          `nums1-${i}`,
          `nums1-${k}`,
          `移动 nums1[${i}] 到正确位置`
        );
        anim.updateArray('nums1', k, val);
        anim.updateArray('nums1', i, 0);
      } else {
        anim.setAction(`nums1[${i}]=${val} 已在正确位置`);
        anim.highlight([`nums1-${i}`], 800);
      }

      anim.updatePointer('i', i - 1);
      anim.updatePointer('k', k - 1);
      i--; // 更新局部变量
      k--; // 更新局部变量
      anim.delay(600);
    }

    // 处理剩余的 nums2 元素
    while (j >= 0) {
      const val = nums2[j];
      anim.setAction(`移动剩余元素 nums2[${j}]=${val} 到位置 ${k}`);

      anim.move(
        val,
        `nums2-${j}`,
        `nums1-${k}`,
        `移动 nums2[${j}] 到位置 ${k}`
      );

      anim.updateArray('nums1', k, val);
      anim.updatePointer('j', j - 1);
      anim.updatePointer('k', k - 1);
      j--; // 更新局部变量
      k--; // 更新局部变量
      anim.delay(600);
    }
  };

  const handleReset = () => {
    animator.reset(initialState);
  };

  const AnimationComponent = () => (
    <div className="space-y-6">
      {/* 控制面板 */}
      <ControlPanel
        animator={animator}
        algorithmFunction={mergeAlgorithm}
        title="动态合并有序数组"
        onReset={handleReset}
      />

      {/* 数组可视化 */}
      <div className="space-y-6">
        <ArrayVisualization
          array={state.nums1}
          arrayName="nums1"
          title="nums1 数组（目标数组）"
          pointers={{ i: state.i, k: state.k }}
          comparing={state.comparing || []}
          highlighting={state.highlighting || []}
          elementRefs={elementRefs}
        />

        <ArrayVisualization
          array={state.nums2}
          arrayName="nums2"
          title="nums2 数组（源数组）"
          pointers={{ j: state.j }}
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
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 font-bold">i</span>
            <span className="text-gray-600">nums1 指针: {state.i >= 0 ? state.i : '完成'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-600 font-bold">j</span>
            <span className="text-gray-600">nums2 指针: {state.j >= 0 ? state.j : '完成'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-600 font-bold">k</span>
            <span className="text-gray-600">填充指针: {state.k >= 0 ? state.k : '完成'}</span>
          </div>
        </div>
      </div>

      {/* 移动动画 - 现在通过 Portal 渲染，不会影响布局 */}
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
      problemFile="merge.md"
      codeFile="merge.js"
      animationComponent={<AnimationComponent />}
      title="动态合并两个有序数组"
    />
  );
}

export default LC88;