/**
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
};