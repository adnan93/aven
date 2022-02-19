import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import Vuetify from 'vuetify/lib'


Vue.use(Vuetify);

import fa from 'vuetify/lib/locale/fa'

Vue.component('my-component', {
    methods: {
      changeLocale () {
        this.$vuetify.lang.current = 'fa'
      },
    },
  })



export default new Vuetify({
    lang: {
        locales: { fa },
        current: 'fa',
      },
});
