var app = new Vue({
    el: '#app',
    data: {
        resume: {
            name: 'xxx',
            gender: '男',
            age: '22',
            email: 'xxxx@outlook.com',
            phone: '15123456789',
            weChat: 'xxxx'
        }
    },
    methods: {
        y(key, value) {
            this.resume[key] = value
        }
    }
})