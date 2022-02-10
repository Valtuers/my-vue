import { isFunction } from "../utils";
import { effect, track, trigger } from "./effect";

export function computed(getterOrOption) {
  let getter, setter;
  // 判断参数是函数还是option的getter和setter
  if (isFunction(getterOrOption)) {
    // 如果是函数就直接赋值给getter。setter因为没有操作，所以computed就只能只读了
    getter = getterOrOption;
    setter = () => {
      console.warn('computed is readonly');
    }
  } else {
    getter = getterOrOption.get;
    setter = getterOrOption.set;
  }
  return new ComputedImpl(getter, setter);
}

class ComputedImpl {
  constructor(getter, setter) {
    this._setter = setter;
    this._value = undefined;
    this._dirty = true;
    this.effect = effect(getter, {
      // computed懒处理，第一次不处理
      lazy: true,
      // 调度器
      scheduler: () => {
        this._dirty = true;
        trigger(this, 'value');
      }
    })
  }
  get value() {
    if (this._dirty) {
      this._value = this.effect();
      this._dirty = false;
      track(this, 'value');
    }
    return this._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}