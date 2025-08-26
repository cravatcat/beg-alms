import{r as x,j as e}from"./index-_a2dy_eJ.js";import{u as p,L as g,C as j,A as v,M as f}from"./ControlPanel-C-Z0PDht.js";import"./MarkdownRenderer-uzUyTDzS.js";const $=`# 删除排序数组中的重复项

**难度：** 简单  
**核心技能：** 双指针 • 原地去重

> **题目来源：** [LeetCode 26. 删除排序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

## 🎯 题目描述

给你一个**非严格递增排列**的整数数组 \`nums\`，请你**原地**删除重复出现的元素，使每个元素**只出现一次**，返回删除后数组的新长度。

**注意：** 不要使用额外的数组空间，你必须在**原地**修改输入数组并在使用 O(1) 额外空间的条件下完成。

## 📋 示例演示

### 示例 1：
**输入：** nums = [1,1,2]  
**输出：** 2, nums = [1,2,_]  
**解释：** 函数应该返回新的长度 2，并且原数组 nums 的前两个元素被修改为 1, 2

### 示例 2：
**输入：** nums = [0,0,1,1,1,2,2,3,3,4]  
**输出：** 5, nums = [0,1,2,3,4,_,_,_,_,_]  
**解释：** 函数应该返回新的长度 5，并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4

## 💡 解决方案：快慢双指针

**算法思路：**
- 使用快慢双指针，慢指针 \`k\` 指向下一个唯一元素应该放置的位置
- 快指针 \`i\` 遍历数组，寻找新的唯一元素
- 当发现新元素时，将其复制到慢指针位置，然后慢指针前进`,b=`/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[k - 1] !== nums[i]) {
      nums[k++] = nums[i];
    }
  }
  return k;
};`;function A(){const a=x.useRef({}),l={nums:[0,0,1,1,1,2,2,3,3,4],k:1,i:1,currentAction:""},[r,m]=p(l),u=t=>{t.setAction("开始删除重复元素算法执行..."),t.delay(1e3);let s=t.state.k,n=t.state.i;const i=[...t.state.nums];for(;n<i.length;)t.highlight([`nums-${s-1}`,`nums-${n}`],800),t.compare(`nums-${s-1}`,`nums-${n}`,`比较 nums[${s-1}]=${i[s-1]} 和 nums[${n}]=${i[n]}`),i[s-1]!==i[n]?(s!==n?t.move(i[n],`nums-${n}`,`nums-${s}`,`发现新的唯一元素 ${i[n]}，移动到位置 ${s}`):t.setAction(`元素 ${i[n]} 已在正确位置 ${s}`),i[s]=i[n],t.updateArray("nums",s,i[n]),s++,t.updatePointer("k",s)):t.setAction(`nums[${s-1}]=${i[s-1]} 等于 nums[${n}]=${i[n]}，跳过重复元素`),n++,t.updatePointer("i",n),t.delay(800);t.setAction(`算法完成！数组前 ${s} 个元素为去重后的结果`);const c=[];for(let o=0;o<s;o++)c.push(`nums-${o}`);t.highlight(c,2e3)},d=()=>{m.reset(l)},h=()=>e.jsxs("div",{className:"space-y-6",children:[e.jsx(j,{animator:m,algorithmFunction:u,title:"动态删除有序数组重复项",onReset:d}),e.jsx("div",{className:"space-y-6",children:e.jsx(v,{array:r.nums,arrayName:"nums",title:"nums 数组（有序数组）",pointers:{k:r.k,i:r.i},comparing:r.comparing||[],highlighting:r.highlighting||[],elementRefs:a})}),e.jsxs("div",{className:"bg-blue-50 border border-blue-200 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-semibold text-blue-800 mb-2",children:"当前操作："}),e.jsx("p",{className:"text-blue-700",children:r.currentAction||'点击"开始执行"来运行算法'})]}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"指针状态："}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-green-600 font-bold",children:"k"}),e.jsxs("span",{className:"text-gray-600",children:["慢指针（唯一元素位置）: ",r.k]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-blue-600 font-bold",children:"i"}),e.jsxs("span",{className:"text-gray-600",children:["快指针（遍历位置）: ",r.i<r.nums.length?r.i:"完成"]})]})]}),e.jsxs("div",{className:"mt-2 text-sm text-gray-600",children:[e.jsx("span",{className:"font-medium",children:"当前唯一元素个数："})," ",r.k]})]}),r.moving&&e.jsx(f,{value:r.moving.value,fromPos:r.moving.from,toPos:r.moving.to,elementRefs:a})]});return e.jsx(g,{problemContent:$,codeContent:`\`\`\`javascript
${b}
\`\`\``,animationComponent:e.jsx(h,{}),title:"动态删除有序数组中的重复项"})}export{A as default};
