<template>
<div>
    <form @submit.prevent="submitAnswer">
        <div class="item col">
            <label for="answer">Answer</label>
            <textarea name="answer" id="answer" placeholder="Answer" v-model.trim="answer"></textarea>
        </div>

        <div class="item">
            <label for="good">Is good answer?</label>
            <input type="checkbox" name="good" id="good" v-model="isGood">
        </div>

        <div class="item">
            <button type="submit">Save</button>
        </div>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            isGood: false,
            answer: ''
        }
    },
    inject: ['addAnswer'],
    computed: {
        formIsValid() {
            if (this.answer.length !== 0) return true;
            return false;
        }
    },
    methods: {
        submitAnswer() {
            if (!this.formIsValid) return;

            this.addAnswer(this.answer, this.isGood);

            this.answer = '';
            this.isGood = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    width: 100%;

    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;

    margin: 10px 0;

    &.col {
        flex-direction: column;
    }
}

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
