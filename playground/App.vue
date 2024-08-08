<script setup lang="ts">
import type { Zlider } from 'zlider/types';

const zlider = ref<Zlider>();

onMounted(() => {
    const controller = zlider.value;
});
</script>

<template>
    <div>
        <h1>Zlider playground</h1>

        <h2>Basic</h2>

        <ul
            ref="zlider"
            v-zlider
        >
            <li class="my-custom-slide">Slide 1</li>
            <li class="my-custom-slide">Slide 2</li>
            <li class="my-custom-slide">Slide 3</li>
            <li class="my-custom-slide">Slide 4</li>
            <li class="my-custom-slide">Slide 5</li>

            <nav v-zlider:arrows>
                <button v-zlider:arrows.prev>
                    prev
                </button>
                <button v-zlider:arrows.next>
                    next
                </button>
            </nav>

            <nav v-zlider:pagination>
                <span>I am pagination</span>
            </nav>
        </ul>

        <h2>Basic (v-for)</h2>

        <ul
            v-zlider="{ arrows: false }"
            @zlider:mounted="(z) => zlider2 = z"
        >
            <li
                v-for="index in [1, 2, 3, 4, 5]"
                class="my-custom-slide"
                :key="`my-custom-slide-${index}`"
            >
                Slide {{ index }}
            </li>
        </ul>
    </div>
</template>

<style>
html, body {
    margin: 0;
}

* {
    box-sizing: border-box;
}
</style>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}

.my-custom-slide {
    height: 300px;
    width: 100%;
    background: #ccc;
}
</style>
