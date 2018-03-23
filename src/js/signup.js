Vue.component('sign-up', {
    template: `<div :class="'sign-up'"  v-cloak @submit.prevent="signUp">
    <span @click="clouseSignupFrame" :class="'clouse'">x</span>
    <h2>注册</h2>
    <form action="">
        <div :class="'row'">
            <label for="r-email">用户名</label>
            <input v-model="userName" type="text" :id="'r-email'">
        </div>
        <div class="row">
            <label for="r-email">邮箱</label>
            <input v-model="email" type="text" :id="'r-email'">
        </div>
        <div class="row">
            <label for="r-email">密码</label>
            <input v-model="password" type="text" :id="'r-email'">
        </div>
        <div :class="classObject">
            <button type="submit">提交</button>
        </div>
        <div :class="'row'">
            已有账号,点击
            <a @click="toLogin" href="javascript:;">登录</a>
        </div>
    </form>
</div>`,
    data: function () {
        return {
            userName: '',
            password: '',
            email: '',
            classObject: {
                row: true,
                actions: true,
            }
        }
    },
    methods: {
        clouseSignupFrame() {
            this.$emit('clouse-signup')
        },
        toLogin() {
            this.$emit('show-login')
        },
        signUp() {
            // 新建 AVUser 对象实例
            let user = new AV.User();
            // 设置用户名
            user.setUsername(this.userName);
            // 设置密码
            user.setPassword(this.password);
            // 设置邮箱
            user.setEmail(this.email);
            user.set('userImg', '');
            // user.set('previewImg','')
            user.signUp().then((loginedUser) => {
                alert('注册成功')
                window.location.reload()
            }, (error) => {
                console.log(error)
                if (error.code === 202) {
                    alert('用户名已经存在,请更换用户名')
                } else if (error.code === 203 || 214) {
                    alert('邮箱已被注册,请更换邮箱')
                }
            });
        }
    }
})