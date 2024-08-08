import type { App, DirectiveBinding, VNode } from "vue";
import type { Options } from "./types";

import { defu } from "defu";
import { DirectiveHook } from "@vue/runtime-core";
import { computed, h, render } from "vue";

type MountedFn = DirectiveHook<HTMLElement, DirectiveBinding<V>, VNode<any, HTMLElement>>;

const defaultOptions: Options = {
    arrows: true,
} as const;

const getParentElement = (element: HTMLElement & { zlider?: Zlider }, depth: 0) => {
    if (depth > 10) return;

    if (element.zlider !== undefined) {
        return element;
    }

    return getParentElement(element.parentElement, depth++);
};

const init: MountedFn = (element, binding, vnode) => {
    const children = computed(() => element.children);
    const options = vnode.zlider.options;

    const index = ref(0);

    const jump = (by: number) => {
        index.value = (index.value + by + children.value.length) % children.value.length;
    }

    const go = (to: number) => {
        index.value = to % children.value.length;
    }

    element.zlider.controller = { jump, go };

    element.classList.add('zlider');
    for (const slide of children.value) {
        slide.classList.add('zlider__slide');
    }

    if (!element.__zlider_arrows) {
        const arrows = h('nav', { class: 'zlider__arrows' }, [
            h('button', 'Prev'),
            h('button', 'Next'),
        ]);

        render(arrows, element);
    }

    if (!element.__zlider_pagination) {
        const pagination = h('div', 'Test');

        render(pagination, element);
    }
};

const initArrows: MountedFn = (element, binding, vnode) => {
    console.log(getParentElement(element).zlider);
};

const initPagination: MountedFn = (element, binding, vnode) => {
    console.log(getParentElement(element).zlider);
};

const mounted: MountedFn = (element, binding, vnode) => {
    switch (binding.arg) {
        case undefined:
            init(element, binding, vnode);
            break;
        case 'arrows':
            initArrows(element, binding, vnode);
            break;
        case 'pagination':
            initPagination(element, binding, vnode);
            break;
        default:
            console.error('Invalid usage of v-zlider directive');
            break;
    }
};

const created: MountedFn = (element, binding, vnode) => {
    if (binding.arg !== undefined) return;

    const options = defu(binding.value, defaultOptions);

    element.zlider = {
        controller: {},
        options,
    };
};

const install = (app: App) => {
    app.directive<HTMLElement, Options>('zlider', {
        created,
        mounted,
    });
};

export default install;
