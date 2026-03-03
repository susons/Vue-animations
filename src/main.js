import { createApp } from "vue";

import App from "./App.vue";
import BaseModal from "./components/BaseModal.vue";
import { createRouter, createWebHistory } from "vue-router";
import AllUsers from "./pages/AllUsers.vue";
import CourseGoals from "./pages/CourseGoals.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: AllUsers },
    { path: "/goals", component: CourseGoals },
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    if (savedPosition) return savedPosition;

    return {
      left: 0,
      top: 0,
    };
  },
});

const app = createApp(App);
app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});

app.component("base-modal", BaseModal);
