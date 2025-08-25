/**
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
};