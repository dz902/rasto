<template lang="pug">
text.glyphChar
    slot
</template>

<script>
export default {
    name: 'gglyph' // glyph is deprecated SVG entity name
};
</script>

<style lang="sass" scoped>
text.glyphChar
    font: 4em Bravura, fantasy
    color: black
</style>