Vue.component('sharing', {
    props: ['sharLink'],
    template: `
    <div :class="'sharing'">
        <div class="url" :id="'url'">{{sharLink ||'请先登录'}}</div>
        <div class="button">
            <span  @click="copyLink" >复制链接</span>        
            <span @click="clouseSharingFrame">关闭窗口</span>
        </div>
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