<script setup lang="ts">
import { isCollapse } from './isCollapse'

// console.log("test")
</script>

<template>
    <el-aside>
        <el-scrollbar>
            <el-menu router unique-opened :collapse="isCollapse">
                <a href="/" class="logo">
                    <img src="../../assets/logo.svg" alt="" />
                    <h1 v-if="!isCollapse"> 毕业设计 </h1>
                </a>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <View />
                        </el-icon>
                        <span v-if="!isCollapse"> 可视化建模 </span>
                    </template>
                    <el-menu-item index="/demand-extraction">
                        <el-icon>
                            <Files />
                        </el-icon>
                        <span> 需求分提取 </span>
                    </el-menu-item>
                    <el-menu-item index="/object-diagram">
                        <el-icon>
                            <Connection />
                        </el-icon>
                        <span> 对象图 </span>
                    </el-menu-item>
                    <el-menu-item index="/flow-diagram">
                        <el-icon>
                            <DArrowRight />
                        </el-icon>
                        <span> 流程图 </span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
    background-color: #eee;
    height: calc(100vh - 40px);
    width: auto;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    text-decoration: none;
    color: black;

    img {
        width: 32px;
        height: 32px;
    }

    h1 {
        font-size: medium;
        font-weight: normal;
    }
}

.el-menu {
    background-color: #eee;
    border-right: none;
    width: 200px;

    &.el-menu--collapse {
        width: 60px;

        & h1 {
            display: none;
        }
    }
}
</style>