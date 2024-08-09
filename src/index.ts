import type { App, VNode, VNodeNormalizedChildren } from "vue";
import type { DirectiveBinding, TransitionHooks } from '@vue/runtime-core';
import type { Zlider } from "./types";

import defu from 'defu';
import { isVNode } from "vue";

const initSlides = (children: VNodeNormalizedChildren, bind: DirectiveBinding<Zlider>) => {
    for (const [index, child] of children.entries()) {
        if (!isVNode(child)) continue;

        child.el.style.display = index === bind.value.index ? 'block' : 'none'

        const onEnter: TransitionHooks['enter'] = (el) => {
            el.style.opacity = 1;
        }

        const onLeave: TransitionHooks['enter'] = (el) => {
            el.style.opacity = 0;
        }

        child.transition = defu(child.transition, {
            enter: onEnter,
            leave: onLeave,
            persisted: true,
        })
    }
}

const setup = (el: HTMLElement, bind: DirectiveBinding<Zlider>, vnode: VNode) => {
    if (bind.value === undefined) bind.value = {}
    if (bind.value.index === undefined) bind.value.index = 0

    const slides = vnode.children.length === 1 ? vnode.children[0].children : vnode.children

    initSlides(slides, bind)

    const jump = (by: number) => {
        bind.value.index = (bind.value.index + by + slides.length) % slides.length
    }

    const go = (to: number) => {
        bind.value.index = to % slides.length
    }

    bind.value.jump = (by) => jump(by)
    bind.value.go = (to) => go(to)
    bind.value.prev = () => jump(-1)
    bind.value.next = () => jump(1)
}

const install = (app: App) => {
    app.directive<HTMLElement, Zlider>('zlider', {
        created: setup,
        updated: setup,
    })
};

export default install
