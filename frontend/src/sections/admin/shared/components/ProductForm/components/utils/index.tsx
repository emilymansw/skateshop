/* eslint-disable no-plusplus */
/* eslint-disable no-constant-condition */
export const optionValuesCombinationSetter = (arr: string[][]) => {
  const n = arr.length;
  const indices = new Array(n);
  const combinations = [];
  for (let i = 0; i < n; i++) {
    indices[i] = 0;
  }

  while (true) {
    let combination = [];

    for (let i = 0; i < n; i++) {
      combination.push(arr[i][indices[i] as number]);
    }
    combinations.push(combination);
    combination = [];

    let next = n - 1;
    while (next >= 0 && (indices[next] as number) + 1 >= arr[next].length) {
      next--;
    }
    if (next < 0) {
      break;
    }
    indices[next]++;
    for (let i = next + 1; i < n; i++) {
      indices[i] = 0;
    }
  }
  return combinations;
};
