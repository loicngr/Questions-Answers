<template>
<router-view />
</template>

<script>
import {
    provide,
    readonly,
    ref
} from 'vue';

export default {
    name: "App",
    setup() {
        const ROLES = ["ANIMATOR", "CANDIDATE"];

        const userRole = ref(null);

        const updateUserRole = (role) => {
            role = ROLES.indexOf(role);

            if (role === -1) {
                return new Promise((res, rej) => {
                    rej(false);
                });
            } else {
                userRole.value = role;
                return new Promise((res) => {
                    res(true);
                });
            }
        }

        provide('userRole', readonly(userRole));
        provide('updateUserRole', updateUserRole);
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    display: grid;
    place-content: center;
}
</style>
