var app = new Vue({
    el: '#app',
    data: {
        logInBt: false,
        logOutBt: false,
        logInFrame: false,
        signUpFrame: false,
        resume: {
            name: 'xxx',
            gender: '男',
            age: '22',
            email: 'xxxx@outlook.com',
            phone: '15123456789',
            weChat: 'xxxx',
            skils: [
                { name: 'HTML&CSS', description: '熟悉HTML&CSS' },
                { name: 'vue', description: '熟悉vue' },
            ],
            projects: [
                { name: '画板', description: '在线画板', link: 'link', code: 'github' },
            ],
        },
        userData: {
            userName: '',
            password: '',
            email: '',
        },
        logInData: {
            userName: '',
            password: '',
        },
        currentUser: {
            userName: '',
            id: ''
        }
    },
    methods: {
        getCurrentUser() {
            let currentUser = AV.User.current()
            if (currentUser) {
                this.currentUser.userName = currentUser.attributes.username
                this.currentUser.id = currentUser.id
                this.logOutBt = true
                this.getResume()
                // console.log(currentUser)
            } else {
                this.logInBt = true
                this.currentUser.userName = '请登录'
                // alert("请登录")
            }
        },
        y(key, value) {
            this.resume[key] = value
        },
        onSkil(key, num, value, newValue) {
            this.resume[key][Number(num)][value] = newValue
        },
        addSkil() {
            this.resume.skils.push({ name: '', description: '' })
        },
        deleteSkil(index) {
            console.log(index)
            this.resume.skils.splice(index, 1)
        },
        addProject() {
            this.resume.projects.push({ name: '', description: '', link: '', code: '' })
        },
        deleteProject(index) {
            this.resume.projects.splice(index,1)
        },
        saveResume() {
            let currentUser = AV.User.current();   //判断当前用户是否登录
            // console.log(currentUser)
            if (currentUser) {

                var user = AV.Object.createWithoutData('User', currentUser.id);
                // 修改属性
                user.set('resume', this.resume);
                // 保存到云端
                user.save().then((todo) => {
                    alert('保存成功')
                    // console.log(todo)
                }, (error) => {
                    alert('保存失败')
                    console.log(error)
                })

            }
            else {

                this.logInFrame = true
                console.log(currentUser)
                //currentUser 为空时，可打开用户注册界面…
            }

        },
        getResume() {
            var user = new AV.Query('User');
            user.get(this.currentUser.id).then((todo) => {
                this.resume = Object.assign(this.resume, JSON.parse(todo._hashedJSON.resume))
                // 成功获得实例
                // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
            }, function (error) {
                console.log(error)
                // 异常处理
            });
        },
        signUp() {
            // 新建 AVUser 对象实例
            let user = new AV.User();
            // 设置用户名
            user.setUsername(this.userData.userName);
            // 设置密码
            user.setPassword(this.userData.password);
            // 设置邮箱
            user.setEmail(this.userData.email);
            user.signUp().then((loginedUser) => {
                console.log(loginedUser);
            }, (error) => {
                if (error.code === 202) {
                    alert('用户名已经存在,请更换用户名')
                } else if (error.code === 203 || 214) {
                    alert('邮箱已被注册,请更换邮箱')
                }
            });
        },
        logIn() {
            AV.User.logIn(this.logInData.userName, this.logInData.password).then((loginedUser) => {
                // 
                this.currentUser.userName = loginedUser.attributes.username
                this.currentUser.id = loginedUser.id
                console.log(this.currentUser.id)
                this.logInFrame = false
                this.logInBt = false
                this.logOutBt = true
                alert('登录成功')
            }, (error) => {
                if (error.code === 210) {
                    alert('用户名和密码不匹配')
                } else if (error.code === 211) {
                    alert('用户名不存在')
                }
            });
        },
        logOut() {
            AV.User.logOut();
            this.logOutBt = false
            this.logInBt = true
            this.currentUser.userName = ''
            alert('注销成功')

            // 现在的 currentUser 是 null 了
            // let currentUser = AV.User.current();
        }

    }
})

window.onload = app.getCurrentUser()

