import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import { init } from '@/init/init.js';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'nprogress/nprogress.css';
import perm from "@/perm/perm.js";
import i18n from "@/i18n/index.js";
import { useUiStore } from '@/store/ui.js';

const pinia = createPinia().use(piniaPersistedState)

const app = createApp(App).use(pinia)

await init()

app.use(router).use(i18n).directive('perm',perm)

const uiStore = useUiStore()

if (uiStore.dark) {
  document.documentElement.classList.add('dark')

  const metaTag = document.getElementById('theme-color-meta')
  if (metaTag) {
    const isDesktop = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    metaTag.setAttribute('content', isDesktop ? '#141414' : '#000000')
  }
}

app.config.devtools = true;

app.mount('#app');
