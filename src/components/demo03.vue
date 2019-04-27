<template>
    <div id="container"></div>
</template>
<script>
import * as THREE from 'THREE'
export default {
    data(){
        return{
            camera: null,
            scene: null,
            renderer: null,
            mesh: null,
            width:null,
            height:null,
            circle:null,
            axis:null,
        }
    },
    mounted: function(){
        this.startAll();
    },
    methods:{
         initThree() {
            let container = document.getElementById('container');
            this.width = document.getElementById('container').clientWidth;
            this.height = document.getElementById('container').clientHeight;
            //渲染器
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true, // true/false表示是否开启反锯齿
            });
            this.renderer.setSize(this.width, this.height);
            container.appendChild(this.renderer.domElement);
          // this.renderer.setClearColor(0xFFFFFF, 1.0);
        },
        //相机
        initCamera() {
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
            this.camera.position.z = 400;
            this.camera.position.x = 0;
            this.camera.position.y = 50;
        },
        //场景
        initScene() {
            this.scene = new THREE.Scene();
        },
        //灯光
        initLight() {

            var spotLight = new THREE.SpotLight( 0xffffff );//聚光灯
            spotLight.position.set(-40,60,-10 );

            spotLight.castShadow = true;//阴影

            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;

            spotLight.shadow.camera.near = 500;
            spotLight.shadow.camera.far = 4000;
            spotLight.shadow.camera.fov = 30;

            this.scene.add( spotLight );
        },
        //物体
        initObject() {
           
            // 添加辅助轴
            this.axis = new THREE.AxisHelper(150);
            var axis =  this.axis;
            this.scene.add(axis);

            var geometry = new THREE.SphereGeometry( 50, 16,16 );

            var loader = new THREE.TextureLoader();

            loader.load(
                '../static/images/timg.gif',

                // 加载完成后的回调函数
                function ( texture ) {
                    // 纹理被加载时创建材质
                    var material = new THREE.MeshBasicMaterial( {
                        map: texture
                    } );
                },
                // 加载出错的回调函数
                function ( err ) {
                    console.error( 'An error happened.' );
                }

            )
            var material = new THREE.MeshBasicMaterial( { color: 0xFF69B4 } );
            this.circle = new THREE.Mesh( geometry, material );
            this.circle.geometry.verticesNeedUpdate = true;
            this.circle.geometry.normalsNeedUpdate = true;
            this.scene.add( this.circle );
          

            var geometry1 = new THREE.PlaneBufferGeometry( 500, 1600, 320 );// 平面尺寸
            var material1 = new THREE.MeshBasicMaterial( {color: 0x7FFFAA, side: THREE.DoubleSide} );
            var plane = new THREE.Mesh( geometry1, material1 );
            plane.receiveShadow = true;//接受阴影投影
            // 平面位置
            plane.rotation.x = -1.35*Math.PI;
            plane.position.x = 10;
            plane.position.y =10;
            plane.position.z = -500;      
            this.scene.add( plane );
        },
        //动起来
         updata(){
            requestAnimationFrame(this.updata);
            this.circle.rotation.y +=0.01;
            this.axis.rotation.y +=0.01;
            this.renderer.render(this.scene, this.camera);
           
        },
        startAll(){
            this.initThree();
            this.initCamera();
            this.initScene();
            this.initLight();
            this.initObject();
            this.updata();
        }
    }
}
</script>

<style scoped>
#container{
    height: 400px;
    width: 100%;
}

</style>
