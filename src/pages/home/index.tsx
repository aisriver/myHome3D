import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { getDomInfo } from '@/utils/dom.ts';
import styles from './index.less';
import { MixerType, GLTF } from '@/interfaces/common';
import { createGround, gltfObjectLoader, createCube, bspMesh } from '@/utils/create';
import { deepSetParamsToScene } from '@/utils/three';
import RAF from '@/utils/RAF';
import {
  drawMainRoom,
  drawEastRoom,
  drawKitchenRoom,
  drawSouthRoom,
  drawTileRoof,
} from './components/rooms';
import { drawWalls } from './components/walls';
import { getObjectPositionBySize } from '@/utils/position';
import keyMap from './keyMap';

let renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  light: THREE.PointLight,
  ambLight: THREE.AmbientLight,
  // mixer: THREE.AnimationMixer,
  controls: any,
  stats: any;
const mixers: MixerType[] = [];
const clock: THREE.Clock | null = new THREE.Clock();

// for control
// let objects = [];
// let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
// let vertex = new THREE.Vector3();

export const cementMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load(require('@/assets/cement.png')),
});
const raf = new RAF();
let renderEnabled = false;
let timeOut: symbol;
const timeRender = (time: number = 3000) => {
  renderEnabled = true;
  raf.clearTimeout(timeOut);
  timeOut = raf.setTimeout(() => {
    renderEnabled = false;
  }, time);
};

