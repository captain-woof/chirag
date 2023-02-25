<script setup lang="ts">
import Intercepts from './intercepts.vue';
import StatusBar from './statusBar.vue';
</script>

<template>
    <div class="home">
        <header>
            <StatusBar />
        </header>

        <body>
            <Intercepts />
        </body>
    </div>
</template>

<style scoped lang="scss">
.home {
    width: 340px;
}
</style>