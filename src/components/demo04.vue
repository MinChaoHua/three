<template>
<div>
     <div id="canvas-frame"></div>
        <div>
            Fov:<input type="text" value="45" id="txtFov"/>(0到180的值)
        </div>
</div>
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
        }
    },
    mounted: function(){
        this.startAll();
    },
    methods:{
         initThree() {
            let container = document.getElementById('canvas-frame');
            this.width = document.getElementById('canvas-frame').clientWidth;
            this.height = document.getElementById('canvas-frame').clientHeight;
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
            this.camera.up.z = 600;
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

            let light2 = new THREE.PointLight(0x00FF00);
            light2.position.set(0, 0,300);
            this.scene.add(light2);
        },
        //物体
        initObject() {
                var geometry = new THREE.CylinderGeometry( 70,100,200);
                var material = new THREE.MeshLambertMaterial( { color:0xFFFFFF} );
                var mesh = new THREE.Mesh( geometry,material);
                mesh.position.x = 0;
                mesh.position.y = 0;
                mesh.position.z = 0;
                this.scene.add(mesh);
        },
        startAll(){
            this.initThree();
            this.initCamera();
            this.initScene();
            this.initLight();
            this.initObject();
            this.renderer.render(this.scene,this.camera);
        },
         animation(){
                this.changeFov();
                renderer.render(scene, camera);
                requestAnimationFrame(animation);
        },        
        setCameraFov(fov){
                camera.fov = fov;
                camera.updateProjectionMatrix();
        },
            
        changeFov(){
                var txtFov = document.getElementById("txtFov").value;
                var val = parseFloat(txtFov);
                setCameraFov(val);
        }
    }
}
</script>

<style scoped>
div#canvas-frame {
                border: none;
                cursor: pointer;
                width: 100%;
                height: 600px;
                background-color: #EEEEEE;
            }
</style>
