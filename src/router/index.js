import Vue from "vue";
import VueRouter from "vue-router";
import ViewUI from "view-design";
Vue.use(ViewUI);
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },

    {
        path: "/movie/:id",
        name: "Movie",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "movie" */ "../views/Movie.vue"),
    },
    {
        path: "/movies",
        name: "Movies",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "movies" */ "../views/Movies.vue"),
    },
    {
        path: "/search/:keyword/:page",
        name: "Search",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "search" */ "../views/Search.vue"),
    },
    {
        path: "/actor/:id",
        name: "Actor",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "actor" */ "../views/Actor.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    next();
});
router.afterEach(() => {
    ViewUI.LoadingBar.finish();
});
export default router;