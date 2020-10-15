import { createRouter, createWebHistory } from "vue-router";
import ChoseRole from "../views/ChoseRole.vue";

const routes = [
	{
		path: "/",
		name: "ChoseRole",
		component: ChoseRole
	},
	{
		path: "/candidate",
		name: "Candidate",
		component: () =>
			import("../views/Candidate.vue")
	},
	{
		path: "/animator",
		name: "Animator",
		component: () =>
			import("../views/Animator.vue")
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
