const pug = `
<template lang='pug'>
#pageName
    p.txt 这里是About页面
</template>
<script>
export default {
    name: 'pageName',

    data() {
        return {}
    },
    methods() {},
}
</script>
<style lang='stylus' src='./index.styl'></style>
`

const styl = `#pageName`

module.exports = {
    pug, styl
}