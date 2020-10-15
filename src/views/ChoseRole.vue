<template>
<div>
    <Role @role-selected="roleSelected" />
</div>
</template>

<script>
import Role from '../components/Role';

export default {
    name: "ChoseRole",
    components: {
        Role
    },
    methods: {
        roleSelected(e) {
            let role;

            try {
                role = e.submitter.attributes.item(0).value.toUpperCase();
            } catch (err) {
                throw new Error(err);
            }

            this.$store.dispatch('setUserRole', role).then((status) => {
                if (!status) throw new Error('Role not found');

                switch (role) {
                    case 'ANIMATOR':
                        this.$router.push({
                            name: 'Animator'
                        });
                        break;
                    default:
                        this.$router.push({
                            name: 'Candidate'
                        });
                        break;
                }
            });
        }
    }
};
</script>
