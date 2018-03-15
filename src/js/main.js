Vue.component('info',
    {
        props: ['value'],
        template: ` 
    
    <textarea name="" id="" cols="20" rows="1" @input="emitValue">{{value}}</textarea>
  
    `,
    methods:{
        emitValue(e){
            e.preventDefault()
            this.$emit('edit',e.target.value)       
        }
    }
    }
)