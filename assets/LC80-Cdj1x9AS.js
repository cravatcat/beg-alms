import{r as h,j as e}from"./index-_a2dy_eJ.js";import{u as p,L as g,C as j,A as v,M as f}from"./ControlPanel-C-Z0PDht.js";import"./MarkdownRenderer-uzUyTDzS.js";const $=`# 删除有序数组中的重复项 II

**难度：** 中等  
**核心技能：** 双指针 • 原地去重

> **题目来源：** [LeetCode 80. 删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/)

## 🎯 题目描述

给你一个有序数组 \`nums\`，请你**原地**删除重复出现的元素，使得出现次数超过两次的元素**只出现两次**，返回删除后数组的新长度。

**注意：** 不要使用额外的数组空间，你必须在**原地**修改输入数组并在使用 O(1) 额外空间的条件下完成。

## 📋 示例演示

### 示例 1：
**输入：** nums = [1,1,1,2,2,3]  
**输出：** 5, nums = [1,1,2,2,3]  
**解释：** 函数应返回新长度 5，并且原数组的前五个元素被修改为 1, 1, 2, 2, 3

### 示例 2：
**输入：** nums = [0,0,1,1,1,1,2,3,3]  
**输出：** 7, nums = [0,0,1,1,2,3,3]  
**解释：** 函数应返回新长度 7，并且原数组的前七个元素被修改为 0, 0, 1, 1, 2, 3, 3

## 💡 解决方案：双指针

**算法思路：**
- 使用双指针技术，快指针 \`i\` 遍历数组，慢指针 \`k\` 指向下一个要填入的位置
- 关键判断：\`nums[k-2] !== nums[i]\`，确保当前元素与已处理区域的倒数第2个元素不同
- 这样可以保证任何元素最多连续出现2次`,N=`/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let k = 2;
  for (let i = 2; i < nums.length; i++) {
    if (nums[k - 2] !== nums[i]) {
      nums[k++] = nums[i];
    }
  }
  return k;
};`;function A(){const o=h.useRef({}),l={nums:[1,1,1,2,2,3],k:2,i:2,currentAction:""},[n,m]=p(l),u=s=>{s.setAction("开始删除有序数组重复项 II 算法执行..."),s.delay(1e3);let t=s.state.k,i=s.state.i;const r=[...s.state.nums];for(s.setAction("前两个元素无论如何都保留，从第3个元素开始处理"),s.delay(1e3);i<r.length;)s.highlight([`nums-${t-2}`,`nums-${i}`],800),s.compare(`nums-${t-2}`,`nums-${i}`,`比较 nums[${t-2}]=${r[t-2]} 和 nums[${i}]=${r[i]}`),r[t-2]!==r[i]?(t!==i?s.move(r[i],`nums-${i}`,`nums-${t}`,`发现新元素 ${r[i]}，移动到位置 ${t}`):s.setAction(`元素 ${r[i]} 已在正确位置 ${t}`),r[t]=r[i],s.updateArray("nums",t,r[i]),t++,s.updatePointer("k",t)):s.setAction(`nums[${t-2}]=${r[t-2]} 等于 nums[${i}]=${r[i]}，跳过重复元素（已有2个）`),i++,s.updatePointer("i",i),s.delay(800);s.setAction(`算法完成！数组前 ${t} 个元素为去重后的结果（每个元素最多出现2次）`);const c=[];for(let a=0;a<t;a++)c.push(`nums-${a}`);s.highlight(c,2e3)},d=()=>{m.reset(l)},x=()=>e.jsxs("div",{className:"space-y-6",children:[e.jsx(j,{animator:m,algorithmFunction:u,title:"动态删除有序数组重复项 II",onReset:d}),e.jsx("div",{className:"space-y-6",children:e.jsx(v,{array:n.nums,arrayName:"nums",title:"nums 数组（有序数组，最多保留2个重复元素）",pointers:{k:n.k,i:n.i},comparing:n.comparing||[],highlighting:n.highlighting||[],elementRefs:o})}),e.jsxs("div",{className:"bg-blue-50 border border-blue-200 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-semibold text-blue-800 mb-2",children:"当前操作："}),e.jsx("p",{className:"text-blue-700",children:n.currentAction||'点击"开始执行"来运行算法'})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"指针状态："}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-green-600 font-bold",children:"k"}),e.jsxs("span",{className:"text-gray-600",children:["慢指针（下一个位置）: ",n.k]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-blue-600 font-bold",children:"i"}),e.jsxs("span",{className:"text-gray-600",children:["快指针（遍历位置）: ",n.i<n.nums.length?n.i:"完成"]})]})]}),e.jsxs("div",{className:"mt-2 text-sm text-gray-600",children:[e.jsx("span",{className:"font-medium",children:"当前有效元素个数："})," ",n.k]}),e.jsxs("div",{className:"mt-1 text-sm text-gray-600",children:[e.jsx("span",{className:"font-medium",children:"比较位置 k-2："})," ",n.k>=2?n.k-2:"N/A"]})]}),n.moving&&e.jsx(f,{value:n.moving.value,fromPos:n.moving.from,toPos:n.moving.to,elementRefs:o})]});return e.jsx(g,{problemContent:$,codeContent:`\`\`\`javascript
${N}
\`\`\``,animationComponent:e.jsx(x,{}),title:"动态删除有序数组中的重复项 II"})}export{A as default};
