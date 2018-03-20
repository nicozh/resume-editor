var app = new Vue({
    el: '#app',
    data: {
        sharingFrame: false,
        logInBt: false,
        logOutBt: false,
        logInFrame: false,
        signUpFrame: false,
        resume: {
            name: '姓名',
            gender: '男',
            age: '22',
            email: 'xxxx@outlook.com',
            phone: '15123456789',
            weChat: 'xxxx',
            description: '简介',
            blog: '',
            github: '',
            title: '前端工程师',
            skils: [
                { name: 'HTML&CSS', description: '熟悉HTML&CSS' },
                { name: 'vue', description: '熟悉vue' },
            ],
            projects: [
                { name: '画板', description: '在线画板', link: 'link', code: 'github', preview: 'url' },
                { name: '佩奇', description: 'CSS3佩奇', link: 'link', code: 'github', preview: 'url' },
            ],
            projectIndex: NaN
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
            id: '',
            userImg: '',
        },
        sharLink: {
            link: ''
        }

    },
    methods: {
        copyLink() {
            var Url2 = document.getElementById("url");
            Url2.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            console.log("已复制好，可贴粘。");
        },
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
            this.resume.projects.push({ name: '项目名', description: '描述', link: '预览链接', code: '源码地址',preview:'图片' })
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
                    }else if(currentId ==='preview-img'){
                        console.log(22)
                        this.resume.projects[this.resume.projectIndex].preview=fileUrl
                        user.set('previewImg',fileUrl );
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
        signUp() {
            // 新建 AVUser 对象实例
            let user = new AV.User();
            // 设置用户名
            user.setUsername(this.userData.userName);
            // 设置密码
            user.setPassword(this.userData.password);
            // 设置邮箱
            user.setEmail(this.userData.email);
            user.set('userImg', '');
            user.set('previewImg','')
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
        },
        logIn() {
            AV.User.logIn(this.logInData.userName, this.logInData.password).then((loginedUser) => {
            
                this.currentUser.userName = loginedUser.attributes.username
                this.currentUser.id = loginedUser.id
                this.currentUser.userImg = loginedUser.attributes.userImg
                // console.log(this.currentUser.id)
                this.logInFrame = false
                this.logInBt = false
                this.logOutBt = true
                alert('登录成功')
                // window.location.reload()
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
    } else {
        app.getCurrentUser()
    }
}

