<template>
<div>
    <form @submit.prevent="$emit('role-selected', $event)">
        <button value="animator">Animator</button>
        <button value="candidate">Candidate</button>
    </form>
</div>
</template>

<script>
export default {
    emits: ['role-selected']
}
</script>

<style lang="scss" scoped>
form {
    width: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: silver;

    button {
        width: 100%;
        height: 40px;

        margin: 0;
        padding: 0;
        outline: none;

        &:hover {
            cursor: pointer;
        }
    }

}
</style>
