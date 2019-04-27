<template>
    <div id="container"></div>
</template>
<script>
var canvas=document.createElement("canvas");
canvas.width=200;
canvas.height=200;
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
                alpha: true, // true/false 表示是否可以设置背景色透明
                precision: 'highp', // highp/mediump/lowp 表示着色精度选择
                premultipliedAlpha: false, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
                preserveDrawingBuffer: true, // true/false 表示是否保存绘图缓冲
                maxLights: 3, // 最大灯光数
                stencil: false // false/true 表示是否使用模板字体或图案
            });
            this.renderer.setSize(this.width, this.height);
            container.appendChild(this.renderer.domElement);
            this.renderer.setClearColor(0xFFFFFF, 1.0);
        },
        //相机
        initCamera() {
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
            this.camera.position.x = 10;
            this.camera.position.y = 1000;
            this.camera.position.z = 10;
            this.camera.up.x = 0;
            this.camera.up.y = 0;
            this.camera.up.z = 5;
            this.camera.lookAt(0,0,0);
        },
        //场景
        initScene() {
            this.scene = new THREE.Scene();
        },
        //灯光
        initLight() {
            let light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
            light.position.set(100, 100, 200);
            this.scene.add(light);
        },
        //物体
        initObject() {
                // Geometry  几何体
                var geometry = new THREE.Geometry();
                // LineBasicMaterial  基础线条材质  一种用于绘制线框样式几何体的材质。
            /** var material = new THREE.LineBasicMaterial( {
                    color: 0xffffff,
                    linewidth: 1,
                    linecap: 'round', //ignored by WebGLRenderer
                    linejoin:  'round' //ignored by WebGLRenderer
                });
            */
                var material = new THREE.LineBasicMaterial( { vertexColors: true } );
                var color1 = new THREE.Color( 0x444444 );
                var color2 = new THREE.Color( 0xFF0000 );
                // 点
                var p1 = new THREE.Vector3( -100, 0, 100 );
                var p2 = new THREE.Vector3(  100, 0, -100 );
                geometry.vertices.push(p1);
                geometry.vertices.push(p2);
                geometry.colors.push( color1, color2 );

                var line = new THREE.Line( geometry, material, THREE.LineSegments);
                this.scene.add(line);
            },
            startAll(){
                this.initThree();
                this.initCamera();
                this.initScene();
                this.initLight();
                this.initObject();
                this.renderer.render(this.scene,this.camera);
            }
    }
}
</script>

<style scoped>
#container{
    height: 500px;
    width: 100%;
}

</style>
