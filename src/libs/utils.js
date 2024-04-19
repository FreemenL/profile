import toast from 'react-hot-toast';

/**
 * 将十六进制颜色代码转换为RGBA格式
 * @param {string} hexCode 十六进制颜色代码，以“#”开头
 * @param {number} opacity 透明度，取值范围为0到1
 * @returns {string} 返回RGBA颜色字符串
 */
export function hexToRGBA(hexCode, opacity) {
  // 移除颜色代码中的“#”字符
  let hex = hexCode.replace('#', '');

  // 如果颜色代码是三位的，将其扩展为六位
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  // 将十六进制颜色代码的每一对字符转换为对应的十进制RGB值
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 返回包含透明度的RGBA颜色字符串
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * 显示一个成功的toast提示
 * @param {string} text - 要显示的提示文本
 */
export function success(text) {
  toast.success(text); // 使用toast库的成功方法显示文本
}

/**
 * 显示错误信息的函数。
 * @param {string} text - 需要显示的错误信息。
 * @returns {void} 不返回任何内容。
 */
export function error(text) {
  toast.error(text); // 使用toast库的error方法显示错误信息
}

/**
 * 将指定的文本复制到剪贴板。
 * @param {string} text 需要复制到剪贴板的文本。
 * @returns 无返回值。
 */

export function copyToClipboard(text) {
  // 将文本写入剪贴板
  navigator.clipboard.writeText(text);
  // 成功复制后给出反馈
  success('Has been copied to your clipboard.');
}
