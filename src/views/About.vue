<script lang="jsx">
  export default defineComponent({
    setup() {
      const num = ref(10);
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
            <a-button onClick={() => add()}>+</a-button>
            {num.value}
            <a-button onClick={() => minus()}>-</a-button>
          </>
        );
      };
    },
  });
</script>
