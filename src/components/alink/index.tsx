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
    console.log(keys(appStore.a));
    return () => {
      return (
        <>
          <a
            id={appStore.a.id}
            style={{ ...appStore.a.style }}
            {...appStore.a.events}
            {...appStore.a.info}
          >
            {appStore.a.innerText}
          </a>
          {keys(appStore.a)}
        </>
      );
    };
  },
});
