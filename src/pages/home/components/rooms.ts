import * as THREE from 'three';
import {
  createGround,
  gltfObjectLoader,
  createCube,
  bspMesh,
  createCylinderMesh,
} from '@/utils/create';
import { GLTF, MixerType } from '@/interfaces/common';
import { getObjectPositionBySize } from '@/utils/position';

const cementGround = createGround({
  width: 5,
  height: 5,
  img: require('@/assets/cement.png'),
});
const cementMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load(require('@/assets/cement.png')),
});

export type AfterRender = (callBack: (gltf: GLTF) => void) => (gltf: GLTF) => void;

/**
 * 堂屋
 * @param houseGroup
 * @param afterRender
 */
export const drawMainRoom = (houseGroup: THREE.Group, afterRender: AfterRender) => {
  const room = new THREE.Group();
  const ground = cementGround.clone();
  gltfObjectLoader(
    'gltf/object/mainDesk/sceneDraco.gltf',
    afterRender(gltf => {
      const mainDesk = gltf.scene;
      const box = new THREE.Box3().setFromObject(mainDesk);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 0.5;
        const scale = height / max.y;
        mainDesk.rotateY(Math.PI / 2);
        mainDesk.scale.set(scale, scale, scale);
        mainDesk.position.set(0, 0, 0);
        const copyDesk = mainDesk.clone();
        copyDesk.scale.set(-scale, scale, scale);
        copyDesk.position.set(0, 0, 0.57);
        const deskGroup = new THREE.Group();
        deskGroup.add(mainDesk, copyDesk);
        deskGroup.position.set(0.8, 0.45, 2.5);
        room.add(deskGroup);
      }
    }),
  );
  gltfObjectLoader(
    'gltf/object/squareTable/scene.gltf',
    afterRender(gltf => {
      const squareTable = gltf.scene;
      const box = new THREE.Box3().setFromObject(squareTable);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 1;
        const scale = height / max.y;
        squareTable.rotateY(Math.PI / 2);
        squareTable.scale.set(scale, scale, scale);
        squareTable.position.set(0.8, 0, 4.5);
        room.add(squareTable);
      }
    }),
  );
  const material = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load(require('@/assets/五联中堂画.jpg')),
  });
  const landscapePainting = createCube({
    size: { x: 0.1, y: 2.14, z: 3 },
    material,
  });
  landscapePainting.position.set(0.2, 1.7, 2.6);
  landscapePainting.castShadow = true;
  landscapePainting.receiveShadow = true;
  room.add(ground, landscapePainting);
  room.position.set(0, 0.002, 5);
  houseGroup.add(room);
};

/**
 * 东屋
 * @param houseGroup
 * @param afterRender
 */
export const drawEastRoom = (houseGroup: THREE.Group, afterRender: AfterRender) => {
  const room = new THREE.Group();
  const ground = cementGround.clone();
  gltfObjectLoader(
    'gltf/object/bed1/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 1.5;
        const scale = height / max.y;
        obj.rotateY(-Math.PI / 2);
        obj.scale.set(scale, scale, scale);
        obj.position.set(4, 0, 0.6);
        room.add(obj);
      }
    }),
  );
  gltfObjectLoader(
    'gltf/object/wardrobe/sceneDraco.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 1;
        const scale = height / max.y;
        obj.scale.set(scale, scale, scale);
        obj.position.set(4.3, 1, 0.6);
        room.add(obj);
      }
    }),
  );
  gltfObjectLoader(
    'gltf/object/tvCabinet/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 0.5;
        const scale = height / max.y;
        obj.rotateY(Math.PI);
        obj.scale.set(scale, scale, scale);
        obj.position.set(3, 0.5, 0.6);
        room.add(obj);
      }
    }),
  );
  gltfObjectLoader(
    'gltf/object/tv/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 0.6;
        const scale = height / max.y;
        obj.scale.set(scale, scale, scale);
        obj.position.set(3, 1, 0.6);
        room.add(obj);
      }
    }),
  );
  gltfObjectLoader(
    'gltf/object/bed2/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 1;
        const scale = height / max.y;
        obj.rotateY(Math.PI / 2);
        obj.scale.set(scale, scale, scale);
        obj.position.set(4.95, 0, 4.8);
        room.add(obj);
      }
    }),
  );
  room.add(ground);
  room.position.set(0, 0.002, 0);
  houseGroup.add(room);
};

