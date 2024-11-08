app.component('navmenu', {
    data() {
        return {
            
        }
    },
    methods: {
       goToSection(section){
        console.log(section)
       }
    },
    mounted() {
       
        
    },
    template: `
        <nav>
            <div>
                <div @click="goToSection('hola')">A</div>
            </div>
            <div>
                <div @click="goToSection('hola')">B</div>
            </div>
            <div>
                <div @click="goToSection('hola')">C</div>
            </div>
            <div>
                <div @click="goToSection('hola')">D</div>
            </div>
        </nav>
    `,
});