<template>
    <div id="meta2d_object"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, computed, watch } from 'vue';
import {
    Meta2d,
    Pen,
    register,
    s8,
    connectLine,
    Direction,
    registerAnchors,
    registerCanvasDraw,
} from '@meta2d/core';
import { orthogonalRouter } from '../utils/orthogonalRouter'

import { classPens } from '@meta2d/class-diagram';
const meta2dOptions: any = {
    rule: true,
};
let meta2d_object = ref<Meta2d>();

interface DataProp {
    objects: Array<{ id: string; name: string; type: string }>;
    relationships: Array<{ from: string; type: string; to: string; }>;
}

const props = withDefaults(defineProps<{ data: DataProp }>(), {
    data() {
        return { objects: [], relationships: [] };
    },
});

let nodePens = computed(() => {
    const pens = [];
    for (const object of props.data.objects) {
        pens.push({
            id: object.id,
            type: 0,
            name: "simpleClass",
            text: object.name + ':' + object.type,
            textHeight: 200,
            textAlign: 'center',
            textBaseline: 'top',
            textTop: 10,
            list: [
                {
                    text: '-name: string\n+setName(name: string): void\n+getName(): string',
                }
            ],
            x: 100, // 这里你可能需要根据实际情况来设置 x 和 y 的值
            y: 100,
            width: 270,
            height: 200,
        });
    }
    return pens;
});
let linePens = computed(() => {
    const pens: Pen[] = [];
    for (const relationship of props.data.relationships) {
        const fromIndex = nodePens.value.findIndex((pen) => pen.id === relationship.from);
        const toIndex = nodePens.value.findIndex((pen) => pen.id === relationship.to);
        pens.push({
            type: 1,
            name: "line",
            lineName: "polyline",
            anchors: [
                {
                    x: 0,
                    y: 0,
                    id: s8(),
                    connectTo: nodePens.value[fromIndex].id,
                    // anchorId: nodePens.value[fromIndex].anchors[0].id,
                },
                {
                    x: 0,
                    y: 1,
                    id: s8(),
                },
                {
                    x: 1,
                    y: 1,
                    id: s8(),
                    connectTo: nodePens.value[toIndex].id,
                    // anchorId: nodePens.value[toIndex].anchors[0].id,
                },
            ],
            x: nodePens.value[fromIndex].x, // 这里你可能需要根据实际情况来设置 x 和 y 的值
            y: nodePens.value[toIndex].y,
            width: 10,
            height: 10,
            // ex: 200,
            // ey: 200,
            fromArrow: relationship.type,
            autoPolyline: true,
            autoFrom: true,
            autoTo: true,
        });
    }
    return pens;
});

watch(
    () => props.data,
    (newData, oldData) => {
        if (newData && newData.objects && newData.relationships && meta2d_object.value) {
            if (meta2d_object.value) {
                meta2d_object.value.clear();
            }
            meta2d_object.value.addPens(nodePens.value);
            // const nodePens = [];
            // const linePens: Pen[] = [];

            // // 将 objects 转换为图元
            // for (const object of newData.objects) {
            //     nodePens.push({
            //         type: 0,
            //         name: "simpleClass",
            //         text: object.name + ':' + object.type,
            //         textHeight: 200,
            //         textAlign: 'center',
            //         textBaseline: 'top',
            //         textTop: 10,
            //         list: [
            //             {
            //                 text: '-name: string\n+setName(name: string): void\n+getName(): string',
            //             }
            //         ],
            //         x: 100, // 这里你可能需要根据实际情况来设置 x 和 y 的值
            //         y: 100,
            //         width: 270,
            //         height: 200,
            //     });
            // }
            // meta2d_object.value.addPens(nodePens);
            // console.log(nodePens[0].id);
            // console.log(nodePens[0].anchors[0].id);

            // // 将 relationships 转换为图元
            // for (const relationship of newData.relationships) {
            //     linePens.push({
            //         type: 1,
            //         name: "line",
            //         // name: relationship.from,
            //         text: relationship.type,
            //         lineName: "polyline",
            //         anchors: [
            //             { x: 0.1, y: 0.1 },
            //             { x: 0.1, y: 0.5 },
            //             { x: 1, y: 1 },
            //         ],
            //         x: 300, // 这里你可能需要根据实际情况来设置 x 和 y 的值
            //         y: 100,
            //         width: 100,
            //         height: 100,
            //         // fromArrow: 
            //     });
            // }

            // 添加图元
            meta2d_object.value.addPens(linePens.value);
            for (const relationship of newData.relationships) {
                const fromIndex = nodePens.value.findIndex((pen) => pen.id === relationship.from);
                const toIndex = nodePens.value.findIndex((pen) => pen.id === relationship.to);
                const lineIndex = linePens.value.findIndex((pen) => pen.anchors[0].connectTo === relationship.from && pen.anchors[2].connectTo === relationship.to);
                connectLine(nodePens.value[fromIndex], nodePens.value[fromIndex].anchors[0], linePens.value[lineIndex], linePens.value[lineIndex].anchors[0]);
                connectLine(nodePens.value[toIndex], nodePens.value[toIndex].anchors[0], linePens.value[lineIndex], linePens.value[lineIndex].anchors[2]);



                // meta2d_object.value.updateLineType(linePens.value[lineIndex], "orthogonalRouter");
            }
            // line.calculative.active = false;
            // TODO:更新连线（可以写在论文中）
            for (const object of newData.objects) {
                const objectIndex = nodePens.value.findIndex((pen) => pen.id === object.id);
                meta2d_object.value.canvas.updateLines(nodePens.value[objectIndex]);
            }
            meta2d_object.value.render();
        }
    },
    { deep: true } // 深度观察 props.data 的变化
);

onMounted(() => {
    // 创建实例
    meta2d_object.value = new Meta2d('meta2d_object', meta2dOptions);

    meta2d_object.value.addDrawLineFn('orthogonalRouter', orthogonalRouter);

    // 按需注册图形库
    // 以下为自带基础图形库
    register(classPens());

    // 根据 props.data 的值添加图元
    if (props.data && props.data.objects && props.data.relationships) {
        const pens = [];

        // 将 objects 转换为图元
        for (const object of props.data.objects) {
            pens.push({
                name: "rectangle",
                // name: object.name,
                text: object.type,
                x: 100, // 这里你可能需要根据实际情况来设置 x 和 y 的值
                y: 100,
                width: 100,
                height: 100,
                lineWidth: 1,
                // globalAlpha: 1, // 透明度
            });
        }

        // 将 relationships 转换为图元
        for (const relationship of props.data.relationships) {
            pens.push({
                type: 1,
                name: "line",
                // name: relationship.from,
                // lineName: relationship.type,
                lineName: "polyline",
                // anchors: [
                //     { x: 0.1, y: 0.1 },
                //     { x: 0.1, y: 0.5 },
                //     { x: 1, y: 1 },
                // ],
                x: 300, // 这里你可能需要根据实际情况来设置 x 和 y 的值
                y: 100,
                width: 100,
                height: 100,
                // globalAlpha: 1, // 透明度
            });
        }

        // 添加图元
        meta2d_object.value.addPens(pens);
        meta2d_object.value.render();
    }
});
onUnmounted(() => {
    meta2d_object.value.destroy();
});
</script>

<style scoped>
#meta2d {
    height: calc(100vh - 80px);
    z-index: 1;
}
</style>