/**
 * 厨房
 * @param houseGroup
 * @param afterRender
 * @param mixers
 */
export const drawKitchenRoom = (
  houseGroup: THREE.Group,
  afterRender: AfterRender,
  mixers: MixerType[],
) => {
  const room = new THREE.Group();
  const ground = createGround({
    width: 4,
    height: 5,
    img: require('@/assets/soil.png'),
  });
  const material = cementMaterial.clone();
  const contents = new THREE.Group();
  // 厨房柴堆槛
  const sideCube = createCube({
    size: { x: 0.2, y: 0.3, z: 2.2 },
    material,
    position: { x: 2, y: 0, z: 2.6 },
  });
  // 灶台
  const hearthCube = createCube({
    size: { x: 2.2, y: 1.2, z: 1.4 },
    material,
    position: { x: 0, y: 0, z: 1.2 },
  });
  const cornerCube = createCube({
    size: { x: 1, y: 1.2, z: 1.2 },
    material,
    position: { x: 0, y: 0, z: 0 },
  });
  // 烟囱
  const chimneyCube = createCube({
    size: { x: 0.4, y: 2.4, z: 0.4 },
    material,
    position: { x: 0, y: 1.2, z: 0 },
  });
  // 锅
  const ironMaterial = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load(require('@/assets/铁皮2.png')),
  });
  const potSphere = new THREE.SphereGeometry(0.8, 32, 32); //  , 0, Math.PI * 2, 2, 0.8
  const potMesh = new THREE.Mesh(potSphere, ironMaterial);
  // { x: 0.2 + 0.4, y: 1.5 + 0.4, z: 1.7 + 0.2 }
  potMesh.position.set(0.6, 1.9, 1.9);
  const potBspResult = bspMesh(potMesh, [
    {
      geometry: new THREE.BoxGeometry(1.6, 1.6, 1.6),
      position: { x: 0.6, y: 1.2 + 0.85, z: 1.1 + 0.8 },
    },
    {
      geometry: potSphere,
      position: { x: 0.6, y: 1.92, z: 1.9 },
    },
  ]);
  const hearthSubArr = [
    // left center center
    {
      size: { x: 2.2, y: 0.6, z: 0.2 },
      position: { x: 0, y: 0.5, z: 2.45 },
    },
    // left center bottom
    {
      size: { x: 0.3, y: 0.4, z: 2 },
      position: { x: 0.45, y: 0.5, z: 1 },
    },
    // right center bottom
    {
      size: { x: 0.3, y: 0.4, z: 1.6 },
      position: { x: 1.45, y: 0.5, z: 1.4 },
    },
    // center center center
    {
      size: { x: 1.8, y: 0.68, z: 0.9 },
      position: { x: 0.2, y: 0.5, z: 1.4 },
    },
    // bottom bottom bottom
    {
      size: { x: 1.8, y: 0.3, z: 1 },
      position: { x: 0.2, y: 0.1, z: 1.4 },
    },
    // right bottom center
    {
      size: { x: 0.5, y: 0.35, z: 0.3 },
      position: { x: 1.8, y: 0.05, z: 1.75 },
    },
  ];
  const bigSphere = new THREE.SphereGeometry(0.8, 32, 32);
  const hearthBspResult = bspMesh(hearthCube, [
    ...hearthSubArr.map(item => ({
      geometry: new THREE.BoxGeometry(item.size.x, item.size.y, item.size.z),
      position: getObjectPositionBySize(item.position, item.size),
    })),
    {
      geometry: bigSphere,
      position: { x: 0.2 + 0.4, y: 1.5 + 0.4, z: 1.7 + 0.2 },
    },
    {
      geometry: bigSphere,
      position: { x: 1.2 + 0.4, y: 1.5 + 0.4, z: 1.7 + 0.2 },
    },
  ]);
  const cornerSubArr = [
    // left center top
    {
      size: { x: 0.96, y: 1.16, z: 1.3 },
      position: { x: 0.02, y: 0.02, z: 0.02 },
    },
  ];
  const cornerBspResult = bspMesh(cornerCube, [
    ...cornerSubArr.map(item => ({
      geometry: new THREE.BoxGeometry(item.size.x, item.size.y, item.size.z),
      position: getObjectPositionBySize(item.position, item.size),
    })),
    {
      geometry: bigSphere,
      position: { x: 0.1 + 0.4, y: 1.5 + 0.44, z: 0.55 + 0.2 },
    },
  ]);
  // 桌子
  gltfObjectLoader(
    'gltf/object/oldTable/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 0.8;
        const scale = height / max.y;
        obj.scale.set(scale - 0.004, scale, scale);
        obj.position.set(3.6, 0, 1.6);
        contents.add(obj);
      }
    }),
  );
  // 水桶
  gltfObjectLoader(
    'gltf/object/bucket/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 0.8;
        const scale = height / max.y;
        obj.scale.set(scale, scale, scale);
        obj.position.set(3.4, 0, 3.4);
        contents.add(obj);
      }
    }),
  );
  // 煤气罐
  gltfObjectLoader(
    'gltf/object/gasTank/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 0.7;
        const scale = height / max.y;
        obj.scale.set(scale, scale, scale);
        obj.position.set(3.4, 0, 0.4);
        contents.add(obj);
      }
    }),
  );
  // 门
  gltfObjectLoader(
    'gltf/object/doorWood/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 2;
        const scale = height / max.y;
        obj.scale.set(-scale * 1.1, scale, scale);
        obj.position.set(3, 0, 5);
        const obj2 = obj.clone();
        obj2.scale.set(scale * 1.1, scale, scale);
        obj2.position.set(4.6, 0, 5);
        const mixer1 = new THREE.AnimationMixer(obj);
        const mixer2 = new THREE.AnimationMixer(obj2);
        gltf.animations.forEach((clip: THREE.AnimationClip) => {
          mixer1
            .clipAction(clip)
            .setDuration(6)
            .play();
          mixer2
            .clipAction(clip)
            .setDuration(6)
            .play();
        });
        mixers.push(mixer1, mixer2);
        contents.add(obj, obj2);
      }
    }),
  );
  const pot2 = potBspResult.clone();
  const pot3 = potBspResult.clone();
  pot2.position.set(1.6, 1.9, 1.9);
  pot3.position.set(0.5, 1.73, 0.76);
  pot3.scale.set(0.75, 0.75, 0.75);
  contents.add(sideCube, hearthBspResult, cornerBspResult, chimneyCube, potBspResult, pot2, pot3);
  contents.position.set(0.1, 0, 0.2);
  room.add(ground, contents);
  room.position.set(6.5, 0.002, 0);
  houseGroup.add(room);
};

