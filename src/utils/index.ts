export const newCopy = (arr:any) => {
   return JSON.parse(JSON.stringify(arr));
}
function deepClone(obj: any) {
    if (!obj || typeof obj !== 'object') {
      return;
    }
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      // 遍历可枚举属性，包括原型链上的
      if (obj.hasOwnProperty(key)) {
        newObj[key] =
          typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
      }
    }
    return newObj;
}