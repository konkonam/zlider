<script setup lang="ts">
import type { Zlider } from 'zlider'

const zlider = reactive<Zlider>({
})

const users = [
    { name: 'John', surname: 'Doe' },
    { name: 'David', surname: 'lol' },
    { name: 'a', surname: 'bc' },
]

watch(zlider, (value) => console.log(value))
</script>

<template>
    <div>
        <h1>Zlider playground</h1>

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

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
