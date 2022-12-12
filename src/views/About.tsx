import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const num = ref<number>(10);
    const add = () => {
      return num.value++;
    };
    // 减
    const minus = () => {
      return num.value--;
    };
    return () => {
      return (
        <>
          <button onClick={() => add()}>+</button>
          {num.value}
          <button onClick={() => minus()}>-</button>
        </>
      );
    };
  },
});
