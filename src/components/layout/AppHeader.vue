<script setup lang="ts">
import { isCollapse } from './isCollapse'
import { ArrowRight, ArrowDown } from '@element-plus/icons-vue'

</script>

<template>
    <el-header>
        <el-icon @click="isCollapse = !isCollapse">
            <Expand v-show="isCollapse" />
            <Fold v-show="!isCollapse" />
        </el-icon>

        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/demand-extraction' }">需求分提取</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/object-diagram' }">对象图</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/flow-diagram' }">流程图</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>

        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="50" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>用户名</el-dropdown-item>
                    <el-dropdown-item divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>
</template>

<style lang="scss" scoped>
.el-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: #fff;
    border-bottom: 1px solid #ebeef5;
}

.el-icon {
    margin-right: 20px;
}

.el-dropdown {
    margin-left: auto;
}
</style>