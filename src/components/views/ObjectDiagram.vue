<template>
    <div class="app-page">
        <div class="header">
            <OdAction @submit="submitCode" @import="importFile" @export="downloadPng" @saveHistory="setHistory" />
        </div>
        <div class="designer">
            <CodeInput v-model="umlCode" />
            <DiagramOutput :data="diagramData" :text="picId" ref="diagramOutput" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CodeInput from '../CodeInput.vue';
import DiagramOutput from '../DiagramOutput.vue';
import OdAction from '../OdAction.vue';
import { parseUml } from '../../api/objects';  // 导入你之前封装的请求函数
import { ElMessage } from 'element-plus';

const umlCode = ref('');
const diagramData = ref(null);
const diagramOutput = ref(null);
const picId = ref('');

// Method to handle submitting code to backend
const submitCode = async () => {
    try {
        const response = await parseUml({ uml: umlCode.value });
        // console.log(response)
        if (response.status === 200) {
            diagramData.value = response.data;
        } else {
            ElMessage.error("代码语法有误");
        }
    } catch (error) {
        console.error(error);
        ElMessage.error("请求失败");
    }
};

const importFile = async () => {
    const file = await selectFile();  // 假设这是一个打开文件选择对话框并返回用户选择的文件的函数
    const content = await readFile(file);  // 假设这是一个读取文件内容的函数
    umlCode.value = content;
};
const selectFile = () => {
    return new Promise<File>((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';
        input.onchange = event => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                resolve(file);
            } else {
                reject(new Error('No file selected'));
            }
        };
        input.click();
    });
};
const readFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve((event.target as FileReader).result as string);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
};
const downloadPng = () => {
    // console.log('Download PNG'); 
    diagramOutput.value.downloadPng();
};

const setHistory = (text: string) => {
    // Call your API to save history data
    console.log('Set history data:', text);
    picId.value = text;
};

const getHistory = () => {
    // Call your API to get history data
    console.log('Get history data');
};
</script>

<style scoped>
.app-page {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
    overflow: hidden;
}

.header {
    width: 100%;
    height: 40px;
}

.designer {
    display: grid;
    grid-template-columns: 300px 1fr;
    height: calc(100vh - 140px);
    overflow: auto;
}

.CodeInput {
    height: calc(100vh - 140px);
}

.DiagramOutput {
    height: calc(100vh - 140px);
}
</style>