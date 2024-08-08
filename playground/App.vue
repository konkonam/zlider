<script setup lang="ts">
import type { Zlider } from 'zlider/types';
import { reactive } from 'vue';

const zlider = reactive<Zlider>({
    index: 0,
    options: {
        arrows: false
    },
});

const users = [
    { name: 'John', surname: 'Doe' },
    { name: 'David', surname: 'lol' },
    { name: 'a', surname: 'bc' },
];

const index = computed(() => zlider.index)
</script>

<template>
    <div>
        <h1>Zlider playground</h1>

        {{ index }}

        <ul v-zlider="zlider">
            <li v-for="(user, index) in users" :key="index">
                <span>{{ user }}</span>
            </li>
        </ul>

        <nav>
            <button @click="zlider?.prev"><</button>
            <button @click="zlider?.next">></button>
        </nav>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
}

.slide-enter-active, .slide-leave-active {
    transition: transform 0.5s ease;
}

.slide-enter-from, .slide-leave-to {
    transform: translateX(100%);
}

.slide-leave-from, .slide-enter-to {
    transform: translateX(0);
}
</style>
