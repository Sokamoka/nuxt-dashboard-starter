export function isAllowed(array1: string[], array2: string[]) {
  let isAllowed = false;
  for (const a of array1) {
    isAllowed = array2.some((b)=> a === b);
    if (isAllowed) break;
  }
  return isAllowed;
}
