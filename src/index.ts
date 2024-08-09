import type { DirectiveBinding, RendererElement } from '@vue/runtime-core';
import type { App, VNode, VNodeNormalizedChildren } from "vue";

import { isVNode } from "vue";
import defu from 'defu';
import { isArray } from '@vue/shared';

export interface ZliderElement {
    index: number;
    jump: (by: number) => void;
    go: (to: number) => void;
    prev: () => void;
    next: () => void;
    options: {
        arrows: boolean;
    };
}

export type Zlider = Partial<ZliderElement>;

const initSlides = (children: VNodeNormalizedChildren, bind: DirectiveBinding<Zlider>) => {
    for (const [index, child] of isArray(children) ? children.entries() : []) {
        if (!isVNode(child)) continue;

        child.el.style.display = index === bind.value.index ? 'block' : 'none'

        const onEnter = (el: RendererElement) => {
            el.style.opacity = 1;
        }

        const onLeave = (el: RendererElement) => {
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
