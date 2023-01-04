import { defineComponent } from 'vue';
import { useAppStore } from '@/store';
import { Input } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const appStore = useAppStore();
    const keys = (value) => {
      return Object.keys(value).map((e) => {
        if (typeof value[e] === 'string') {
          return (
            <>
              {e}:
              <Input value={value[e]} onChange={(E) => (value[e] = E.target.value)}>
                {value[e]}
              </Input>
            </>
          );
        } else {
          return keys(value[e]);
        }
      });
    };
    return () => {
      return (
        <>
          <button
            id={appStore.button.id}
            style={{ ...appStore.button.style }}
            {...appStore.button.events}
          >
            {appStore.button.innerText}
          </button>
          {keys(appStore.button)}
        </>
      );
    };
  },
});
