<template>
<div>
    <form @submit.prevent="$emit('question-defined', $event.target.children.question.value)">
        <textarea name="question" placeholder="Question"></textarea>
        <button type="submit">Save</button>
    </form>
</div>
</template>

<script>
export default {
    emits: ['question-defined']
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
