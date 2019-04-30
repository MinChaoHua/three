<template>
<div>
     <div id="canvas-frame"></div>
</div>
</template>
<script>
/**
cnpm three --save

 */
import * as THREE from 'THREE'
import  'three-orbitcontrols'//鼠标移动
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
            //鼠标可移动物体
            var controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
            controls.target = new THREE.Vector3(0, 0, 0);//控制焦点
            controls.autoRotate = false;//将自动旋转关闭
            var clock = new THREE.Clock();//用于更新轨道控制器
            controls.update();
        },
        //场景
        initScene() {
            this.scene = new THREE.Scene();
        },
        //灯光
        initLight() {
            //平行光
            let light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
            light.position.set(100, 500, 20).normalize();
            this.scene.add(light);
        },
        //物体
        initObject() {
                var geometry = new THREE.BoxBufferGeometry( 100,100,100);
               // var geometry = new THREE.SphereGeometry(300, 60,120);     
               // var texture = THREE.ImageUtils.loadTexture("../../static/images/1.jpg",null,function(t) {});
               // texture.needsUpdate = true;
                var material = new THREE.MeshLambertMaterial( { color:0xFFFFFF} );
               // var material = new THREE.MeshBasicMaterial({map:texture},{ color:0xFFFFFF});
                var mesh = new THREE.Mesh( geometry,material);
                 mesh.geometry.verticesNeedUpdate = true;
                 mesh.geometry.normalsNeedUpdate = true;
                this.mesh = mesh;
                mesh.position.x = 0;
                mesh.position.y = 0;
                mesh.position.z = 0;
                this.scene.add(mesh);

                var planeGeo = new THREE.PlaneGeometry(500,500,10,10);//创建平面
                var planeMat = new THREE.MeshLambertMaterial({  //创建材料
                color:0x666666,
                wireframe:false
                });
                 var planeMesh = new THREE.Mesh(planeGeo, planeMat);//创建网格模型
                planeMesh.position.set(0, 0, -40);//设置平面的坐标
                planeMesh.rotation.x = -0.5 * Math.PI;//将平面绕X轴逆时针旋转90度
                this.scene.add(planeMesh);//将平面添加到场景中
                
        },
        startAll(){
            this.initThree();
            this.initCamera();
            this.initScene();
            this.initLight();
            this.initObject();
            this.updata();
        },
        //运动
         updata(){
                requestAnimationFrame(this.updata);
                this.mesh.rotation.z +=0.01;
                this.mesh.rotation.y +=0.01;
                this.renderer.render(this.scene,this.camera);
        },        
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
