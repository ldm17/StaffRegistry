import { createApp, h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./components/EmployeeList.vue') },
    { path: '/employee/:id', component: () => import('./components/EmployeeCard.vue'), props: true },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => h('div', { style: 'text-align: center; padding: 50px;' }, [
        h('h1', 'Ошибка 404'),
        h('p', 'Страница не найдена')
      ])
    },
  ]
})

app.use(router)
app.use(pinia)
app.mount('#app');