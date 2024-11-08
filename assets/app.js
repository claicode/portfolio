

const app = Vue.createApp({
    data() {
        return {
            position:0,
            lastPosition:0
        }
    },
    methods: {
       sc(event){
        //this.delta = event.deltaY
        let whell = event.deltaY
        if(whell > 0){
            this.position += 1
        }else{
            this.position -= 1
        }
        console.log("333")
       }


    },
    mounted() {
        window.onwheel = this.sc
        
    },
    template: `
        <navmenu></navmenu>
        <tcomp></tcomp>
        <container></container>
        
        
    `,

});


