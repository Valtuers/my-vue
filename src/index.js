import { effect } from "./reactivity/effect";
import { reactive } from "./reactivity/reactive";

const obj = (window.obj = reactive({
  count: 0,
  name: 'lmc'
}));

effect(() => {
  console.log("obj.count:" + obj.count);
})