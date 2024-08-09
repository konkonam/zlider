<script setup lang="ts">
import type { Zlider } from 'zlider';

const zlider = reactive<Zlider>({
    options: {
        arrows: true,
        transition: {
            enterFromClass: 'slide-enter-from',
            enterActiveClass: 'slide-enter-active',
            enterToClass: 'slide-enter-to',
            leaveFromClass: 'slide-leave-from',
            leaveActiveClass: 'slide-leave-active',
            leaveToClass: 'slide-leave-to',
        }
    }
});

const index = computed(() => zlider.index)

const users = [
    { name: 'John', surname: 'Doe' },
    { name: 'David', surname: 'lol' },
    { name: 'a', surname: 'bc' },
];
</script>

<template>
    <div>
        <h1>Zlider playground</h1>

        {{ index }}

        <ul v-zlider="zlider" v-on:zswipe="(data) => console.log(data)">
            <li v-for="(user, index) in users" :key="index">
                <span>{{ user.name }} {{ user.surname }}</span>
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
