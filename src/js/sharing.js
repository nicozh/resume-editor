Vue.component('sharing', {
    props: ['sharLink'],
    template: `
    <div :class="'sharing'">
        <div :id="'url'">{{sharLink}}</div>
        <input type="button" @click="copyLink" value="点击复制代码" />
        <button @click="clouseSharingFrame">关闭窗口</button>
    </div>`,
    data: function () {
        return {}
    },
    methods: {
        clouseSharingFrame() {
            this.$emit('clouse-sharing')
        },
        copyLink() {
            const range = document.createRange();
            range.selectNode(document.getElementById('url'));
            const selection = window.getSelection();
            if (selection.rangeCount > 0) selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            alert("复制成功，发送链接分享");
        },

    }
})