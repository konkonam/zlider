import { ComputedRef, Reactive } from 'vue';

export type Controller = {
    jump?: (by: number) => void,
    go?: (to: number) => void,
};

export type Options = {
    arrows: boolean;
};

export type Zlider = {
    controller?: Controller;
    options: ComputedRef<Options>;
};
