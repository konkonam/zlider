import type { App, VNode, VNodeNormalizedChildren } from "vue";
import type { DirectiveBinding } from '@vue/runtime-core';

import {
    isVNode, resolveTransitionHooks,
    setTransitionHooks,
    useTransitionState,
    vShow,
    withDirectives
} from "vue";
import { isArray } from '@vue/shared';
import { TransitionProps } from '@vue/runtime-dom';

export interface ZliderElement {
    index: number;
    jump: (by: number) => void;
    go: (to: number) => void;
    prev: () => void;
    next: () => void;
    options: {
        arrows: boolean;
        transition: TransitionProps;
    };
}

export type Zlider = Partial<ZliderElement>;

const initTransition = (vnode: VNode, bind: DirectiveBinding<Zlider>) => {
    const instance = getCurrentInstance()!
    const state = useTransitionState()

    setTransitionHooks(
        vnode,
        resolveTransitionHooks(
            vnode,
            bind.value.options.transition,
            state,
            instance,
        ),
    )
}

const initSlides = (children: VNodeNormalizedChildren, bind: DirectiveBinding<Zlider>) => {
    for (const [index, child] of isArray(children) ? children.entries() : []) {
        if (!isVNode(child)) continue;

        initTransition(child, bind)
    }
}

const setup = (el: HTMLElement, bind: DirectiveBinding<Zlider>, vnode: VNode) => {
    if (bind.value === undefined) bind.value = {}
    if (bind.value.index === undefined) bind.value.index = 0

    const slides = vnode.children.length === 1 ? vnode.children[0].children : vnode.children

    initSlides(slides, bind)

    const jump = (by: number) => {
        bind.value.index = (bind.value.index + by + slides.length) % slides.length
        bind.instance.$emit('zlide', slides[bind.value.index])
    }

    const go = (to: number) => {
        bind.value.index = to % slides.length
        bind.instance.$emit('zlide', slides[bind.value.index])
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