const Home = () => {
  const glRef = useRef<HTMLDivElement>(null);
  const [visit, setVisit] = useState<boolean>(false);

  const initThree = () => {
    const dom = glRef.current!;
    const { width, height } = getDomInfo(dom);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width as number, height as number);
    renderer.shadowMapEnabled = true;
    // renderer.gammaOutput = true;
    renderer.gammaFactor = 2;
    dom!.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 1.0);
  };

  const initCamera = () => {
    const dom = glRef.current!;
    const { width, height } = getDomInfo(dom);
    camera = new THREE.PerspectiveCamera(45, (width as number) / (height as number), 1, 1000);
    camera.position.set(20, 1.5, 0);
    camera.lookAt(0, 2, 7.5);

    stats = new Stats();
    dom.appendChild(stats.dom);
    // FirstPersonControls
    // controls = new FirstPersonControls(camera);
    // controls.noFly = true;
    // controls.movementSpeed = 1000;
    // controls.lookSpeed = 20;
    // controls.lookVertical = true;
    // controls.constrainVertical = true;
    // controls.verticalMin = 1.1;
    // controls.verticalMax = 2.2;
    // controls.heightMax = 2;
    // controls.heightMin = 1.6;

    // OrbitControls
    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.target = new THREE.Vector3(0, 0, 0);
    // controls.autoRotate = false;
    // controls.update();
    // controls.addEventListener('change', () => {
    //   timeRender();
    // });

    // PointerLockControls
    controls = new PointerLockControls(camera, document.body);
    controls.addEventListener('lock', () => {
      setVisit(true);
    });
    controls.addEventListener('unlock', () => {
      setVisit(false);
    });
    scene.add(controls.getObject());
    // raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
    dom.appendChild(renderer.domElement);
  };

  const initScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);
    scene.fog = new THREE.Fog(0xcce0ff, 15, 30);
  };

  const initLight = () => {
    // 点光
    light = new THREE.PointLight(0xffffff, 1.0, 0);
    light.position.set(100, 100, 200);
    light.castShadow = true;
    light.shadow.camera.near = 8;
    light.shadow.camera.far = 1000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    // 环境光
    ambLight = new THREE.AmbientLight(0x666666);
    scene.add(ambLight);
    scene.add(light);
  };

  /**
   * 地板
   */
  const drawColorGround = (houseGroup: THREE.Group) => {
    const groundGroup = new THREE.Group();
    const material = cementMaterial.clone();
    const y = 0.002;
    const room3 = createGround({
      width: 5,
      height: 5,
      position: { x: 0, y, z: 10 },
      color: 0x707170,
      img: require('@/assets/cement.png'),
    });
    const well = createCube({
      size: { x: 1, y: 1, z: 1 },
      material,
    });
    well.position.set(10 + 0.5, y, 9 + 0.5);
    const wellSubArr = [
      {
        size: { x: 0.8, y: 0.8, z: 0.8 },
        position: { x: 10.1, y: y + 0.1, z: 9.1 },
      },
    ];
    const wellBspResult = bspMesh(well, [
      ...wellSubArr.map(item => ({
        ...item,
        geometry: new THREE.BoxGeometry(item.size.x, item.size.y, item.size.z),
        position: getObjectPositionBySize(item.position, item.size),
      })),
    ]);
    const ground = createGround({
      width: 14.55,
      height: 15.2,
      position: { x: 0, y: 0.001, z: 0 },
      color: 0x666666,
      img: require('@/assets/brick.png'),
      repeatU: 4,
      repeatV: 5,
    });
    groundGroup.add(room3, wellBspResult, ground);
    houseGroup.add(groundGroup);
  };

  /**
   * 绘制屋顶
   * @param houseGroup
   */
  const drawRoofs = (houseGroup: THREE.Group) => {
    const entryX = 3.5;
    const entryZ = 4.5;
    const material = cementMaterial.clone();
    const entryRoofGroup = new THREE.Group();
    const entryRoof = createCube({
      size: { x: entryX, y: 0.2, z: entryZ },
      material,
    });
    const entryRoofSide1 = createCube({
      size: { x: entryX, y: 0.3, z: 0.3 },
      material,
    });
    entryRoofSide1.position.set(0, 0, -entryZ / 2);
    const entryRoofSide2 = entryRoofSide1.clone();
    entryRoofSide2.position.set(0, 0, entryZ / 2);
    const entryRoofSide3 = createCube({
      size: { x: 0.3, y: 0.3, z: entryZ + 0.3 },
      material,
    });
    entryRoofSide3.position.set(-entryX / 2, 0, 0);
    const entryRoofSide4 = entryRoofSide3.clone();
    entryRoofSide4.position.set(entryX / 2, 0, 0);
    entryRoofGroup.position.set(11.2 + entryX / 2, 2.5, 5.3 + entryZ / 2);
    entryRoofGroup.add(entryRoof, entryRoofSide1, entryRoofSide2, entryRoofSide3, entryRoofSide4);
    const secondRoof = createCube({
      size: { x: 8.4, y: 0.3, z: 5.6 },
      position: { x: 6.2, y: 2.4, z: -0.2 },
      material,
    });
    houseGroup.add(entryRoofGroup, secondRoof);
  };

  /**
   * 加载完对象
   * @param callBack
   */
  const afterRender = (callBack: (gltf: GLTF) => void) => {
    return (gltf: GLTF) => {
      callBack(gltf);
      timeRender();
    };
  };

  const drawRooms = (houseGroup: THREE.Group) => {
    drawMainRoom(houseGroup, afterRender);
    drawEastRoom(houseGroup, afterRender);
    drawKitchenRoom(houseGroup, afterRender, mixers);
    drawSouthRoom(houseGroup, afterRender);
    drawTileRoof(houseGroup, afterRender);
  };

  /**
   * 树
   */
  const loaderTrees = (houseGroup: THREE.Group) => {
    // 樱桃树
    gltfObjectLoader(
      'gltf/object/cherryTree/sceneDraco.gltf',
      afterRender(gltf => {
        const obj = gltf.scene;
        const box = new THREE.Box3().setFromObject(obj);
        const { max } = box;
        if (!isNaN(max.y)) {
          const height = 3.5;
          const scale = height / max.y;
          obj.scale.set(scale, scale, scale);
          obj.position.set(7.5, 0, 10);
          deepSetParamsToScene(obj, { castShadow: true, receiveShadow: true });
          houseGroup.add(obj);
        }
      }),
    );
    gltfObjectLoader(
      'gltf/object/ground_moss_fores_square/scene.gltf',
      afterRender(gltf => {
        const obj = gltf.scene;
        const box = new THREE.Box3().setFromObject(obj);
        const { max } = box;
        if (!isNaN(max.y)) {
          const height = 0.15;
          const scale = height / max.y;
          obj.scale.set(scale, scale, scale);
          obj.position.set(7.4, 0, 9.9);
          houseGroup.add(obj);
        }
      }),
    );
    // 葡萄树
    gltfObjectLoader(
      'gltf/object/tree_scan_free/sceneDraco.gltf',
      afterRender(gltf => {
        const obj = gltf.scene;
        const box = new THREE.Box3().setFromObject(obj);
        const { max } = box;
        if (!isNaN(max.y)) {
          const height = 1.8;
          const scale = height / max.y;
          obj.scale.set(scale, scale, scale);
          // obj.position.set(10.8, -0.3, 10);
          obj.position.set(10.8, 1.1, 9);
          deepSetParamsToScene(obj, { castShadow: true, receiveShadow: true });
          houseGroup.add(obj);
        }
      }),
    );
  };

  /**
   * 创建大门
   * @param houseGroup
   */
  const createMainDoor = (houseGroup: THREE.Group) => {
    const doorGroup1 = new THREE.Group();
    const doorGroup2 = new THREE.Group();
    gltfObjectLoader(
      'gltf/object/doorFrame/scene.gltf',
      afterRender(gltf => {
        const obj = gltf.scene;
        const box = new THREE.Box3().setFromObject(obj);
        const { max } = box;
        if (!isNaN(max.y)) {
          const height = 2;
          const scale = height / max.y;
          obj.scale.set(scale * 1.3, scale, scale * 1.6);
          obj.position.set(0, 0, 0);
          doorGroup1.add(obj);
          doorGroup2.add(obj.clone());
        }
      }),
    );
    gltfObjectLoader(
      'gltf/object/mainDoor2/scene.gltf',
      afterRender(gltf => {
        const obj = gltf.scene;
        const box = new THREE.Box3().setFromObject(obj);
        const { max } = box;
        if (!isNaN(max.y)) {
          const height = 1.8;
          const scale = height / max.y;
          obj.rotateY(Math.PI / 2);
          obj.scale.set(scale, scale, scale);
          obj.position.set(0, 0, 0.96);
          const rightDoor = obj.clone();
          rightDoor.scale.set(-scale, scale, scale);
          rightDoor.position.set(0, 0, -1);
          obj.rotateY(Math.PI / 3);
          rightDoor.rotateY(-Math.PI / 2.5);
          doorGroup1.add(obj, rightDoor);
        }
      }),
    );
    gltfObjectLoader(
      'gltf/object/mainDoor/scene.gltf',
      afterRender(gltf => {
        const obj = gltf.scene;
        const box = new THREE.Box3().setFromObject(obj);
        const { max } = box;
        if (!isNaN(max.y)) {
          const height = 1.8;
          const scale = height / max.y;
          obj.rotateY(Math.PI / 2);
          obj.scale.set(scale, scale, scale);
          obj.position.set(0, 0, 0.96);
          const rightDoor = obj.clone();
          rightDoor.scale.set(-scale, scale, scale);
          rightDoor.position.set(0, 0, -1);
          obj.rotateY(Math.PI / 1.5);
          rightDoor.rotateY(-Math.PI / 2);
          doorGroup2.add(obj, rightDoor);
        }
      }),
    );
    doorGroup1.position.set(14.15, 0, 7.5);
    doorGroup2.position.set(5.15, 0, 7.5);
    houseGroup.add(doorGroup1, doorGroup2);
  };

  const drawGround = () => {
    // ground
    const loader = new THREE.TextureLoader();
    const groundTexture = loader.load(require('@/assets/grasslight-big.jpg'));
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), groundMaterial);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
    // 参考线
    // const axesHelper = new THREE.AxesHelper(8);
    const houseGroup = new THREE.Group();
    drawColorGround(houseGroup);
    drawWalls(houseGroup, afterRender);
    drawRooms(houseGroup);
    loaderTrees(houseGroup);
    createMainDoor(houseGroup);
    drawRoofs(houseGroup);
    houseGroup.position.set(-5, 0, -7.5);
    scene.add(houseGroup);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    if (renderEnabled) {
      const delta = clock.getDelta();
      for (let i = 0; i < mixers.length; i++) {
        // 重复播放动画
        mixers[i].update(delta);
      }
      if (controls.isLocked) {
        let time = performance.now();
        let delta = (time - prevTime) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions
        if (moveForward || moveBackward) {
          velocity.z -= direction.z * 100.0 * delta;
        }
        if (moveLeft || moveRight) {
          velocity.x -= direction.x * 100.0 * delta;
        }
        // 如果在物体上，则可以发起跳跃动作
        // if (onObject) {
        // velocity.y = Math.max(0, velocity.y);
        // canJump = true;
        // }
        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
        controls.getObject().position.y += velocity.y * delta; // new behavior
        // 如果高度小于临界点也可以发起跳跃
        if (controls.getObject().position.y <= 1.5) {
          velocity.y = 0;
          controls.getObject().position.y = 1.5;
          canJump = true;
        } else {
          velocity.y -= 1.8 * 50.0 * delta; // 100.0 = mass
        }
        prevTime = time;
      }
      controls.update && controls.update(clock.getDelta());
      renderer.render(scene, camera);
    }
    stats.update();
  };

  const threeRender = () => {
    initThree();
    initScene();
    initCamera();
    initLight();
    drawGround();
    // initWestGirlLoader();
    renderer.clear();
    renderer.render(scene, camera);
    animate();
  };

  useEffect(() => {
    threeRender();
    THREE.DefaultLoadingManager.onLoad = () => {
      timeRender();
    };
    document.body.onmousemove = () => {
      timeRender();
    };
    /**
     * 键盘监听
     * 前进、后退、左右移动、跳跃
     */
    document.body.onkeydown = (e: KeyboardEvent) => {
      switch (+e.keyCode) {
        case keyMap.escape:
          controls.unlock();
          break;
        case keyMap.w:
        case keyMap.up_arrow:
          moveForward = true;
          break;
        case keyMap.s:
        case keyMap.down_arrow:
          moveBackward = true;
          break;
        case keyMap.a:
        case keyMap.left_arrow:
          moveLeft = true;
          break;
        case keyMap.d:
        case keyMap.right_arrow:
          moveRight = true;
          break;
        case keyMap.space:
          if (canJump) {
            velocity.y += 30; // 每次跳跃增加高度
          }
          canJump = false;
          break;
      }
      timeRender();
    };
    document.body.onkeyup = (e: KeyboardEvent) => {
      switch (+e.keyCode) {
        case keyMap.w:
        case keyMap.up_arrow:
          moveForward = false;
          break;
        case keyMap.s:
        case keyMap.down_arrow:
          moveBackward = false;
          break;
        case keyMap.a:
        case keyMap.left_arrow:
          moveLeft = false;
          break;
        case keyMap.d:
        case keyMap.right_arrow:
          moveRight = false;
          break;
      }
      timeRender();
    };
  }, []);

  const handleVisit = () => {
    controls.lock();
  };

  return (
    <div>
      <div ref={glRef} className={styles['canvas-gl']} />
      {!visit && (
        <div className={styles.blocker} onClick={handleVisit}>
          <div className={styles.instructions}>
            <div className={styles.title}>Click to visit</div>
            <div className={styles.info}>Move: WASD</div>
            <div className={styles.info}>Jump: SPACE</div>
            <div className={styles.info}>Look: MOUSE</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
