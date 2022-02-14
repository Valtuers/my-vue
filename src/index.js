import { render } from "./runtime-core/render"
import { h } from "./runtime-core/vnode"

const vnode = h(
  'div',
  {
    class: 'a',
    style: {
      border: '1px solid red'
    },
    onClick: () => console.log('click'),
    id: 'foo',
    custom: false,
    checked: ''
  },
  [
    h(
      'ul',
      null,
      [
        h('li',null,1),
        h('li',null,2),
        h('li',null,3),
      ]
    )
  ]
)

render(vnode, document.body)