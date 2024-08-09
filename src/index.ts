import type { DirectiveBinding } from '@vue/runtime-core'
import type { App, VNode, VNodeNormalizedChildren } from 'vue'

import { isArray } from '@vue/shared'
import defu from 'defu';

export interface ZliderOptions {
    index: number
    arrows: boolean
}

export interface ZliderElement {
    jump: (by: number) => void
    go: (to: number) => void
    prev: () => void
    next: () => void
    options: ZliderOptions
}

export type Zlider = Partial<ZliderElement>

const defaultOptions: ZliderOptions = {
    index: 0,
    arrows: true,
} as const

const initSlides = (children: VNodeNormalizedChildren, vnode: VNode) => {
    for (const [index, child] of isArray(children) ? children.entries() : []) {
        child.el.style.display = index === vnode.zlider.index ? 'block' : 'none'
    }
}

const setup = (el: HTMLElement, bind: DirectiveBinding<Zlider>, vnode: VNode) => {
    if (vnode.zlider === undefined) Object.assign(vnode, {
        zlider: defu(bind.value, defaultOptions)
    })

    const slides = vnode.children.length === 1 ? vnode.children[0].children : vnode.children

    const jump = (by: number) => {
        vnode.zlider.index = (vnode.zlider.index + by + slides.length) % slides.length
        updated(el, bind, vnode)
    }

    const go = (to: number) => {
        vnode.zlider.index = to % slides.length
        updated(el, bind, vnode)
    }

    if (bind.value !== undefined) {
        bind.value.jump = (by) => jump(by)
        bind.value.go = (to) => go(to)
        bind.value.prev = () => jump(-1)
        bind.value.next = () => jump(1)
    }

    updated(el, bind, vnode)
}

const updated = (el: HTMLElement, bind: DirectiveBinding<Zlider>, vnode: VNode) => {
    const children = vnode.children.length === 1 ? vnode.children[0].children : vnode.children

    initSlides(children, vnode)

    if (bind.value !== undefined) {
        bind.value.index = vnode.zlider.index
    }
}

const install = (app: App) => {
    app.directive<HTMLElement, Zlider>('zlider', {
        created: setup,
        updated: updated,
    })
};

export default install
