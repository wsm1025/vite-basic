const tong = new WeakMap();
let activeEffect;
const effectStack = [];
const ITERATE_KEY = Symbol();
const TriggerType = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
};
const jobQueue = new Set();
const p = Promise.resolve();
let isFlushing = false;
function flushJob() {
  if (isFlushing) return;
  isFlushing = true;
  p.then(() => {
    jobQueue.forEach((job) => job());
  }).finally(() => {
    isFlushing = false;
  });
}

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    const res = fn();
    effectStack.pop();
    activeEffect = effectStack.at(-1);
    return res;
  };
  effectFn.options = options;
  effectFn.deps = [];
  if (!options.lazy) {
    effectFn();
  }
  return effectFn;
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = tong.get(target);
  if (!depsMap) {
    tong.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

function trigger(target, key, type, newValue) {
  const depsMap = tong.get(target);
  if (!depsMap) return;

  const effects = depsMap.get(key);
  const effectsToRun = new Set();
  effects &&
    effects.forEach((fn) => {
      if (fn !== activeEffect) {
        effectsToRun.add(fn);
      }
    });

  console.log(type, target, key);

  if (type === TriggerType['ADD'] || type === TriggerType['DELETE']) {
    const iterateEffects = depsMap.get(
      Array.isArray(target) && type === TriggerType['ADD'] ? 'length' : ITERATE_KEY
    );
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }
  if (Array.isArray(target) && key === 'length') {
    depsMap.forEach((effects, key) => {
      if (key >= newValue) {
        effects.forEach((effectFn) => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn);
          }
        });
      }
    });
  }
  effectsToRun.forEach((effectFn) => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    has(target, key) {
      track(target, key);
      return Reflect.has(target, key);
    },
    get(target, key, receiver) {
      if (key === 'raw') {
        return target;
      }
      // 非只读时候才需要建立响应式
      if (!isReadonly) {
        track(target, key);
      }
      // 处理嵌套问题
      const res = Reflect.get(target, key, receiver);
      if (isShallow) {
        return res;
      }
      if (typeof res === 'object' && res !== 'null') {
        return isReadonly ? readonly(res) : reactive(res);
      }
      return res;
    },
    set(target, key, newValue, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${key} 只读属性`);
        return true;
      }
      // 新旧值比较
      // 比较NaN
      const oldValue = target[key];
      const type = Array.isArray(target)
        ? Number(key) < target.length
          ? TriggerType['SET']
          : TriggerType['ADD']
        : Object.prototype.hasOwnProperty.call(target, key)
        ? TriggerType['SET']
        : TriggerType['ADD'];
      const res = Reflect.set(target, key, newValue, receiver);
      if (target === receiver.raw) {
        if (oldValue !== newValue && (oldValue === oldValue || newValue === newValue)) {
          trigger(target, key, type, newValue);
        }
      }
      return res;
    },
    ownKeys(target) {
      track(target, ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    deleteProperty(target, key) {
      if (isReadonly) {
        console.warn(`属性 ${key} 只读属性`);
        return true;
      }
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const res = Reflect.deleteProperty(target, key);
      if (res & hadKey) {
        trigger(target, key, 'DELETE');
      }
      return res;
    },
  });
}
function reactive(obj) {
  return createReactive(obj);
}
function shallowReactive(obj) {
  return createReactive(obj, true);
}
function readonly(obj) {
  return createReactive(obj, false, true /*只读*/);
}
function shallowReadOnly(obj) {
  return createReactive(obj, true /*shallow*/, true /*只读*/);
}
function ref(val) {
  const wrapper = {
    value: val,
  };
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true,
  });
  return reactive(wrapper);
}
export { effect, ref, reactive, shallowReactive, readonly, shallowReadOnly };
