import type { App } from 'vue';
import { app } from '../main';

interface Use {
  install: (app: App, ...options: any[]) => void;
}

const installedList = new Set();

export function MyUse<T extends Use>(plugin: T, ...options: any[]) {
  if (installedList.has(plugin)) {
    return console.warn('重复添加插件', plugin);
  } else {
    plugin.install(app, ...options);
    installedList.add(plugin);
  }
}
