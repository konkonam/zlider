<script setup lang="ts">
const zlider = ref(null);

onMounted(() => {
    // zlider.value?.go(2);
    // zlider.value?.jump(-2);
    // zlider.value?.prev();
    // zlider.value?.next();
})
</script>

<template>
    <div>
        <h1>Zlider playground</h1>

        <h2>Basic</h2>

        <Zlider ref="zlider">
            <div class="my-custom-slide">Slide 1</div>
            <div class="my-custom-slide">Slide 2</div>
            <div class="my-custom-slide">Slide 3</div>
            <div class="my-custom-slide">Slide 4</div>
            <div class="my-custom-slide">Slide 5</div>
        </Zlider>
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
.my-custom-slide {
    height: 300px;
    width: 100%;
    background: #ccc;
}
</style>
