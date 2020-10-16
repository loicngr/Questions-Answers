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
    checkUserRole
} from '../mixins';

import {
    provide,
    inject,
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
    mixins: [checkUserRole],
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

        const userRole = inject('userRole');

        /**
         * Add new answer to answers set
         *
         * @param {string} str the answer text
         * @param {boolean} status True in is the good answer
         */
        const addAnswer = (
            str,
            status = false
        ) => {
            answers.value.add({
                answer: str,
                isGood: status
            });
        }

        /**
         * Update question
         *
         * @param {string} str the question text
         */
        const updateQuestion = (str) => {
            question.value = str;
        }

        // const removeAnswer = (str) => {
        //     answers.value.delete(str);
        // }

        // Get the answers set
        provide('answers', answers);

        // Add new answer to answers set
        provide('addAnswer', addAnswer);

        // Get the question 
        provide('question', readonly(question));

        // Update the question
        provide('updateQuestion', updateQuestion);

        return {
            updateQuestion,
            userRole
        }
    },
};
</script>
