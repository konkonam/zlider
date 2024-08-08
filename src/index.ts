import type { Options } from "./types";
import { type App } from "vue";
import { defu } from "defu";

/*
1. events using native event listeners
2. create a controller on mounted and on updated


*/

const defaultOptions: Options = {
    arrows: true,
} as const;


const destroyZlider = (element: HTMLElement) => {
    element.removeEventListener('zlider:jump');
    element.removeEventListener('zlider:go');
    element.removeEventListener('zlider:prev');
    element.removeEventListener('zlider:next');
}

const initZlider = (element: HTMLElement, options: Options) => {
    destroyZlider(element)

    element.addEventListener('zlider:jump', (by: number) => jump(by));
    element.addEventListener('zlider:go', (to: number) => go(to));
    element.addEventListener('zlider:prev', () => jump(-1));
    element.addEventListener('zlider:next', () => jump(1));
}

const install = (app: App) => {
    app.directive<HTMLElement, Options>('zlider', {
        mounted: (element, binding, vnode) => {
            const index = ref(0)

            console.log(element)
            console.log(binding)
            console.log(vnode)

            const options = computed(() => defu(binding.value, defaultOptions));
            const children = computed(() => element.children);

            const jump = (by: number) => {
                index.value = (index.value + by + children.value.length) % children.value.length;
            }

            const go = (to: number) => {
                index.value = to % children.value.length;
            }

            element.classList.add('zlider');
            for (const slide of children.value) {
                slide.classList.add('zlider__slide');
            }
        },
        updated: (element, binding, vnode) => {

        }
    });
};

export default install;
