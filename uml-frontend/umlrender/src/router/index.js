import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../components/layout/AppLayout.vue';
import HomeView from '../components/views/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: AppLayout,
        meta: { title: 'Home' },
        children: [
            { path: '', component: HomeView, meta: { title: 'Home' } },
            { path: '/demand-extraction', component: () => import('../components/views/DemandExtraction.vue'), meta: { title: '需求分提取' } },
            { path: '/object-diagram', component: () => import('../components/views/ObjectDiagram.vue'), meta: { title: '对象图' } },
            { path: '/flow-diagram', component: () => import('../components/views/FlowDiagram.vue'), meta: { title: '流程图' } },
            { path: '/preview', component: () => import('../components/views/PreView.vue'), meta: { title: '预览' } },
            // { path: '/indexview', component: () => import('../components/views/IndexView.vue') },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../components/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;