import { ComputedRef, Reactive } from 'vue';

export type State = {
    index: number;
    length: number;
};

export type Controller = {
    jump: (offset: number) => void;
    go: (index: number) => void;
    prev: () => void;
    next: () => void;
};

export type Options = {
    controller: Controller;
    arrows: boolean;
};

export type Zlider = {
    controller: Controller;
    state: Reactive<State>;
    options: ComputedRef<Options>;
};
