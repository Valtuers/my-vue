const effectStack = [];
let activeEffect;
const targetMap = new WeakMap();

export function effect(fn) {
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      effectStack.push(activeEffect);
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  effectFn();
  return effectFn;
}

export function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const deps = depsMap.get(key);
  if (!deps) {
    return;
  }
  deps.forEach(effectFn => {
    effectFn();
  })
}