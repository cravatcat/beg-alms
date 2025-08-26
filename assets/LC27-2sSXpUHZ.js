import{r as h,j as e}from"./index-_a2dy_eJ.js";import{u as g,L as p,C as v,A as f,M as j}from"./ControlPanel-C-Z0PDht.js";import"./MarkdownRenderer-uzUyTDzS.js";const b=`# 移除元素

**难度：** 简单  
**核心技能：** 双指针 • 原地移除

> **题目来源：** [LeetCode 27. 移除元素](https://leetcode.cn/problems/remove-element/)

## 🎯 题目描述

给你一个数组 \`nums\` 和一个值 \`val\`，你需要**原地**移除所有数值等于 \`val\` 的元素，并返回移除后数组的新长度。

**注意：** 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并**原地**修改输入数组。元素的顺序可以改变。

## 📋 示例演示

### 示例 1：
**输入：** nums = [3,2,2,3], val = 3  
**输出：** 2, nums = [2,2,_,_]  
**解释：** 函数应该返回新的长度 2，并且 nums 中的前两个元素均为 2

### 示例 2：
**输入：** nums = [0,1,2,2,3,0,4,2], val = 2  
**输出：** 5, nums = [0,1,4,0,3,_,_,_]  
**解释：** 函数应该返回新的长度 5，并且 nums 中的前五个元素为 0,1,3,0,4

### 示例 3：
**输入：** nums = [2,2,2], val = 2  
**输出：** 0, nums = [_,_,_]  
**解释：** 所有元素都需要移除，返回长度为 0

## 💡 解决方案：双指针

**算法思路：**
- 使用双指针技术，一个指针遍历数组，另一个指针标记有效元素的位置
- 遇到不等于 \`val\` 的元素就保留，遇到等于 \`val\` 的元素就跳过
- 最终返回有效元素的个数`,N=`var removeElement = function (nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k++] = nums[i];
    }
  }
  return k;
};`;function A(){const r=h.useRef({}),i={nums:[3,2,2,3],val:3,slow:0,fast:0,currentAction:""},[n,c]=g(i,{speed:1e3}),d=s=>{s.setAction("开始移除元素算法执行..."),s.delay(1e3);let t=s.state.slow,l=s.state.fast;const m=[...s.state.nums],o=s.state.val;for(;l<m.length;){const a=m[l];s.highlight([`nums-${l}`],800),s.setAction(`检查 nums[${l}] = ${a}`),s.delay(800),a!==o?(t!==l?(s.move(a,`nums-${l}`,`nums-${t}`,`${a} ≠ ${o}，移动到位置 ${t}`),s.updateArray("nums",t,a)):(s.setAction(`${a} ≠ ${o}，已在正确位置 ${t}`),s.highlight([`nums-${t}`],600)),s.updatePointer("slow",t+1),t++):(s.setAction(`${a} = ${o}，跳过此元素`),s.highlight([`nums-${l}`],600)),s.updatePointer("fast",l+1),l++,s.delay(500)}s.setAction(`算法完成！新数组长度为 ${t}`),s.delay(1e3)},u=()=>{c.reset(i)},x=()=>e.jsxs("div",{className:"space-y-6",children:[e.jsx(v,{animator:c,algorithmFunction:d,title:"动态移除元素演示",onReset:u}),e.jsx("div",{className:"space-y-6",children:e.jsx(f,{array:n.nums,arrayName:"nums",title:`nums 数组（移除值为 ${n.val} 的元素）`,pointers:{slow:n.slow,fast:n.fast},comparing:n.comparing||[],highlighting:n.highlighting||[],elementRefs:r,customStyles:(s,t)=>t===n.val&&s>=n.slow?"border-red-500 bg-red-100 text-red-700":s<n.slow?"border-green-500 bg-green-100 text-green-700":""})}),e.jsxs("div",{className:"bg-blue-50 border border-blue-200 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-semibold text-blue-800 mb-2",children:"当前操作："}),e.jsx("p",{className:"text-blue-700",children:n.currentAction||'点击"开始执行"来运行算法'})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"指针状态："}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-green-600 font-bold",children:"slow"}),e.jsxs("span",{className:"text-gray-600",children:["慢指针: ",n.slow]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-blue-600 font-bold",children:"fast"}),e.jsxs("span",{className:"text-gray-600",children:["快指针: ",n.fast<n.nums.length?n.fast:"完成"]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-purple-600 font-bold",children:"val"}),e.jsxs("span",{className:"text-gray-600",children:["目标值: ",n.val]})]})]})]}),e.jsxs("div",{className:"bg-yellow-50 border border-yellow-200 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-semibold text-yellow-800 mb-2",children:"算法说明："}),e.jsxs("ul",{className:"text-yellow-700 text-sm space-y-1",children:[e.jsxs("li",{children:["• ",e.jsx("span",{className:"text-green-600 font-semibold",children:"慢指针(slow)"}),"：指向下一个有效元素应该放置的位置"]}),e.jsxs("li",{children:["• ",e.jsx("span",{className:"text-blue-600 font-semibold",children:"快指针(fast)"}),"：遍历数组，寻找不等于val的元素"]}),e.jsxs("li",{children:["• ",e.jsx("span",{className:"text-red-600 font-semibold",children:"红色元素"}),"：等于val的元素，需要被移除"]}),e.jsxs("li",{children:["• ",e.jsx("span",{className:"text-green-600 font-semibold",children:"绿色区域"}),"：已处理的有效元素区域"]})]})]}),n.moving&&e.jsx(j,{value:n.moving.value,fromPos:n.moving.from,toPos:n.moving.to,elementRefs:r})]});return e.jsx(p,{problemContent:b,codeContent:`\`\`\`javascript
${N}
\`\`\``,animationComponent:e.jsx(x,{}),title:"动态移除元素演示"})}export{A as default};
