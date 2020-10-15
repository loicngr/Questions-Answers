<template>
<div class="animator">
    <DefineQuestion v-if="step === 0" @question-defined="updateQuestion($event); step++" />
    <DefineAnswers v-else-if="step === 1" />
</div>
</template>

<script>
import DefineQuestion from '../components/DefineQuestion';
import DefineAnswers from '../components/DefineAnswers';

import {
    provide,
    readonly,
    ref
} from 'vue';

/*

TODO 1. Définir une question - OK
TODO 2. Définir les réponses de la question - OK
TODO 3. Envoi la question au candidat
TODO 4. Envoi la bonne réponse au candidat
TODO 5. Ecran de chargement

*/
export default {
    name: "Animator",
    components: {
        DefineQuestion,
        DefineAnswers
    },
    data() {
        return {
            step: 0,
            question: '',
            loadingScreen: false,
        }
    },
    setup() {
        const answers = ref(new Set());
        const question = ref('question');

        const addAnswer = (
            str,
            status = false
        ) => {
            answers.value.add({
                answer: str,
                isGood: status
            });
        }

        const updateQuestion = (str) => {
            question.value = str;
        }

        // const removeAnswer = (str) => {
        //     answers.value.delete(str);
        // }

        provide('answers', answers);
        provide('addAnswer', addAnswer);
        provide('question', readonly(question));
        provide('updateQuestion', updateQuestion);

        return {
            updateQuestion
        }
    },
};
</script>
