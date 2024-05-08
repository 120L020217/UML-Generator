<template>
    <div class="button-container">
        <el-button type="primary" :icon="Download">导入uml</el-button>
        <el-button type="primary">导出图片<el-icon class="el-icon--right">
                <Upload />
            </el-icon></el-button>
        <el-button type="primary" @click="$emit('submit')">提交代码</el-button>
    </div>
</template>

<script setup>
import { Download, Upload } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.button-container {
    display: flex;
    align-items: center;    height: 40px;
}
</style>