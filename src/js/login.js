Vue.component('login', {
    template: `<div :class="'sign-wrapper'">
    <div v-bind:class="'log-in'"  v-cloak @submit.prevent="logIn">
    <span @click="clouseLoginFrame" v-bind:class="'clouse'">x</span>
    <h2>登录</h2>
    <form action="">
        <div v-bind:class="'row'">
            <label for="r-email">用户名</label>
            <input type="text" id="r-user" v-model="logInData.userName">
        </div>
        <div v-bind:class="'row'">
            <label for="r-email">密码</label>
            <input type="text" id="r-password" v-model="logInData.password">
        </div>
        <div v-bind:class="classObject">
            <button type="submit">登录</button>
        </div>
        <div v-bind:class="'row'">
            没有账号?点击
            <a @click="toSignUp" href="javascript:;">注册</a>
        </div>
    </form>
</div>
</div>
`,
    data: function () {
        return {
            logInData: {
                userName: '',
                password: '',
            },
            classObject: {
                row:true,
                actions:true,
            }
        }
    },
    methods: {
        logIn() {
            AV.User.logIn(this.logInData.userName, this.logInData.password).then((loginedUser) => {
                this.$emit('login', loginedUser)
            }, (error) => {
                if (error.code === 210) {
                    alert('用户名和密码不匹配')
                } else if (error.code === 211) {
                    alert('用户名不存在')
                }
            });
        },
        clouseLoginFrame() {
            this.$emit('clouse-login')
        },
        toSignUp() {
            this.$emit('show-signup')
        }
    }
})