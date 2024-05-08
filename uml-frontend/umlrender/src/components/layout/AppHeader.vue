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
        </el-breadcrumb>

        <el-dropdown>
            <span class="el-dropdown-link">
                Dropdown List
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>
</template>

<style lang="scss" scoped>
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #fff;
    border-bottom: 1px solid #ebeef5;
}
</style>