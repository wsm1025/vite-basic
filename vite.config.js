import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import dayjs from 'dayjs';
import pkg from './package.json';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';
import { createVitePlugins } from './build/vite/plugins';
import postcsspxtoviewport from 'postcss-px-to-viewport'; //插件
function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    root,
    base: VITE_PUBLIC_PATH,
    server: {
      open: true,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      postcss: {
        // plugins: [
        //   postcsspxtoviewport({
        //     unitToConvert: 'px', // 要转化的单位
        //     viewportWidth: 750, // UI设计稿的宽度
        //     unitPrecision: 6, // 转换后的精度，即小数点位数
        //     propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        //     viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        //     fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        //     selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
        //     minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        //     mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        //     replace: true, // 是否转换后直接更换属性值
        //     landscape: false, // 是否处理横屏情况
        //   }),
        // ],
      },
    },
    build: {
      minify: 'terser',
      // target: 'es2015',
      // cssTarget: 'chrome86',
      assetsInlineLimit: 4000,
      cssCodeSplit: true,
      outDir: OUTPUT_DIR,
      sourcemap: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
});
