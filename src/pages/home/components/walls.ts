import * as THREE from 'three';
import {
  createWall,
  createWallWidthWindow,
  gltfObjectLoader,
  bspMesh,
  createCube,
  getWallMat,
  whiteWallMaterial,
} from '@/utils/create';
import { AfterRender } from './rooms';
import { getObjectPositionBySize } from '@/utils/position';
import { cementMaterial } from '..';

/**
 * 墙
 * @param houseGroup
 * @param afterRender
 */
export const drawWalls = (houseGroup: THREE.Group, afterRender: AfterRender) => {
  const wallGroup = new THREE.Group();
  const nHeight = 3;
  const sHeight = 2.5;
  const doorHeight = 1.8;
  const wallHeight = 2;
  const windowGroup = new THREE.Group();
  gltfObjectLoader(
    'gltf/object/windowFrame/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 1;
        const scale = height / max.y;
        obj.rotateY(Math.PI / 2);
        obj.scale.set(scale, scale / 1.9, scale);
        windowGroup.add(obj);
      }
    }),
  );
  gltfObjectLoader(
    'gltf/object/fence/scene.gltf',
    afterRender(gltf => {
      const obj = gltf.scene;
      const box = new THREE.Box3().setFromObject(obj);
      const { max } = box;
      if (!isNaN(max.y)) {
        const height = 0.5;
        const scale = height / max.y;
        obj.scale.set(scale, scale, scale);
        windowGroup.add(obj);
      }
    }),
  );
  new THREE.TextureLoader().load(require('@/assets/brick_diffuse.jpg'), mapTexture => {
    new THREE.TextureLoader().load(require('@/assets/brick_bump.jpg'), bumpMapTexture => {
      const textureObj = { mapTexture, bumpMapTexture };
      // east
      const e1 = createWall({ width: 5, height: nHeight, insideIndex: [4], ...textureObj });
      const material = cementMaterial.clone();
      const e1_1 = createCube({
        size: { x: 5.2, y: 2.5, z: 0.2 },
        material,
      });
      e1_1.position.set(2.6, nHeight + 2.5 / 2, 0 + 0.2 / 2);
      const e1_1SubArr = [
        {
          size: { x: 8, y: 8, z: 0.2 },
          position: { x: 1.4, y: nHeight + 1, z: 0 },
          rotateZ: Math.PI / 3.5,
        },
        {
          size: { x: 8, y: 8, z: 0.2 },
          position: { x: 1.4 - 5.8, y: nHeight + 1, z: 0 },
          rotateZ: -Math.PI / 3.5,
        },
      ];
      const e1_1BspResult = bspMesh(e1_1, [
        ...e1_1SubArr.map(item => ({
          ...item,
          geometry: new THREE.BoxGeometry(item.size.x, item.size.y, item.size.z),
          position: getObjectPositionBySize(item.position, item.size),
        })),
      ]);
      e1_1BspResult.material = getWallMat({
        u: 5 / 2,
        v: 2.5 / 2,
        mapTexture,
        bumpMapTexture,
      });
      const triangleWall = new THREE.Group();
      e1_1BspResult.scale.set(1, 1, 0.5);
      const e1_1BspCopy = e1_1BspResult.clone();
      e1_1BspCopy.position.set(2.6, 4.2, 0.15);
      e1_1BspCopy.material = whiteWallMaterial;
      triangleWall.add(e1_1BspResult, e1_1BspCopy);
      const e2 = createWall({
        width: 5.5,
        height: sHeight,
        position: { x: 5, y: 0, z: 0 },
        insideIndex: [4],
        withRoot: false,
        ...textureObj,
      });
      const e3 = createWall({
        width: 4,
        height: sHeight,
        position: { x: 10.5, y: 0, z: 0 },
        insideIndex: [4],
        withRoot: false,
        ...textureObj,
      });
      const e4Group = new THREE.Group();
      const e4_1 = createWallWidthWindow({
        width: 2.5,
        height: sHeight,
        insideIndex: [5],
        withRoot: false,
        windowGroup,
        ...textureObj,
      });
      e4_1.position.set(0, 0, 0);
      const e4_2 = createWallWidthWindow({
        width: 1.8,
        height: sHeight,
        insideIndex: [5],
        withRoot: false,
        windowWidth: 1,
        windowHeight: 2,
        offsetX: 0.25,
        offsetY: 0,
        ...textureObj,
      });
      e4_2.position.set(2.5, 0, 0);
      e4Group.add(e4_1, e4_2);
      e4Group.position.set(6.4, 0, 5);
      const e5Group = e4Group.clone();
      e5Group.scale.set(-1, 1, 1);
      e5Group.position.set(14.5, 0, 5);
      // north
      const northWall = createWall({
        width: 0.2,
        height: nHeight + 0.2,
        depth: 5,
        insideIndex: [0],
        ...textureObj,
      });
      const n1 = northWall;
      const n2 = northWall.clone();
      n2.position.set(0, 0, 5);
      const n3 = northWall.clone();
      n3.position.set(0, 0, 10);
      // wast
      const w1 = createWall({
        width: 5,
        height: nHeight,
        position: { x: 0, y: 0, z: 15 },
        insideIndex: [5],
        ...textureObj,
      });
      const w2 = createWall({
        width: 9.5,
        height: wallHeight,
        position: { x: 5, y: 0, z: 15 },
        withRoot: false,
        ...textureObj,
      });
      const wTriangleWall = triangleWall.clone();
      wTriangleWall.scale.set(1, 1, -1);
      wTriangleWall.position.set(0, 0, 15.2);
      // south
      // const s1 = createWall({
      //   width: 0.2,
      //   height: sHeight,
      //   depth: 5,
      //   position: { x: 14.3, y: 0, z: 0 },
      //   insideIndex: [1],
      //   withRoot: false,
      //   ...textureObj,
      // });
      const s1 = createWallWidthWindow({
        width: 5,
        height: sHeight,
        insideIndex: [5],
        withRoot: false,
        windowGroup,
        ...textureObj,
      });
      s1.rotateY(Math.PI / 2);
      s1.position.set(14.3, 0, 5);
      const southInside1 = createWall({
        width: 0.2,
        height: sHeight,
        depth: 5,
        position: { x: 6.4, y: 0, z: 0 },
        insideIndex: [0],
        withRoot: false,
        ...textureObj,
      });
      const southInside2 = createWall({
        width: 0.2,
        height: sHeight,
        depth: 5,
        position: { x: 10.5, y: 0, z: 0 },
        insideIndex: [0, 1],
        withRoot: false,
        ...textureObj,
      });
      const s2 = createWall({
        width: 0.2,
        height: wallHeight,
        depth: 0.5,
        position: { x: 14.3, y: 0, z: 5 },
        withRoot: false,
        bspConfig: {
          geometry: new THREE.BoxGeometry(0.3, 0.2, 0.2),
          position: { x: 14.4, y: 0.1, z: 5.25 },
        },
        ...textureObj,
      });
      const s3 = createWall({
        width: 0.2,
        height: wallHeight,
        depth: 5.5,
        position: { x: 14.3, y: 0, z: 9.5 },
        withRoot: false,
        ...textureObj,
      });
      const s4 = createWallWidthWindow({
        width: 5.2,
        height: nHeight,
        insideIndex: [5],
        withRoot: true,
        windowGroup,
        ...textureObj,
      });
      s4.rotateY(Math.PI / 2);
      s4.position.set(5, 0, 5.2);
      const s6 = s4.clone();
      s6.position.set(5, 0, 15.2);
      const s5 = createWallWidthWindow({
        width: 5.2,
        height: nHeight,
        insideIndex: [5],
        withRoot: true,
        windowWidth: 2,
        windowHeight: 2,
        offsetX: 1.5,
        offsetY: 0,
        ...textureObj,
      });
      s5.rotateY(Math.PI / 2);
      s5.position.set(5, 0, 10);
      // inside
      const inside1_1 = createWall({
        width: 3,
        height: nHeight,
        position: { x: 0, y: 0, z: 5 },
        insideIndex: [0, 4, 5],
        ...textureObj,
      });
      const inside1_2 = createWall({
        width: 1,
        height: nHeight,
        position: { x: 4, y: 0, z: 5 },
        insideIndex: [1, 4, 5],
        ...textureObj,
      });
      const inside1_3 = createWall({
        width: 1,
        height: nHeight - doorHeight,
        position: { x: 3, y: doorHeight, z: 5 },
        insideIndex: [3, 4, 5],
        withRoot: false,
        ...textureObj,
      });
      const entryWall1_1 = createWall({
        width: 0.5,
        height: sHeight,
        position: { x: 11.5, y: 0, z: 5.5 },
        withRoot: false,
        ...textureObj,
      });
      const entryWall1_2 = createWall({
        width: 1.5,
        height: sHeight,
        position: { x: 13, y: 0, z: 5.5 },
        withRoot: false,
        ...textureObj,
      });
      const entryWall1_3 = createWall({
        width: 3,
        height: 0.5,
        position: { x: 11.5, y: wallHeight, z: 5.5 },
        withRoot: false,
        ...textureObj,
      });
      const entryWall2 = createWall({
        width: 3,
        height: sHeight,
        position: { x: 11.5, y: 0, z: 9.5 },
        withRoot: false,
        ...textureObj,
      });
      const entryWall3 = createWall({
        width: 0.2,
        height: 0.5,
        depth: 4,
        position: { x: 14, y: wallHeight, z: 5.5 },
        withRoot: false,
        ...textureObj,
      });
      const entryWall4_1 = createWall({
        width: 0.2,
        height: sHeight,
        depth: 0.4,
        position: { x: 14, y: 0, z: 8.5 },
        withRoot: false,
        ...textureObj,
      });
      const entryWall4_2 = createWall({
        width: 0.2,
        height: sHeight,
        depth: 0.4,
        position: { x: 14, y: 0, z: 9.1 },
        withRoot: false,
        ...textureObj,
      });
      const entryWall4_3 = createWall({
        width: 0.2,
        height: sHeight - 0.2,
        depth: 0.2,
        position: { x: 14, y: 0.2, z: 8.9 },
        withRoot: false,
        ...textureObj,
      });
      const entryWall5 = createWall({
        width: 0.2,
        height: wallHeight,
        depth: 1,
        position: { x: 14, y: 0, z: 5.5 },
        withRoot: false,
        ...textureObj,
      });
      const insideGroup = new THREE.Group().add(inside1_1, inside1_2, inside1_3);
      const insideGroup2 = insideGroup.clone();
      insideGroup2.position.set(0, 0, 5);
      wallGroup.add(
        e1,
        triangleWall,
        e2,
        e3,
        e4Group,
        e5Group,
        n1,
        n2,
        n3,
        w1,
        w2,
        wTriangleWall,
        s1,
        southInside1,
        southInside2,
        s2,
        s3,
        s4,
        s5,
        s6,
        insideGroup,
        insideGroup2,
        entryWall1_1,
        entryWall1_2,
        entryWall1_3,
        entryWall2,
        entryWall3,
        entryWall4_1,
        entryWall4_2,
        entryWall4_3,
        entryWall5,
      );
      houseGroup.add(wallGroup);
    });
  });
};
