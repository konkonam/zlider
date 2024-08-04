import type { App } from "vue";
import type { Options, State, Controller, Zlider } from "./types";

const install = (app: App) => {
    app.directive<HTMLElement, Options>('zlider', {
        created: (element, binding, vnode) => {
            const options = computed<Options>(() => defu(binding.value, {
                arrows: true,
            }));

            const state = reactive<State>({
                index: 0,
                length: element.children.length,
            });

            const jump = (offset) => state.index = (state.index + offset + state.length) % state.length;
            const go = (index) => state.index = index % state.length;
            const prev = () => jump(-1);
            const next = () => jump(1);

            const controller: Controller = { jump, go, prev, next };
            const zlider: Zlider = { state, controller, options };

            element.classList.add('zlider');
            for (const slide of element.children) {
                slide.classList.add('zlider__slide');
            }

            watch(state, (value) => {
                let index = 0;
                for (const slide of element.children) {
                    slide.classList.toggle('zlider__slide__hidden', index !== value.index);

                    index++;
                }
            }, { immediate: true });

            vnode.props?.['onZlider:mounted']?.(zlider);
        },
    });
};

export default install;
