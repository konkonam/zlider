<script setup lang="ts">
import { Options } from "./types";

const props = defineProps<{
    options: Options;
}>();

const slots = useSlots();

const slides = computed(() => {
    const slot = slots.default?.() ?? [];
    return slot.length > 1 ? slot : slot[0]?.children;
});

const options = computed(() => {
    return defu(props.options, {
        arrows: true,
    });
});

const zlider = ref(null);

const index = ref(0);
const width = ref(0);

const update = () => width.value = zlider.value?.offsetWidth;

const go = (slideIndex) => index.value = slideIndex % slides.value.length;
const jump = (offset) => index.value = (index.value + offset + slides.value.length) % slides.value.length;
const prev = () => jump(-1);
const next = () => jump(1);

onMounted(() => {
    update();

    window.addEventListener('resize', update, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener('resize', update);
})

defineExpose({
    go,
    jump,
    prev,
    next,
});
</script>

<template>
    <section
        ref="zlider"
        class="zlider"
    >
        <div
            class="zlider__positioner"
            :style="{
                'margin-left': `${width * -index}px`,
            }"
        />

        <template
            v-for="(slide, slideIndex) in slides"
            :key="`slide-${slideIndex}`"
        >
            <component
                class="zlider__slide"
                :is="slide"
            />
        </template>

        <slot
            v-if="options.arrows"
            name="arrows"
            :prev="prev"
            :next="next"
        >
            <button
                class="zlider__prev"
                @click="prev"
            >
                Prev
            </button>

            <button
                class="zlider__next"
                @click="next"
            >
                Next
            </button>
        </slot>
    </section>
</template>
