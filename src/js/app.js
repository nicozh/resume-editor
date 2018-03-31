var app = new Vue({
    el: '#app',
    data: {
        sharingFrame: false,
        logInBt: false,
        logOutBt: false,
        signUpFrame: false,
        logInFrame: false,
        manager: true,
        resume: {
            name: '姓名',
            gender: '男',
            age: '22',
            email: 'xxxx@outlook.com',
            phone: '15123456789',
            weChat: 'xxxx',
            description: '简介',
            infoPhoto: '',
            blog: 'xxx.com',
            github: 'github.com/xxx',
            title: '前端工程师',
            skils: [
                { name: 'HTML&CSS', description: '熟悉HTML&CSS' },
                { name: 'vue', description: '熟悉vue' },
            ],
            projects: [
                { name: '画板', description: '项目描述', link: 'link', code: 'github', preview: 'url' },
                { name: '佩奇', description: '项目描述', link: 'link', code: 'github', preview: 'url' },
            ],
            projectIndex: NaN
        },
        currentUser: {
            userName: '',
            id: '',
            userImg: '',
        },
        sharLink: {
            link: ''
        }
    },
    methods: {
        getCurrentUser() {
            let currentUser = AV.User.current()
            if (currentUser) {
                let userId = currentUser.id
                this.sharLink.link = location.origin + location.pathname + "?id=" + userId
                this.currentUser.userName = currentUser.attributes.username
                this.currentUser.userImg = currentUser.attributes.userImg
                this.currentUser.id = userId
                this.logOutBt = true
                this.getResume(userId)
                // console.log(currentUser)
            } else {
                this.logInBt = true
                this.currentUser.userName = ''
                // alert("请登录")
            }
        },
        y(key, value) {
            this.resume[key] = value
        },
        getProjectIndex(index) {
            this.resume.projectIndex = index
        },
        onSkil(key, num, value, newValue) {
            this.resume[key][Number(num)][value] = newValue
        },
        addSkil() {
            this.resume.skils.push({ name: '技能', description: '描述' })
        },
        deleteSkil(index) {
            this.resume.skils.splice(index, 1)
        },
        addProject() {
            this.resume.projects.push({ name: '项目名', description: '描述', link: '预览链接', code: '源码地址', preview: '图片' })
        },
        deleteProject(index) {
            this.resume.projects.splice(index, 1)
        },

        saveImages(e) {
            let currentId = e.currentTarget.id
            e.preventDefault();
            let files = e.currentTarget.files
            if (files.length > 0) {
                let localFile = files[0];
                let name = 'avatar.jpg';
                let file = new AV.File(name, localFile);
                file.save().then((file) => {
                    // 文件保存成功
                    let currentUser = AV.User.current();   //获取当前登录用户
                    var user = AV.Object.createWithoutData('User', currentUser.id);
                    console.log('文件保存成功')
                    let fileUrl = file.url()
                    console.log(fileUrl)
                    console.log(currentId)
                    if (currentId === 'head-img') {
                        this.currentUser.userImg = fileUrl
                        user.set('userImg', fileUrl);
                    } else if (currentId === 'preview-img') {
                        console.log(22)
                        this.resume.projects[this.resume.projectIndex].preview = fileUrl
                        user.set('resume', this.resume);
                    } else if (currentId === 'info-photo') {
                        this.resume.infoPhoto = fileUrl
                        user.set('resume', this.resume)
                    }
                    //获取url

                    // 储存url
                    console.log(2)
                    user.save().then((todo) => {
                        console.log(3)
                        alert('保存成功')
                    }, (error) => {
                        alert('保存失败')
                        console.log(error)
                    })

                }, (error) => {
                    // 异常处理
                    console.error(error);
                })
            }
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
                }, (error) => {
                    alert('保存失败')
                })

            }
            else {

                this.logInFrame = true
                // console.log(currentUser)
                //currentUser 为空时，可打开用户注册界面…
            }

        },
        getResume(id) {
            var user = new AV.Query('User');
            user.get(id).then((todo) => {
                this.resume = Object.assign(this.resume, JSON.parse(todo._hashedJSON.resume))
                // 成功获得实例
                // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
            }, function (error) {
                console.log(error)
                // 异常处理
            });
        },
        logIn(loginedUser) {
            this.currentUser.userName = loginedUser.attributes.username
            this.currentUser.id = loginedUser.id
            this.currentUser.userImg = loginedUser.attributes.userImg
            // console.log(this.currentUser.id)
            this.logInFrame = false
            this.logInBt = false
            this.logOutBt = true
            alert('登录成功')
            window.location.reload()
        },
        logOut() {
            AV.User.logOut();
            this.logOutBt = false
            this.logInBt = true
            this.currentUser.userName = ''
            window.location.reload()            
            alert('注销成功')

            // 现在的 currentUser 是 null 了
            // let currentUser = AV.User.current();
        },
        print() {
            window.print()
        }

    }
})

window.onload = function () {
    let searchId = location.search.split('=')[1]
    if (searchId) {
        app.getResume(searchId)
        app.manager = false
        setTimeout(() => {
            let x = document.querySelectorAll('textarea')
            for (let i = 0; i < x.length; i++) {
                $(x[i]).attr('readonly', 'false')
            }
        }, 1000);
       
    } else {
        app.getCurrentUser()
    }

}

