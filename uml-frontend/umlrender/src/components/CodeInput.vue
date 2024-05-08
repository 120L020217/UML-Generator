<template>
    <div class="code-input-container">
        <el-input type="textarea" v-model="code" :rows="10" placeholder="请输入代码..." class="code-input"></el-input>
        <el-button type="primary" @click="submitCode" class="submit-button">提交代码</el-button>
    </div>
</template>

<!-- vue2版本 -->
<script>
export default {
    name: "CodeInput",
    data() {
        return {
            code: '', // 用户输入的代码
        };
    },
    props: {
        modelValue: String,
    },
    watch: {
        modelValue(value) {
            this.code = value;
        },
        code(value) {
            this.$emit('update:modelValue', value);
        },
    },
};
</script>

<style scoped>
.code-input-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.code-input {
    flex-grow: 1;
}

.submit-button {
    margin: auto;
}
</style>