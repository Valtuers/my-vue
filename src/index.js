import { effect } from "./reactivity/effect";
import { reactive } from "./reactivity/reactive";

const obj = (window.obj = reactive({
  count1: 0,
  count2: 2
}));

effect(() => {
  effect(() => {
    console.log("obj.count2:" + obj.count2);
  })
  console.log("obj.count1:" + obj.count1);
})