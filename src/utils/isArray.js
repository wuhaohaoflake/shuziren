// 判断是否为数组
export default function isArray(data) {
  if (Array.isArray) {
    return Array.isArray(data);
  }
}
