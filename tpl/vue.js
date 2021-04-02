const pug = (folderName) => `
<template lang='pug'>
#${folderName}
    p.txt 这里是${folderName}页面
</template>
<script>
export default {
    name: '${folderName}',

    data() {
        return {}
    },
    methods() {},
}
</script>
<style lang='stylus' src='./index.styl'></style>
`

const styl = (folderName) => `#${folderName}
    box-sizing border-box`

module.exports = {
    pug, styl
}