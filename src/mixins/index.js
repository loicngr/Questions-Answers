const checkUserRole = {
    created() {
		// Check if user role is defined
        if (this.userRole === null) {
            // not defined, redirect to app root path
            this.$router.push({
                path: '/'
            });
        }
    },
}

export {checkUserRole};
