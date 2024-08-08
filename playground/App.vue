<script setup lang="ts">
import type { Zlider } from 'zlider/types';

const zlider = ref<Zlider>();
const zlider2 = ref<Zlider>();


const zlider3 = ref<Zlider>();
</script>

<template>
    <div>
        <h1>Zlider playground</h1>

        <h2>Basic</h2>

        <ul ref="zlider3"
            v-zlider="{
                arrows: false
            }"
        >
            <li class="my-custom-slide">Slide 1</li>
            <li class="my-custom-slide">Slide 2</li>
            <li class="my-custom-slide">Slide 3</li>
            <li class="my-custom-slide">Slide 4</li>
            <li class="my-custom-slide">Slide 5</li>

            <template #controls>
                <nav>
                    <button @click="zlider3?.prev">
                        prev
                    </button>
                    <button @click="zlider3?.next">
                        next
                    </button>
                </nav>
            </template>
        </ul>

        <nav>
            <button @click="zlider3?.controller?.prev">
                prev
            </button>
            <button @click="zlider3?.controller?.next">
                next
            </button>
        </nav>

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

        <nav>
            <button @click="zlider2?.controller?.prev">
                prev
            </button>
            <button @click="zlider2?.controller?.next">
                next
            </button>
        </nav>
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
