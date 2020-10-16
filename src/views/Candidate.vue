<template>
<div class="candidate">
    <h1>This is an candidate page</h1>
</div>
</template>

<script>
import {
    inject,
} from 'vue';

import {
    checkUserRole
} from '../mixins';

export default {
    name: "Candidate",
    mixins: [checkUserRole],
    setup() {
        const userRole = inject('userRole');

        return {
            userRole
        }
    },
};
</script>
