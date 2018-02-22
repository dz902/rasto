import Vue from 'vue';
import Vuex from 'vuex';
import ScoreStore from 'Stores/Score';
import ScoreComponent from 'Components/Score.vue';

Vue.use(Vuex);

new Vue(ScoreComponent).$mount('#app');

