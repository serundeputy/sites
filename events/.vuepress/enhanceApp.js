import axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueLazyload from 'vue-lazyload';

/*
 * Use this file to augment vuepress with other vue-y things
 */
export default ({ Vue, options, router, siteData }) => { // eslint-disable-line
  // Add in lazyload
  Vue.use(VueLazyload, {
    lazyComponent: true,
  });

  if (typeof process === 'undefined') {
    Vue.use({
      install(Vue) {
        Object.defineProperties(Vue.prototype, {
          $events: {
            get() {
              return require('./public/api/events.json');
            },
          },
          $gmaps: {
            get() {
              return axios.create({baseURL: 'https://maps.googleapis.com/maps/api'});
            },
          },
        });
      },
    });
  }
  Vue.use(VueGoogleMaps, {
    load: {
      key: process.env.LANDO_GOOGLE_API_KEY,
      libraries: 'places,geocoder',
    },
  });
};
