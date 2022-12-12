import { defineComponent, getCurrentInstance, ref } from 'vue';

export default defineComponent({
  setup() {
    const num = ref<number>(10);
    const instance = getCurrentInstance();
    const add = () => {
      num.value++;
      instance?.proxy?.$loading.show();
    };
    // 减
    const minus = () => {
      num.value--;
      instance?.proxy?.$loading.hide();
    };
    return () => {
      return (
        <>
          <button onClick={() => add()}>+</button>
          {num.value}
          <button onClick={() => minus()}>-</button>
          <p class='fbtn m-20'>前端CV工程师</p>
          <div class='i-ic-baseline-backspace text-3xl bg-green-500 ' m='10' />
        </>
      );
    };
  },
});
