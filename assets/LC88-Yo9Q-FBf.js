import{r as j,j as s}from"./index-BhNsE20t.js";import{u as $,L as v,C as y,A as p,M as f}from"./ControlPanel-CkuvBQkb.js";import"./MarkdownRenderer-DTUgtfun.js";const N=`# 合并两个有序数组

**难度：** 简单  
**核心技能：** 双指针 • 逆向合并

> **题目来源：** [LeetCode 88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)

## 🎯 题目描述

给你两个按**非递减顺序**排列的整数数组 \`nums1\` 和 \`nums2\`，另有两个整数 \`m\` 和 \`n\`，分别表示 \`nums1\` 和 \`nums2\` 中元素的数量。

请你**合并** \`nums2\` 到 \`nums1\` 中，使合并后的数组同样按**非递减顺序**排列。

**注意：** \`nums1\` 的初始长度为 \`m + n\`，其中前 \`m\` 个元素为有效元素，后 \`n\` 个元素为 \`0\`（占位符）。
- 最终，合并后数组不应由函数返回，而是存储在数组 \`nums1\` 中
- 为了应对这种情况，\`nums1\` 的初始长度为 \`m + n\`，其中前 \`m\` 个元素表示应合并的元素，后 \`n\` 个元素为 \`0\`，应忽略
- \`nums2\` 的长度为 \`n\`

## 📋 示例演示

### 示例 1：
**输入：** 
- nums1 = [1,2,3,0,0,0], m = 3
- nums2 = [2,5,6], n = 3

**输出：** [1,2,2,3,5,6]  
**解释：** 需要合并 [1,2,3] 和 [2,5,6]，合并的结果是 [1,2,2,3,5,6]

### 示例 2：
**输入：** 
- nums1 = [1], m = 1
- nums2 = [], n = 0

**输出：** [1]  
**解释：** 需要合并 [1] 和 []，合并的结果是 [1]

### 示例 3：
**输入：** 
- nums1 = [0], m = 0
- nums2 = [1], n = 1

**输出：** [1]  
**解释：** 需要合并 [] 和 [1]，合并的结果是 [1]。注意，因为 m = 0，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中

## 💡 解决方案：逆向双指针

**算法思路：**
- 由于 \`nums1\` 的后半部分是空的，可以直接覆盖而不会影响结果
- 从两个数组的末尾开始比较，每次选择较大的元素放到 \`nums1\` 的末尾
- 这样可以避免元素覆盖问题，实现原地合并`,b=`var merge = function (nums1, m, nums2, n) {
  let i = m - 1; 
  let j = n - 1;
  let k = m + n - 1;
  
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
  
  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }
  
  return nums1;
};`;function P(){const o=j.useRef({}),l={nums1:[1,2,3,0,0,0],nums2:[2,5,6],m:3,n:3,i:2,j:2,k:5,currentAction:""},[m,i]=$(l),h=n=>{n.setAction("开始合并算法执行..."),n.delay(1e3);let e=n.state.i,r=n.state.j,t=n.state.k;const c=[...n.state.nums1],d=[...n.state.nums2];for(;e>=0&&r>=0;){const u=c[e],a=d[r];n.compare(`nums1-${e}`,`nums2-${r}`,`比较 nums1[${e}]=${u} 和 nums2[${r}]=${a}`),u>a?(n.move(u,`nums1-${e}`,`nums1-${t}`,`${u} > ${a}，移动 nums1[${e}] 到位置 ${t}`),n.updateArray("nums1",t,u),t!==e&&n.updateArray("nums1",e,0),n.updatePointer("i",e-1),e--):(n.move(a,`nums2-${r}`,`nums1-${t}`,`${a} >= ${u}，移动 nums2[${r}] 到位置 ${t}`),n.updateArray("nums1",t,a),n.updatePointer("j",r-1),r--),n.updatePointer("k",t-1),t--,n.delay(500)}for(;e>=0;){const u=c[e];t!==e?(n.setAction(`移动剩余元素 nums1[${e}]=${u} 到位置 ${t}`),n.move(u,`nums1-${e}`,`nums1-${t}`,`移动 nums1[${e}] 到正确位置`),n.updateArray("nums1",t,u),n.updateArray("nums1",e,0)):(n.setAction(`nums1[${e}]=${u} 已在正确位置`),n.highlight([`nums1-${e}`],800)),n.updatePointer("i",e-1),n.updatePointer("k",t-1),e--,t--,n.delay(600)}for(;r>=0;){const u=d[r];n.setAction(`移动剩余元素 nums2[${r}]=${u} 到位置 ${t}`),n.move(u,`nums2-${r}`,`nums1-${t}`,`移动 nums2[${r}] 到位置 ${t}`),n.updateArray("nums1",t,u),n.updatePointer("j",r-1),n.updatePointer("k",t-1),r--,t--,n.delay(600)}},g=()=>{i.reset(l)},x=()=>s.jsxs("div",{className:"space-y-6",children:[s.jsx(y,{animator:i,algorithmFunction:h,title:"动态合并有序数组",onReset:g}),s.jsxs("div",{className:"space-y-6",children:[s.jsx(p,{array:m.nums1,arrayName:"nums1",title:"nums1 数组（目标数组）",pointers:{i:m.i,k:m.k},comparing:m.comparing||[],highlighting:m.highlighting||[],elementRefs:o}),s.jsx(p,{array:m.nums2,arrayName:"nums2",title:"nums2 数组（源数组）",pointers:{j:m.j},comparing:m.comparing||[],highlighting:m.highlighting||[],elementRefs:o})]}),s.jsxs("div",{className:"bg-blue-50 border border-blue-200 p-4 rounded-lg",children:[s.jsx("h4",{className:"font-semibold text-blue-800 mb-2",children:"当前操作："}),s.jsx("p",{className:"text-blue-700",children:m.currentAction||'点击"开始执行"来运行算法'})]}),s.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[s.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"指针状态："}),s.jsxs("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:"text-blue-600 font-bold",children:"i"}),s.jsxs("span",{className:"text-gray-600",children:["nums1 指针: ",m.i>=0?m.i:"完成"]})]}),s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:"text-red-600 font-bold",children:"j"}),s.jsxs("span",{className:"text-gray-600",children:["nums2 指针: ",m.j>=0?m.j:"完成"]})]}),s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:"text-purple-600 font-bold",children:"k"}),s.jsxs("span",{className:"text-gray-600",children:["填充指针: ",m.k>=0?m.k:"完成"]})]})]})]}),m.moving&&s.jsx(f,{value:m.moving.value,fromPos:m.moving.from,toPos:m.moving.to,elementRefs:o})]});return s.jsx(v,{problemContent:N,codeContent:`\`\`\`javascript
${b}
\`\`\``,animationComponent:s.jsx(x,{}),title:"动态合并两个有序数组"})}export{P as default};
