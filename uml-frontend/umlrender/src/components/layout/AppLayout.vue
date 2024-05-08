<script setup lang="ts">
import AppAside from './AppAside.vue'
import AppHeader from './AppHeader.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>
            <AppAside />
            <el-container class="header-and-main">
                <AppHeader />
                <el-main>
                    <el-scrollbar>
                        <router-view />
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.header-and-main {
    flex-direction: column;
    height: 100vh;
}

.el-main {
    padding: 0px;
}
</style>