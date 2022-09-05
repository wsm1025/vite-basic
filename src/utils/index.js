// 按需解析转换 vite 环境变量值（例如布尔值）
// 使用方式
// import { convertEnvVars } from '../utils/index';
// console.log(convertEnvVars(import.meta.env));
export const convertEnvVars = (envConf) => {
  const result = {};
  for (const envVar of Object.keys(envConf)) {
    let convertedValue = envConf[envVar];
    // 转换 "true"、"false" 为布尔值
    convertedValue =
      convertedValue === 'true' ? true : convertedValue === 'false' ? false : convertedValue;
    // 将 VITE_PORT 的值转换为 Number 类型
    if (envVar === 'VITE_PORT') {
      convertedValue = Number(convertedValue);
    }
    // 解析 VITE_PROXY 为 JSON 对象（原为 JSON 数组字符串）
    if (envVar === 'VITE_PROXY' && convertedValue) {
      try {
        convertedValue = JSON.parse(convertedValue.replace(/'/g, '"'));
      } catch (error) {
        convertedValue = '';
      }
    }
    // 添加至返回的对象中
    result[envVar] = convertedValue;
  }
  return result;
};
