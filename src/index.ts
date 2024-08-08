import type { Zlider } from "./types";
import type { App, VNode } from "vue";
import { isVNode } from 'vue';
import { DirectiveBinding } from '@vue/runtime-core';

const processChildren = (vnode: VNode, bind: DirectiveBinding<Zlider>): VNode[] => {
    const children = Array.of(vnode.children)
        .filter((item) => isVNode(item)) as unknown as VNode[]

    // we have to convert this to a user-friendly API, but still not too custom
    // https://vuejs.org/guide/built-ins/transition#javascript-hooks
    for (const [index, child] of children.entries()) {
        child.el.style.display = index === bind.value.index ? 'block' : 'none'

        child.transition.beforeEnter = () => {}
        child.transition.enter = () => {}
        child.transition.leave = () => {}
        child.transition.afterLeave = () => {}
        child.transition.persisted = true
        child.transition.afterLeave = () => {}
        child.transition.afterLeave = () => {}
    }

    return children
}

const setup = (el: HTMLElement, bind: DirectiveBinding<Zlider>, vnode: VNode) => {
    bind.value.children = processChildren(vnode, bind)

    const jump = (by: number) => {
        bind.value.index = bind.value.index + by
    }

    const go = (to: number) => {
        bind.value.index = to % bind.value.children.length;
    }

    bind.value.jump = (by) => jump(by)
    bind.value.go = (to) => go(to)
    bind.value.prev = () => jump(-1)
    bind.value.next = () => jump(1)
}

const install = (app: App) => {
    app.directive<HTMLElement, Zlider>('zlider', {
        created: (el, bind, vnode) => {
            setup(el, bind, vnode)
        },
        updated: setup,
    })
};

export default install
