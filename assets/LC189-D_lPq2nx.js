import{r as k,j as n}from"./index-_a2dy_eJ.js";import{u as f,L as $,C as N,A as y,M as S}from"./ControlPanel-C-Z0PDht.js";import"./MarkdownRenderer-uzUyTDzS.js";const A=`# 轮转数组

**难度：** 中等  
**核心技能：** 数组反转 • 三次反转法 • 原地操作

> **题目来源：** [LeetCode 189. 轮转数组](https://leetcode.cn/problems/rotate-array/)

## 🎯 题目描述

给定一个数组，将数组中的元素向右轮转 \`k\` 个位置，其中 \`k\` 是非负数。

**要求：** 使用空间复杂度为 O(1) 的原地算法解决这个问题。

## 📋 示例演示

### 示例 1：
**输入：** nums = [1,2,3,4,5,6,7], k = 3  
**输出：** [5,6,7,1,2,3,4]  
**解释：**
- 向右轮转 1 步: [7,1,2,3,4,5,6]
- 向右轮转 2 步: [6,7,1,2,3,4,5]
- 向右轮转 3 步: [5,6,7,1,2,3,4]

### 示例 2：
**输入：** nums = [-1,-100,3,99], k = 2  
**输出：** [3,99,-1,-100]  
**解释：**
- 向右轮转 1 步: [99,-1,-100,3]
- 向右轮转 2 步: [3,99,-1,-100]

### 示例 3：
**输入：** nums = [1,2], k = 1  
**输出：** [2,1]

## 💡 解决方案：三次反转法

**算法思路：**
- 通过三次数组反转操作来实现轮转效果
- 第一次：反转整个数组
- 第二次：反转前 k 个元素
- 第三次：反转后 n-k 个元素

**核心优势：**
- 时间复杂度：O(n) - 每个元素最多被访问 3 次
- 空间复杂度：O(1) - 原地操作，只使用常数额外空间
- 算法简洁优雅，易于理解和实现

## 🔍 算法步骤

以 nums = [1,2,3,4,5,6,7], k = 3 为例：

1. **处理 k 值：** k = k % nums.length（处理 k 大于数组长度的情况）
2. **第一次反转：** 反转整个数组 [1,2,3,4,5,6,7] → [7,6,5,4,3,2,1]
3. **第二次反转：** 反转前 k 个元素 [7,6,5,4,3,2,1] → [5,6,7,4,3,2,1]
4. **第三次反转：** 反转后 n-k 个元素 [5,6,7,4,3,2,1] → [5,6,7,1,2,3,4]

## 🔧 反转函数实现

\`\`\`javascript
function reverse(i, j, nums) {
    while (i < j) {
        [nums[i], nums[j - 1]] = [nums[j - 1], nums[i]];
        i++;
        j--;
    }
}
\`\`\`

**参数说明：**
- \`i\`：起始索引（包含）
- \`j\`：结束索引（不包含）
- \`nums\`：要反转的数组

## ⚡ 复杂度分析

- **时间复杂度：** O(n) - 三次反转操作，每次最多遍历 n 个元素
- **空间复杂度：** O(1) - 原地操作，只使用了常数额外空间

## 🎨 算法可视化要点

- **三步反转过程：** 清晰展示每一步反转操作的效果
- **元素移动轨迹：** 显示每个元素如何从原位置移动到最终位置
- **双指针交换：** 展示反转函数中双指针如何向中间靠拢并交换元素
- **边界处理：** 演示 k 值的模运算处理过程

## 🧠 算法直觉

想象一个圆形队列，向右轮转 k 位相当于：
1. 把整个队列"翻转"过来
2. 把前 k 个位置"翻转"回来
3. 把剩余位置"翻转"回来

这样就巧妙地实现了轮转效果，而且是原地操作！`,E=`/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  function reverse(i, j, nums) {
    while (i < j) {
      [nums[i], nums[j - 1]] = [nums[j - 1], nums[i]];
      i++;
      j--;
    }
  }
  reverse(0, nums.length);
  reverse(0, k);
  reverse(k, nums.length);
};`;function L(){const d=k.useRef({}),m={nums:[1,2,3,4,5,6,7],k:3,step:0,reverseStart:-1,reverseEnd:-1,currentAction:"",highlighting:[]},[e,u]=f(m),v=t=>{const s=[...t.state.nums];let r=t.state.k%s.length;if(r===0){t.setAction("k为0，无需轮转");return}t.setAction(`开始轮转数组，k = ${r}`),t.updateState({step:0}),t.delay(1e3);const o=(a,c,p,j)=>{t.setAction(j),t.updateState({step:p,reverseStart:a,reverseEnd:c-1,highlighting:[]}),t.delay(800);let l=a,i=c-1;for(;l<i;){t.updateState({highlighting:[l,i]}),t.setAction(`交换位置 ${l} 和 ${i} 的元素: ${s[l]} ↔ ${s[i]}`),t.delay(1200);const g=s[l],h=s[i];t.move(g,`nums-${l}`,`nums-${i}`,`移动 ${g} 到位置 ${i}`),t.move(h,`nums-${i}`,`nums-${l}`,`移动 ${h} 到位置 ${l}`),[s[l],s[i]]=[s[i],s[l]],t.updateState({nums:[...s]}),t.delay(800),l++,i--}t.updateState({highlighting:[]}),t.delay(500)};o(0,s.length,1,`第一步：反转整个数组 [0, ${s.length-1}]`),o(0,r,2,`第二步：反转前 ${r} 个元素 [0, ${r-1}]`),o(r,s.length,3,`第三步：反转后 ${s.length-r} 个元素 [${r}, ${s.length-1}]`),t.setAction(`轮转完成！数组向右轮转了 ${r} 个位置`),t.updateState({step:3,reverseStart:-1,reverseEnd:-1,highlighting:[],currentAction:"算法完成"})},x=()=>{u.reset(m)},b=()=>n.jsxs("div",{className:"space-y-6",children:[n.jsx(N,{animator:u,algorithmFunction:v,title:"三次反转法轮转数组",onReset:x}),n.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-sm border",children:[n.jsx("h3",{className:"text-lg font-semibold mb-4 text-gray-800",children:"轮转数组可视化"}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[n.jsxs("div",{className:"bg-blue-50 p-4 rounded-lg",children:[n.jsx("div",{className:"text-sm font-medium text-blue-600",children:"轮转步数"}),n.jsxs("div",{className:"text-2xl font-bold text-blue-800",children:["k = ",e.k]})]}),n.jsxs("div",{className:"bg-green-50 p-4 rounded-lg",children:[n.jsx("div",{className:"text-sm font-medium text-green-600",children:"当前步骤"}),n.jsxs("div",{className:"text-xl font-bold text-green-800",children:[e.step===0&&"准备开始",e.step===1&&"第一次反转",e.step===2&&"第二次反转",e.step===3&&"第三次反转"]})]})]}),n.jsxs("div",{className:"mb-6",children:[n.jsx("h4",{className:"text-sm font-medium text-gray-600 mb-2",children:"数组状态："}),n.jsx(y,{array:e.nums,arrayName:"nums",title:"轮转数组",pointers:{reverseStart:e.reverseStart,reverseEnd:e.reverseEnd},highlighting:e.highlighting||[],elementRefs:d,renderElement:(t,s)=>{const r=e.highlighting?.includes(s),o=e.reverseStart>=0&&s>=e.reverseStart&&s<=e.reverseEnd;return n.jsx("div",{ref:a=>d.current[`nums-${s}`]=a,className:`
                    w-12 h-12 flex items-center justify-center border-2 rounded-lg font-semibold text-lg
                    transition-all duration-300
                    ${r?"border-red-500 bg-red-100 text-red-800 scale-110 shadow-lg":o?"border-blue-500 bg-blue-100 text-blue-800":"border-gray-300 bg-gray-50 text-gray-700"}
                  `,children:t},s)}})]}),e.reverseStart>=0&&e.reverseEnd>=0&&n.jsxs("div",{className:"bg-blue-50 p-4 rounded-lg mb-4",children:[n.jsx("div",{className:"text-sm font-medium text-blue-600 mb-2",children:"当前反转范围"}),n.jsxs("div",{className:"text-blue-800",children:["索引 [",e.reverseStart,", ",e.reverseEnd,"]",e.step===1&&"（整个数组）",e.step===2&&`（前 ${e.k} 个元素）`,e.step===3&&`（后 ${e.nums.length-e.k} 个元素）`]})]}),n.jsxs("div",{className:"bg-blue-50 border border-blue-200 p-4 rounded-lg",children:[n.jsx("h4",{className:"font-semibold text-blue-800 mb-2",children:"当前操作："}),n.jsx("p",{className:"text-blue-700",children:e.currentAction||'点击"开始执行"来运行算法'})]})]}),e.moving&&n.jsx(S,{value:e.moving.value,fromPos:e.moving.from,toPos:e.moving.to,elementRefs:d})]});return n.jsx($,{problemContent:A,codeContent:`\`\`\`javascript
${E}
\`\`\``,animationComponent:n.jsx(b,{}),title:"三次反转法轮转数组"})}export{L as default};
