import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { configCompressPlugin } from './compression';
import myParse from './myParse';
export function createVitePlugins(viteEnvVars, isBuild) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnvVars;

  const vitePlugins = [
    vue(),
    // vueJsx(),
    myParse(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'],
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ];

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }

  return vitePlugins;
}
