const ROLES = ["ANIMATOR", "CANDIDATE"];

const User = {
	state: {
		role: null
	},
	mutations: {
		setRole(state, role) {
			state.role = role;
		},
	},
	actions: {
		setUserRole({ commit }, role) {
			role = ROLES.indexOf(role);
			if (role === -1) {
				return new Promise((res, rej) => {
					rej(false);
				});
			} else {
				commit("setRole", role);
				return new Promise((res) => {
					res(true);
				});
			}
		},
	},
	getters: {
		roles: () => {
			return ROLES;
		},
		role: state => {
			return (state.role === null)? false:ROLES[state.role];
		}
	}
};

export { User };
