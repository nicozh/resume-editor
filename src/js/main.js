Vue.component('info',
    {
        props: ['value'],
        template: ` 
        <div class = "out-box"><textarea name="" id="" rows="1" @input="emitValue">{{value}}</textarea></div>
    `,
        methods: {
            emitValue(e) {
                e.preventDefault()
                this.$emit('edit', e.target.value)
            }
        }
    }
)



