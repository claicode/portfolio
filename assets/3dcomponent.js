app.component('tcomp', {
    data() {
        return {
            width: "100%",
            height: window.innerHeight+"px",
            countAni:0,
            delay:10,
        }
    },
    methods: {
        animationParticules(){
            console.log("2")
        },
        createScene(){
            let container = document.getElementById("canv");
            container.style.width = this.width;
            container.style.height = this.height;
            this.light = new THREE.AmbientLight( 0xffffff );
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setClearColor(this.background, this.alpha);
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);
            this.scene = new THREE.Scene();
            this.camera = new THREE.OrthographicCamera(
                container.clientWidth /-50,
                container.clientWidth /50,
                container.clientHeight/50,
                container.clientHeight/-50,
                -15,
                1000
            );

            this.camera.position.z = 10;
            this.scene = new THREE.Scene();
        },
       init(){
        this.createScene()
        const material2 = new THREE.MeshStandardMaterial(
            {
            color:'#ffffff',
            needsUpdate:false,
            polygonOffset:false,
            wireframe:true,
            side:THREE.BackSide
            });
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        
        const particleCount = 360
        const phiIncrement = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
        const planes = []
        this.vectorSp = new THREE.Vector3();
        const v= new THREE.SphereGeometry( 1, 1, 1 );
        this.meshV = new THREE.Mesh(v, material2);
        radius = 15
        const sizeParticule = 3
        for(let i = 0; i < particleCount; i++){
            const theta = phiIncrement * i; // Angle
            //const r = 2
            const y = 1 - (i / (particleCount - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // Radius at y

            const x = radiusAtY * Math.cos(theta) * radius;
            const z = radiusAtY * Math.sin(theta) * radius;

            const geometry = new THREE.PlaneGeometry( radiusAtY* sizeParticule , radiusAtY*sizeParticule  );
            
            const plane = new THREE.Mesh( geometry, material2 );
            planes.push(plane)
            plane.position.set(x,y*radius,z)
            //plane.rotation.x = x
            //plane.rotation.y = y
            plane.rotation.z = z
            plane.lookAt(this.vectorSp)
            this.meshV.add( plane );

        }
        
        this.scene.add(this.meshV)
        this.scene.add(this.light)
        this.ani()
        //this.renderer.render(this.scene, this.camera);
       },
       ani(){
        this.countAni = this.countAni <= this.delay ? this.countAni + 1 : 0 
        if (this.$parent.lastPosition != this.$parent.position){
            this.meshV.rotation.x += 0.1
            this.vectorSp.setX(this.vectorSp.x+=1)
            let container = document.getElementById("container")
            let degres = this.$parent.position * 3
            container.style.transform= `rotateX(${degres}deg)`
        }
        requestAnimationFrame(this.ani);
        this.renderer.render(this.scene, this.camera);
        this.$parent.lastPosition = this.$parent.position
        if(this.countAni == 0){
            this.animationParticules()
        }
       },
    },
    mounted() {
        //window.addEventListener("scroll",this.scrollings())
        this.init()
        
    },
    template: `
        <div id="canv"></div>
    `,
});