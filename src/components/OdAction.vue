<template>
    <div class="button-container">
        <el-button type="primary" :icon="Download" @click="$emit('import')">导入uml</el-button>
        <el-button type="primary" @click="$emit('export')">导出图片<el-icon class="el-icon--right">
                <Upload />
            </el-icon></el-button>
        <el-button type="primary" @click="$emit('submit')">提交代码</el-button>
        <el-button type="primary" @click="$emit('history')">历史记录</el-button>
        <el-popover placement="right" :width="400" trigger="click">
            <template #reference>
                <el-button style="margin-right: 16px">保存历史</el-button>
            </template>
            <el-input v-model="text" style="width: 240px" maxlength="10" placeholder="Please input" show-word-limit
                type="text" />
            <el-button type="primary" @click="save" style="margin-left: 20px;">保存</el-button>
        </el-popover>
    </div>
</template>

<script setup>
import { Download, Upload } from '@element-plus/icons-vue'

import { ref, defineEmits } from 'vue';
const text = ref('');

const save = () => {
    const timestamp = Date.now();
    const uniqueText = text.value + timestamp;
    console.log(uniqueText);
    emit('saveHistory', uniqueText);
}
const emit = defineEmits(['saveHistory', 'submit', 'import', 'export', 'history']);
</script>

<style scoped lang="scss">
.button-container {
    display: flex;
    align-items: center;
    height: 40px;
}
</style>