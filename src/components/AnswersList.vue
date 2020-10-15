<template>
<div>
    <ul>
        <li v-for="(obj, i) in answers.value" :key="i">
            {{obj.answer}}
        </li>
    </ul>
</div>
</template>

<script>
export default {
    inject: ['answers']
}
</script>
