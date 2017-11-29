// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { initialize } from  './firebaseInstance';
import VuexFire from 'vuefire';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'
import firebase from 'firebase'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import { init } from './auth';

locale.use(lang);


Vue.use(VuexFire);
Vue.use(ElementUI);


init();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
