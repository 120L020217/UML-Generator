<!-- import { defineComponent } from 'vue';
import Modeler from '../modeler';
import Panel from '../panel';
import BpmnActions from '../bpmn-actions';
import '../../styles/index.css';

export default defineComponent({
name: 'App',
setup() {
return () => (
<div class="app-containers">
        <Modeler />
        <Panel />
        <BpmnActions />
      </div>
);
},
}); -->

<template>
    <div class="app-containers">
        <Modeler />
        <Panel />
        <BpmnActions />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Modeler from '../modeler/Modeler';
import Panel from '../panel/Panel';
import BpmnActions from '../bpmn-actions/BpmnActions';
import '../../styles/index.scss';

export default defineComponent({
    name: 'FlowDiagram',
    components: { // 注册组件
        Modeler,
        Panel,
        BpmnActions
    },
    setup() {
        // 如果有需要，你可以在这里添加更多的逻辑
        console.log('FlowDiagram');
    },
});
</script>

<style lang="scss" scoped>
.app-containers {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
    overflow: hidden;
}
</style>