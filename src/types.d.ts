import { ComputedRef, Reactive } from 'vue';


export type Options = {
    arrows: boolean;
};

export type Zlider = {
    controller?: Controller;
    options: ComputedRef<Options>;
};
