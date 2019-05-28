
import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;
Vue.use(VueFire);

let app = '';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAzOW3nlr8ngtbjHg0Cp_QM4FTIGmXGaEc",
  authDomain: "vue-todolist-ce9f6.firebaseapp.com",
  databaseURL: "https://vue-todolist-ce9f6.firebaseio.com",
  projectId: "vue-todolist-ce9f6",
  storageBucket: "vue-todolist-ce9f6.appspot.com",
  messagingSenderId: "1073223226744",
  appId: "1:1073223226744:web:8a9789f1daf72b6f"
};
let app2 = firebase.initializeApp(firebaseConfig);
export const db = app2.firestore(); 
export const todosCollection = db.collection('todos');
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
