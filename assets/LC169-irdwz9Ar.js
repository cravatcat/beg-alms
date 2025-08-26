import{r as g,j as n}from"./index-_a2dy_eJ.js";import{u as h,L as x,C as b,A as j,M as f}from"./ControlPanel-C-Z0PDht.js";import"./MarkdownRenderer-uzUyTDzS.js";const p=`# 多数元素

**难度：** 简单  
**核心技能：** 摩尔投票法 • 计数器

> **题目来源：** [LeetCode 169. 多数元素](https://leetcode.cn/problems/majority-element/)

## 🎯 题目描述

给定一个大小为 \`n\` 的数组 \`nums\`，返回其中的多数元素。多数元素是指在数组中出现次数**大于** \`⌊ n/2 ⌋\` 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

**进阶：** 尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。

## 📋 示例演示

### 示例 1：
**输入：** nums = [3,2,3]  
**输出：** 3

### 示例 2：
**输入：** nums = [2,2,1,1,1,2,2]  
**输出：** 2

### 示例 3：
**输入：** nums = [1]  
**输出：** 1

## 💡 解决方案：摩尔投票法（Boyer-Moore Voting Algorithm）

**算法思路：**
- 维护一个候选者（nominee）和一个计数器（counter）
- 遍历数组，如果当前元素与候选者相同，计数器加1；否则计数器减1
- 当计数器为0时，更换候选者为当前元素，并重置计数器为1
- 由于多数元素出现次数大于 n/2，最终的候选者一定是多数元素

**核心优势：**
- 时间复杂度：O(n) - 只需要一次遍历
- 空间复杂度：O(1) - 只使用常数额外空间
- 算法巧妙利用了多数元素的特性：即使被其他元素"抵消"，最终仍会胜出

## 🔍 算法步骤

1. **初始化：** 将第一个元素设为候选者，计数器设为1
2. **遍历数组：** 从第二个元素开始
   - 如果计数器为0，更新候选者为当前元素，计数器重置为1
   - 如果当前元素等于候选者，计数器加1
   - 如果当前元素不等于候选者，计数器减1
3. **返回结果：** 遍历结束后的候选者即为多数元素

## ⚡ 复杂度分析

- **时间复杂度：** O(n) - 需要遍历整个数组一次
- **空间复杂度：** O(1) - 只使用了两个额外变量

## 🎨 算法可视化要点

- **候选者变化：** 展示候选者如何在遍历过程中可能发生变化
- **计数器波动：** 显示计数器如何随着相同/不同元素而增减
- **"投票"过程：** 形象化展示每个元素如何为候选者"投票"或"反对"`,v=`/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let nominee = nums[0];
  let counter = 1;
  for (let i = 1; i < nums.length; i++) {
    if (counter === 0) {
      counter = 1;
      nominee = nums[i];
    } else if (nominee === nums[i]) {
      ++counter;
    } else {
      --counter;
    }
  }
  return nominee;
};`;function A(){const l=g.useRef({}),m={nums:[2,2,1,1,1,2,2],nominee:2,counter:1,i:1,currentAction:""},[s,a]=h(m),c=e=>{e.setAction("开始摩尔投票法算法执行...");let t=e.state.nominee,r=e.state.counter,o=e.state.i;const i=[...e.state.nums];for(e.setAction(`初始化：候选者 = ${t}, 计数器 = ${r}`),e.highlight([`nums-${o}`],800),e.updatePointer("i",o);o<i.length;)e.setAction(`处理元素 nums[${o}] = ${i[o]}`),r===0?(t=i[o],r=1,e.setAction(`计数器为0，更换候选者为 ${t}，计数器重置为 1`)):t===i[o]?(r++,e.setAction(`元素 ${i[o]} 与候选者 ${t} 相同，计数器 +1 = ${r}`)):(r--,e.setAction(`元素 ${i[o]} 与候选者 ${t} 不同，计数器 -1 = ${r}`)),e.updatePointer("i",o),e.updateState({nominee:t,counter:r}),e.highlight([`nums-${o}`],1200),o++;e.setAction(`算法结束，多数元素为：${t}`),e.highlight(["nums-result"],1500),e.setState({nominee:t,counter:r,currentAction:"算法完成"})},u=()=>{a.reset(m)},d=()=>n.jsxs("div",{className:"space-y-6",children:[n.jsx(b,{animator:a,algorithmFunction:c,title:"摩尔投票法求多数元素",onReset:u}),n.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-sm border",children:[n.jsx("h3",{className:"text-lg font-semibold mb-4 text-gray-800",children:"摩尔投票法可视化"}),n.jsxs("div",{className:"mb-6",children:[n.jsx("h4",{className:"text-sm font-medium text-gray-600 mb-2",children:"输入数组："}),n.jsx(j,{array:s.nums,arrayName:"nums",title:"输入数组",pointers:{i:s.i},highlighting:s.highlighting||[],elementRefs:l,renderElement:(e,t)=>n.jsx("div",{ref:r=>l.current[`nums-${t}`]=r,className:`
                  w-12 h-12 flex items-center justify-center border-2 rounded-lg font-semibold text-lg
                  transition-all duration-300
                  ${s.highlighting?.includes(`nums-${t}`)?"border-blue-500 bg-blue-100 text-blue-800 scale-110":"border-gray-300 bg-gray-50 text-gray-700"}
                  ${t===s.i?"ring-2 ring-orange-400":""}
                `,children:e},t)})]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",children:[n.jsxs("div",{className:"bg-blue-50 p-4 rounded-lg",children:[n.jsx("div",{className:"text-sm font-medium text-blue-600",children:"当前候选者"}),n.jsx("div",{className:"text-2xl font-bold text-blue-800",children:s.nominee})]}),n.jsxs("div",{className:"bg-green-50 p-4 rounded-lg",children:[n.jsx("div",{className:"text-sm font-medium text-green-600",children:"计数器"}),n.jsx("div",{className:"text-2xl font-bold text-green-800",children:s.counter})]}),n.jsxs("div",{className:"bg-orange-50 p-4 rounded-lg",children:[n.jsx("div",{className:"text-sm font-medium text-orange-600",children:"当前位置"}),n.jsx("div",{className:"text-2xl font-bold text-orange-800",children:s.i})]})]}),n.jsxs("div",{className:"bg-blue-50 border border-blue-200 p-4 rounded-lg",children:[n.jsx("h4",{className:"font-semibold text-blue-800 mb-2",children:"当前操作："}),n.jsx("p",{className:"text-blue-700",children:s.currentAction||'点击"开始执行"来运行算法'})]})]}),s.moving&&n.jsx(f,{value:s.moving.value,fromPos:s.moving.from,toPos:s.moving.to,elementRefs:l})]});return n.jsx(x,{problemContent:p,codeContent:`\`\`\`javascript
${v}
\`\`\``,animationComponent:n.jsx(d,{}),title:"摩尔投票法求多数元素"})}export{A as default};
