import { computed } from "./reactivity/computed";
import { ref } from "./reactivity/ref";


let a = (window.a = ref(1));
const b = (window.b = computed({
  get() {
    console.log('bbbbbbbbbbb');
    return a.value * 2;
  },
  set(newVal) {
    a.value = newVal;
  }
}))
const c = (window.c = computed(() => {
  console.log("cccccccccc");
  return a.value * 2;
}))