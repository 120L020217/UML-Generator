<template>
    <div class="app-page">
        <div class="header">
            <OdAction @submit="submitCode" />
        </div>
        <div class="designer">
            <CodeInput v-model="umlCode" />
            <DiagramOutput :data="diagramData" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CodeInput from '../CodeInput.vue';
import DiagramOutput from '../DiagramOutput.vue';
import OdAction from '../OdAction.vue';
import { parseUml } from '../../api/objects';  // 导入你之前封装的请求函数

const umlCode = ref('');
const diagramData = ref(null);

// Method to handle submitting code to backend
const submitCode = async () => {
    const response = await parseUml({ uml: umlCode.value });
    console.log(response)
    if (response.status === 200) {
        diagramData.value = response.data;
    } else {
        // Handle error
    }
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