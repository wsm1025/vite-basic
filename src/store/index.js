import alinkConfig from '../components/alink/config';
import buttonConfig from '../components/button/config';
const aaa = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(Math.random());
    }, 2000);
  });
};
export const useAppStore = defineStore('appStore', {
  state: () => {
    return {
      button: { ...buttonConfig },
      a: {
        ...alinkConfig,
      },
    };
  },
  getters: {
    newVal() {
      state.button.opacity += 0.1;
    },
  },
  actions: {
    change() {
      this.button.style.width = parseInt(this.button.style.width) + 1 + 'px';
    },
  },
});
