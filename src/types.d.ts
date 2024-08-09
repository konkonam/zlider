export type Zlider = {
    index?: number;
    jump: (by: number) => void;
    go: (to: number) => void;
    prev: () => void;
    next: () => void;
    options: {
        arrows: boolean;
    };
};
