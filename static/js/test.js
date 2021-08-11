import * as THREE from 'https://threejs.org/build/three.module.js';
import { TrackballControls } from 'https://threejs.org/examples/jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';


let camera, glScene, cssScene, glRenderer, cssRenderer,font;

let cube, textMesh = [];


let Element = function(id, x, y, z, roty) {
    let div = document.createElement('div');
    div.style.width = '480px';
    div.style.height = '360px';
    div.style.backgroundColor = '#000';
    
    let iframe =document.createElement('iframe');
    iframe.style.width = '480px';
    iframe.style.height = '360px';
    iframe.style.border = '0px';
    iframe.src = `https://www.youtube.com/embed/${id}?rel=0&autoplay=1&mute=1`;
    div.appendChild(iframe);

    let obj = new CSS3DObject(div);
    obj.position.set(x, y, z);
    obj.rotation.y = roty;

    return obj;
}

function createGlRenderer() {
    var glRenderer = new THREE.WebGLRenderer({alpha:true});

  
    glRenderer.setPixelRatio(window.devicePixelRatio);
    glRenderer.setSize(window.innerWidth, window.innerHeight);

    glRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.zIndex = 1;
    glRenderer.domElement.style.top = 0;

    return glRenderer;
}

function createCssRenderer() {
    var cssRenderer = new CSS3DRenderer();

    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.zIndex = 0;
    cssRenderer.domElement.style.top = 0;

    return cssRenderer;
}

function loadFont() {
    let fontPath = '/static/font/testfont.json';
    // let fontPath = '/static/font/Noto_Sans_JP_Medium_Regular.json';
    return new Promise(resolve => {
        new THREE.FontLoader().load(fontPath, resolve);
    });
}



async function init() {
    let container = document.getElementById('container');

    glScene = new THREE.Scene();
    cssScene = new THREE.Scene();


    camera  = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    let camPos = [10,10,1000];
    camera.position.set(...camPos);

    glRenderer = createGlRenderer();
    cssRenderer = createCssRenderer();

    container.appendChild(cssRenderer.domElement);
    cssRenderer.domElement.appendChild(glRenderer.domElement);


    let geometry = new THREE.BoxGeometry( 100, 100, 100 );
    let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    

    // load font
    font = await loadFont();

    // create font
    const textObj = new THREE.TextGeometry('HELLO WORrld !', {
        font: font,
        size: 10,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 5
    });
    textMesh.push(new THREE.Mesh(textObj, material));
    textMesh.push(new THREE.Mesh(textObj, material));
    textMesh.push(new THREE.Mesh(textObj, material));

    textMesh[0].position.set(100,10,800);
    textMesh[1].position.set(100,50,800);
    textMesh[2].position.set(100,-40,800);

    for(let el of textMesh) {
        glScene.add(el);
    }

    let ifpos = [0,0,0]
    let ifobj = new Element('r78ZX-_fDds',...ifpos,0);

    let ifobj2 = new Element('A8vwBgsjU2c', -500,0,50,0.4);
    let ifobj3 = new Element('Dqx8pcf_v9E', 500,0,50,-0.4);


    cssScene.add(ifobj);    
    cssScene.add(ifobj2);
    cssScene.add(ifobj3);

}


var animate = function () {
	requestAnimationFrame(animate);


	cssRenderer.render( cssScene, camera );
    glRenderer.render( glScene, camera);

    for(let el of textMesh) {
        el.position.x -= 0.2;
    }
  
};

init();
animate();