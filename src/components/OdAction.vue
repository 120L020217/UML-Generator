<template>
    <div class="button-container">
        <el-button type="primary" :icon="Download" @click="$emit('import')">导入uml</el-button>
        <el-button type="primary" @click="$emit('export')">导出图片<el-icon class="el-icon--right">
                <Upload />
            </el-icon></el-button>
        <el-button type="primary" @click="$emit('submit')">提交代码</el-button>
        <el-popover placement="bottom" :width="800" :height="500" trigger="click" @show="getAllPics">
            <template #reference>
                <el-button style="margin-right: 16px">历史记录</el-button>
            </template>
            <el-carousel :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="item in historyItems">

                    <div class="inner-container" style="display: flex; margin-top: 10px; align-items: center;">
                        <div class="text">{{ item.text }}</div>
                        <el-button type="primary" round @click="load(item.jsonData)">加载</el-button>
                    </div>

                    <el-divider />
                    <img :src="item.jsonData_pic" style="width: 200px; height: 200px; margin-top: 0;" />
                </el-carousel-item>
            </el-carousel></el-popover>
        <el-popover placement="right" :width="400" trigger="click">
            <template #reference>
                <el-button style="margin-right: 16px">保存历史</el-button>
            </template>
            <el-input v-model="text" style="width: 240px" maxlength="10" placeholder="Please input diagram name"
                show-word-limit type="text" />
            <el-button type="primary" @click="save" style="margin-left: 20px;">保存</el-button>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import { Download, Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { getAllHistory, History } from '../api/objects';
import { ref, defineEmits } from 'vue';
const text = ref('');
const historyItems = ref<History[]>([]);
// const historyPics = ref<string[]>([]);

const save = () => {
    const timestamp = Date.now();
    const uniqueText = text.value + timestamp;
    console.log(uniqueText);
    emit('saveHistory', uniqueText);
}

const getAllPics = async () => {
    try {
        const response = await getAllHistory();
        console.log(response)
        if (response.status >= 200 && response.status < 300) {
            ElMessage.success("获取历史记录成功");
            historyItems.value = response.data;
        } else {
            ElMessage.error("获取历史记录失败");
        }
    } catch (error) {
        console.error(error);
        ElMessage.error("请求失败");
    }
}

const load = (text) => {
    console.log('load');
    emit('loadHistory', text);
}
const emit = defineEmits(['saveHistory', 'submit', 'import', 'export', 'loadHistory']);
</script>

<style scoped lang="scss">
.button-container {
    display: flex;
    align-items: center;
    height: 40px;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .el-divider {
        margin: 5px;
        border-top-color: white !important;
    }
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .el-divider {
        margin: 5px;
        border-top-color: rgb(77, 73, 73) !important;
    }
}

.text {
    margin-left: 20px;
    margin-right: 10px;
}
</style>