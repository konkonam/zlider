import { VNode } from 'vue';

export type Zlider = {
    index?: number;
    jump: (by: number) => void;
    go: (to: number) => void;
    prev: () => void;
    next: () => void;
    children: VNode[];
    options: {
        arrows: boolean;
    };
};