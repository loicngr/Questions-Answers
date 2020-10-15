<template>
<div>
    <DefineAnswer />
    <AnswersList />

    <button @click.prevent="send">Send to candidate</button>
</div>
</template>

<script>
import DefineAnswer from './DefineAnswer';
import AnswersList from './AnswersList';

export default {
    components: {
        DefineAnswer,
        AnswersList
    },
    inject: ["question", "answers"],
    computed: {
        getQuestion() {
            return this.question.value;
        },
        getAnswers() {
            return this.answers.value;
        }
    },
    methods: {
        send() {
            console.log('send to candidate', this.getQuestion, this.getAnswers);
        }
    }
}
</script>
