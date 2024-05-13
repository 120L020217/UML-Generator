<template>
    <div class="app-containers">
        <iframe :src="reactAppUrl" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reactAppUrl: 'http://localhost:3000'
        };
    }
}
</script>

<style lang="scss" scoped>
.app-containers {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 0px);
    // height: 100%;
    overflow: hidden;
}
</style>