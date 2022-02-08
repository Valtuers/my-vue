import { hasChanged, isArray, isObject } from "../utils";
import { track, trigger } from "./effect";

const proxyMap = new WeakMap(); // 使用weakMap的原因是，当proxy的对象不再使用时，垃圾回收系统会自动回收
export function reactive(target) {
  // 判断是否为对象，如果不是就直接返回
  if (!isObject(target)) {
    return target;
  }
  // 如果已经被响应式代理了，如果是就直接返回
  if (isReactive(target)) {
    return target;
  }
  // 如果相同参数值已经被代理，则直接返回旧的代理
  if (proxyMap.get(target)) {
    return proxyMap.get(target);
  }
  // 把参数target用proxy代理起来
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      if (key === '__isReactive') {
        return true;
      }
      const res = Reflect.get(target, key, receiver);
      // 触发effect的tarck方法
      track(target, key);
      return isObject(res) ? reactive(res) : res;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const oldLength = target.length;
      const res = Reflect.set(target, key, value, receiver);
      // 判断新值和旧值是否有改变，有改变才触发effect
      if (hasChanged(oldValue, value)) {
        // 触发effect的trigger方法
        trigger(target, key);
        if(isArray(target) && hasChanged(oldLength, target.length)) {
          trigger(target, 'length');
        }
      }
      return res;
    }
  });
  // 以参数值为键值，可以用作判断相同参数值的情况下有没有已经被代理的情况
  proxyMap.set(target, proxy);
  return proxy;
}

export function isReactive(target) {
  return !!(target && target.__isReactive)
}