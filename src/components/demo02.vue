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
                alpha: true, // true/false 表示是否可以设置背景色透明
                precision: 'highp', // highp/mediump/lowp 表示着色精度选择
                premultipliedAlpha: false, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
                preserveDrawingBuffer: true, // true/false 表示是否保存绘图缓冲
                maxLights: 10, // 最大灯光数
                stencil: false // false/true 表示是否使用模板字体或图案
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
            /** SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )

            color - (可选参数) 十六进制光照颜色。 缺省值 0xffffff (白色)。
            intensity - (可选参数) 光照强度。 缺省值 1。

            distance - 从光源发出光的最大距离，其强度根据光源的距离线性衰减。 
            angle - 光线散射角度，最大为Math.PI/2。
            penumbra - 聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
            decay - 沿着光照距离的衰减量。

            创建一个新的聚光灯。*/

            var spotLight = new THREE.SpotLight( 0xFF69B4 );//聚光灯
            spotLight.position.set( 100, 1000, 100 );

            spotLight.castShadow = true;

            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;

            spotLight.shadow.camera.near = 500;
            spotLight.shadow.camera.far = 4000;
            spotLight.shadow.camera.fov = 30;

            this.scene.add( spotLight );
        },
        //物体
        initObject() {
            var geometry = new THREE.SphereGeometry( 50, 16,16 );
            var texture = THREE.ImageUtils.loadTexture("../../static/images/timg.gif",null,function(t) {});
            texture.needsUpdate = true;
            var material = new THREE.MeshBasicMaterial({map:texture});
           // var material = new THREE.MeshBasicMaterial( { color: 0xFF69B4 } );
            this.circle = new THREE.Mesh( geometry, material );
            this.circle.geometry.verticesNeedUpdate = true;
            this.circle.geometry.normalsNeedUpdate = true;

            // 添加辅助轴
            // this.axis = new THREE.AxisHelper(150);
            // var axis =  this.axis;
            // this.scene.add(axis);

            var geometry1 = new THREE.PlaneBufferGeometry( 50, 200, 32 );// 平面尺寸   
            var material1 = new THREE.MeshBasicMaterial( {color: 0xFF69B4, side: THREE.DoubleSide} );
            var plane = new THREE.Mesh( geometry1, material1 );
            plane.receiveShadow = true;//接受阴影投影
            // 平面位置
            plane.rotation.x = -1.5*Math.PI;
            plane.position.x = 10;
            plane.position.y = 10;
            plane.position.z = -500;
             
            this.scene.add( plane );
            this.scene.add( this.circle );
        },
        //动起来
         updata(){
            requestAnimationFrame(this.updata);
            this.circle.rotation.y +=0.01;
            //this.axis.rotation.y +=0.01;
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
