import { createRouter, createWebHistory } from 'vue-router';
import TareasView from '../views/TareasView.vue';
import InfoView from '../views/InfoView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'tareas', component: TareasView },
    { path: '/info', name: 'info', component: InfoView }
  ]
});

export default router;