/**
 * 南屋
 * @param houseGroup
 * @param afterRender
 */
export const drawSouthRoom = (houseGroup: THREE.Group, afterRender: AfterRender) => {
  const room = new THREE.Group();
  const ground = createGround({
    width: 4,
    height: 5,
    color: 0x707170,
    img: require('@/assets/cement.png'),
  });
  gltfObjectLoader(
    'gltf/object/southBed/sceneDraco.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 0.7;
        const scale = height / max.y;
        obj.rotateY(-Math.PI);
        obj.scale.set(scale, scale, scale);
        obj.position.set(2.42, 0.68, 1.2);
        room.add(obj);
      }
    }),
  );
  room.add(ground);
  room.position.set(10.5, 0.002, 0);
  houseGroup.add(room);
};

/**
 * 瓦顶
 * @param houseGroup
 * @param afterRender
 */
export const drawTileRoof = (houseGroup: THREE.Group, afterRender: AfterRender) => {
  const trunks = new THREE.Group();
  const largeSize = { startWidth: 0.15, endWidth: 0.15 };
  const defaultSize = { startWidth: 0.1, endWidth: 0.1 };
  const baseSize = { startWidth: 0.06, endWidth: 0.06 };
  const smallSize = { startWidth: 0.04, endWidth: 0.04 };
  const height = 3;
  const addHeight = 2;
  const maxHeight = height + addHeight;
  const trunksPart = new THREE.Group();
  [
    {
      ...largeSize,
      startPosition: { x: 0, y: height, z: 0 },
      endPosition: { x: 2.6, y: maxHeight, z: 0 },
    },
    {
      ...largeSize,
      startPosition: { x: 5, y: height, z: 0 },
      endPosition: { x: 2.4, y: maxHeight, z: 0 },
    },
    {
      ...defaultSize,
      startPosition: { x: 1.1, y: maxHeight - 1.2, z: 0 },
      endPosition: { x: 3.9, y: maxHeight - 1.2, z: 0 },
    },
    {
      ...baseSize,
      startPosition: { x: 2.5, y: maxHeight, z: 0 },
      endPosition: { x: 2.5, y: maxHeight - 1.2, z: 0 },
    },
    {
      ...smallSize,
      startPosition: { x: 1.9, y: maxHeight - 0.5, z: 0 },
      endPosition: { x: 1.9, y: maxHeight - 1.2, z: 0 },
    },
    {
      ...smallSize,
      startPosition: { x: 1.9, y: maxHeight - 0.5, z: 0 },
      endPosition: { x: 2.5, y: maxHeight - 1.2, z: 0 },
    },
    {
      ...smallSize,
      startPosition: { x: 3.1, y: maxHeight - 0.5, z: 0 },
      endPosition: { x: 3.1, y: maxHeight - 1.2, z: 0 },
    },
    {
      ...smallSize,
      startPosition: { x: 3.1, y: maxHeight - 0.5, z: 0 },
      endPosition: { x: 2.5, y: maxHeight - 1.2, z: 0 },
    },
  ].forEach(item => {
    trunksPart.add(createCylinderMesh(item));
  });
  const trunksPart2 = trunksPart.clone();
  const trunksPart3 = trunksPart.clone();
  const trunksPart4 = trunksPart.clone();
  trunksPart.position.set(0, 0, 0.2);
  trunksPart2.position.set(0, 0, 5);
  trunksPart3.position.set(0, 0, 10);
  trunksPart4.position.set(0, 0, 14.8);
  const stick = createCylinderMesh({
    ...defaultSize,
    startPosition: { x: 2.5, y: maxHeight, z: 0.2 },
    endPosition: { x: 2.5, y: maxHeight, z: 14.8 },
  });
  trunks.add(trunksPart, trunksPart2, trunksPart3, trunksPart4, stick);
  const roofs = new THREE.Group();
  gltfObjectLoader(
    'gltf/object/tileRoof/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 0.05;
        const scale = height / max.y;
        obj.scale.set(scale * 1.1, scale * 1.3, scale * 1.8);
        // obj.rotateX(Math.PI / 2);
        obj.rotateZ(Math.PI / 4.65);
        obj.position.set(1.1, 4.1, 2.5);
        const obj2 = obj.clone();
        obj2.rotateZ((-Math.PI / 4.65) * 2);
        obj2.position.set(4, 4.1, 2.5);
        const objItem = new THREE.Group();
        objItem.add(obj, obj2);
        const objItem2 = objItem.clone();
        const objItem3 = objItem.clone();
        objItem2.position.set(0, 0, 5);
        objItem3.position.set(0, 0, 10);
        roofs.add(objItem, objItem2, objItem3);
      }
    }),
  );
  houseGroup.add(trunks, roofs);
};
