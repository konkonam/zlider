<script setup lang="ts">
const slots = useSlots();

const slides = computed(() => {
    const defaultSlot = slots.default ? slots.default() : [];

    if (defaultSlot.length > 1) {
        return defaultSlot;
    }

    return defaultSlot?.[0]?.children;
});

const index = ref(0);

const go = (offset) => index.value = (index.value + offset + slides.value.length) % slides.value.length;
</script>

<template>
    <section class="zlider">
        <template
            v-for="(slide, slideIndex) in slides"
            :key="`slide-${slideIndex}`"
        >
            <component
                v-show="slideIndex === index"
                :is="slide"
            />
        </template>

        <button @click="go(-1)">
            Prev
        </button>

        <button @click="go(1)">
            Next
        </button>
    </section>
</template>
