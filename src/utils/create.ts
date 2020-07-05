import * as THREE from 'three';
import { TextGeometryParameters } from 'three/src/geometries/TextGeometry';
import {
  CubeProps,
  LinkProps,
  CylinderProps,
  CylinderMeshProps,
  TubeProps,
  PositionType,
  ScaleType,
} from '@/interfaces/common';
// import GLTFLoader from 'three-gltf-loader';
import { GLTF } from '@/interfaces/common';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshLambertMaterialParameters } from 'three';
import ThreeBSP from '@/utils/ThreeCSG';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export const initialCube = {
  size: { x: 10, y: 10, z: 10 },
};

export const initialColor = Math.random() * 0xffffff;

/** 创建立方体 */
export const createCube = ({ size, color, material, position }: CubeProps = initialCube) => {
  const { x, y, z } = size;
  const geometry = new THREE.BoxBufferGeometry(x, y, z);
  const mesh = new THREE.Mesh(
    geometry,
    material || new THREE.MeshLambertMaterial({ color: color || initialColor }),
  );
  if (position) {
    mesh.position.set(position.x + x / 2, position.y + y / 2, position.z + z / 2);
  } else {
    mesh.position.set(0, 0, 0);
  }
  return mesh;
};

/** 创建连线 */
export const createLink = (props: LinkProps) => {
  const { startPosition, endPosition, color = initialColor, linewidth = 1 } = props;
  const geometry = new THREE.Geometry();
  const material = new THREE.LineBasicMaterial({ color, linewidth });

  // 线的材质可以由2点的颜色决定
  geometry.vertices.push(new THREE.Vector3(startPosition.x, startPosition.y, startPosition.z));
  geometry.vertices.push(new THREE.Vector3(endPosition.x, endPosition.y, endPosition.z));

  const line = new THREE.Line(geometry, material);
  return line;
};

/** 创建锥体 */
export const createCylinder = (props: CylinderProps) => {
  const {
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    color = initialColor,
    basePosition,
  } = props;
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
  const material = new THREE.MeshLambertMaterial({ color });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.set(basePosition.x, height / 2, basePosition.z);
  return cylinder;
};

const loader = new THREE.TextureLoader();
const groundTexture = loader.load(require('@/assets/tree-01.jpg'));
// const rMap = loader.load('@/assets/lavatile.jpg');
// rMap.wrapS = THREE.RepeatWrapping;
// rMap.wrapT = THREE.RepeatWrapping;
// rMap.repeat.set(2, 1);

export const createCylinderMesh = function(props: CylinderMeshProps) {
  const { startPosition, endPosition, startWidth = 0.2, endWidth = 0.6 } = props;
  const vectorStartPoint = new THREE.Vector3(startPosition.x, startPosition.y, startPosition.z);
  const vectorEndPoint = new THREE.Vector3(endPosition.x, endPosition.y, endPosition.z);
  const direction = new THREE.Vector3().subVectors(vectorEndPoint, vectorStartPoint);
  const arrowDirection = direction.clone();
  const arrow = new THREE.ArrowHelper(arrowDirection.normalize(), vectorStartPoint);
  const edgeGeometry = new THREE.CylinderGeometry(startWidth, endWidth, direction.length(), 6, 4);

  // 添加树的纹理
  const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
  const edge = new THREE.Mesh(edgeGeometry, groundMaterial);

  edge.rotation.copy(arrow.rotation);
  const position = new THREE.Vector3().addVectors(vectorStartPoint, direction.multiplyScalar(0.5));
  edge.position.set(position.x, position.y, position.z);
  return edge;
};

export const createTube = (props: TubeProps) => {
  const {
    startPosition,
    endPosition,
    segments = 20,
    radius,
    radiusSegments = 10,
    closed = false,
  } = props;
  const startPoint = new THREE.Vector3(startPosition.x, startPosition.y, startPosition.z);
  const endPoint = new THREE.Vector3(endPosition.x, endPosition.y, endPosition.z);
  // 创建中心偏移节点 生成曲线
  const centerPoint = new THREE.Vector3(
    startPosition.x + (endPosition.x - startPosition.x) / 2 + 0.5,
    startPosition.y + (endPosition.y - startPosition.y) / 2 - 0.3,
    startPosition.z + (endPosition.z - startPosition.z) / 2 + 0.5,
  );
  const geometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([startPoint, centerPoint, endPoint]),
    segments,
    radius,
    radiusSegments,
    closed,
  );
  // 添加树的纹理
  const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
  const mesh = new THREE.Mesh(geometry, groundMaterial);
  return mesh;
};

interface TextOptionProps extends TextGeometryParameters {
  text: string;
  color?: number;
}

const font: THREE.Font | null = null;
// const fontLoader = new THREE.FontLoader();

export const initFont = (callBack: (response: THREE.Font) => void) => {
  if (font) {
    callBack(font);
  } else {
    // const font = fontLoader.parse(require('@/assets/gl/font/PingFang_SC_Regular.json'));
    // callBack(font);
    // fontLoader.load(
    //   'https://ais-pace.oss-cn-hangzhou.aliyuncs.com/PingFang_SC_Regular.json',
    //   response => {
    //     font = response;
    //     callBack(font);
    //   },
    // );
  }
};

export const createFont = (
  option: TextOptionProps,
  callBack?: (result: THREE.Object3D) => void,
) => {
  const { text, size = 3, height = 0.1, color = 0xff0000 } = option;
  initFont(font => {
    const geometry = new THREE.TextGeometry(text, {
      font,
      size,
      height,
      curveSegments: 6,
      bevelThickness: 1,
      bevelSize: 1,
      bevelEnabled: false,
    });
    const textMaterial = new THREE.MeshPhongMaterial({ color, specular: 0xffffff });
    const mesh = new THREE.Mesh(geometry, textMaterial);
    if (callBack && typeof callBack === 'function') {
      callBack(mesh);
    }
  });
};

export interface ColorGroundProps {
  width: number;
  height: number;
  position?: PositionType;
  scale?: ScaleType;
  color?: number;
  img?: string;
  repeatU?: number;
  repeatV?: number;
  material?: THREE.Material;
}
/**
 * 创建色彩地板（坐标中心点自动转移到左上角）
 * @param props
 */
export const createGround = (props: ColorGroundProps) => {
  const {
    width,
    height,
    position = { x: 0, y: 0.001, z: 0 },
    scale = { x: 1, y: 1, z: 1 },
    color = Math.random() * 0xffffff,
    img,
    repeatU = 1,
    repeatV = 1,
    material,
  } = props;
  let materialConfig: MeshLambertMaterialParameters = { color };
  if (img) {
    const imgGround = loader.load(img);
    imgGround.wrapS = THREE.RepeatWrapping;
    imgGround.wrapT = THREE.RepeatWrapping;
    imgGround.repeat.set(repeatU, repeatV);
    materialConfig = { map: imgGround };
  }
  const ground = new THREE.Mesh(
    new THREE.BoxBufferGeometry(width, height, 0.4),
    material || new THREE.MeshLambertMaterial(materialConfig),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(position.x + width / 2, position.y - 0.2, position.z + height / 2);
  ground.scale.set(scale.x, scale.y, scale.z);
  ground.castShadow = true;
  ground.receiveShadow = true;
  return ground;
};

export interface WallMatProps {
  u?: number;
  v?: number;
  mapTexture: THREE.Texture;
  bumpMapTexture: THREE.Texture;
}
export const getWallMat = (props: WallMatProps) => {
  const { u = 2, v = 2 } = props;
  const mapTexture = props.mapTexture.clone();
  const bumpMapTexture = props.bumpMapTexture.clone();
  mapTexture.needsUpdate = true;
  bumpMapTexture.needsUpdate = true;
  mapTexture.wrapS = THREE.RepeatWrapping;
  mapTexture.wrapT = THREE.RepeatWrapping;
  mapTexture.repeat.set(u, v);
  bumpMapTexture.wrapS = THREE.RepeatWrapping;
  bumpMapTexture.wrapT = THREE.RepeatWrapping;
  bumpMapTexture.repeat.set(u, v);
  const wallMat = new THREE.MeshPhysicalMaterial({
    map: mapTexture,
    bumpMap: bumpMapTexture,
    bumpScale: 0.3, // 凹凸贴图会对材质产生多大影响
    reflectivity: 0.2, // 反射度
  });
  wallMat.roughness = 1;
  wallMat.roughness = 0.6;
  return wallMat;
};

export const whiteWallMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd });

/**
 * 创建墙
 * @param props
 */
export interface BspConfig {
  geometry: THREE.Geometry;
  position: PositionType;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
}
export interface WallProps {
  width: number;
  height: number;
  depth?: number;
  position?: PositionType;
  insideIndex?: number[]; // 内部的索引 0=s 1=n 2=上 3=下 4=w 5=e
  withRoot?: boolean;
  mapTexture: THREE.Texture;
  bumpMapTexture: THREE.Texture;
  bspConfig?: BspConfig;
}
export const createWall = (props: WallProps) => {
  const {
    width,
    height,
    depth = 0.2,
    position = { x: 0, y: 0, z: 0 },
    insideIndex = [],
    withRoot = true,
    mapTexture,
    bumpMapTexture,
    bspConfig,
  } = props;
  const isHorizontal = width < 1 ? false : true;
  const rootHeight = 0.4;
  const getTransPosition = (width: number, height: number, depth: number) => ({
    x: position.x + width / 2,
    y: position.y + height / 2,
    z: position.z + depth / 2,
  });
  const geometry = new THREE.BoxBufferGeometry(width, height, depth);
  const mats: THREE.Material[] = [];
  const rootMats: THREE.Material[] = [];
  const lime = new THREE.MeshLambertMaterial({ color: 0x535552 });
  geometry.groups.forEach((_v, index) => {
    const isTopOrBottom = [2, 3].includes(index);
    const getWallMatWithHeight = (height: number) =>
      isHorizontal
        ? getWallMat({
            u: [0, 1].includes(index) ? depth / 2 : width / 2,
            v: isTopOrBottom ? depth / 2 : height / 2,
            mapTexture,
            bumpMapTexture,
          })
        : getWallMat({
            u: [2, 3, 4, 5].includes(index) ? width / 2 : depth / 2,
            v: isTopOrBottom ? depth / 2 : height / 2,
            mapTexture,
            bumpMapTexture,
          });
    if (insideIndex.includes(index)) {
      mats.push(whiteWallMaterial);
      rootMats.push(lime);
    } else {
      mats.push(getWallMatWithHeight(height));
      if (isTopOrBottom) {
        rootMats.push(lime);
      } else {
        rootMats.push(getWallMatWithHeight(rootHeight));
      }
    }
  });
  const wall = new THREE.Mesh(geometry, mats);
  wall.castShadow = true;
  wall.receiveShadow = true;
  const wallPosition = getTransPosition(width, height, depth);
  wall.position.set(wallPosition.x, wallPosition.y, wallPosition.z);
  const wallGroup = new THREE.Group();
  wallGroup.add(bspConfig ? bspMesh(wall, [bspConfig]) : wall);
  if (withRoot) {
    const rootPosition = getTransPosition(width, rootHeight, depth);
    const rootGeometry = new THREE.BoxBufferGeometry(width, rootHeight, depth);
    const root = new THREE.Mesh(rootGeometry, rootMats);
    root.position.set(rootPosition.x, rootPosition.y, rootPosition.z);
    root.scale.set(isHorizontal ? 1.02 : 1.5, 1, isHorizontal ? 1.5 : 1);
    wallGroup.add(bspConfig ? bspMesh(root, [bspConfig]) : root);
  }
  return wallGroup;
};

/**
 * 用threeBSP处理mesh
 * @param mesh
 * @param bspConfig
 */
export const bspMesh = (
  mesh: THREE.Mesh,
  bspConfigs: BspConfig[],
  material?: THREE.Material | THREE.Material[],
) => {
  const wireFrameMat = new THREE.MeshBasicMaterial({ opacity: 0, wireframeLinewidth: 0.5 });
  wireFrameMat.wireframe = true;
  wireFrameMat.wireframe = true;
  const oldBSP = new ThreeBSP(transBufferGeometryMesh(mesh));
  // 支持减去多个地方
  let oldResultBSP = oldBSP;
  bspConfigs.forEach(({ geometry, position, rotateX, rotateY, rotateZ }) => {
    const subMesh = new THREE.Mesh(geometry, wireFrameMat);
    subMesh.position.set(position.x, position.y, position.z);
    if (rotateX) {
      subMesh.rotateX(rotateX);
    }
    if (rotateY) {
      subMesh.rotateY(rotateY);
    }
    if (rotateZ) {
      subMesh.rotateZ(rotateZ);
    }
    const subBSP = new ThreeBSP(subMesh);
    oldResultBSP = oldResultBSP['subtract'](subBSP);
  });
  const result = oldResultBSP['toMesh'](material);
  result.castShadow = true;
  result.receiveShadow = true;
  result.material = material || mesh.material;
  result.geometry.computeFaceNormals();
  result.geometry.computeVertexNormals();
  return result;
};

/**
 * BufferGeometry mesh to Geometry mesh
 * @param mesh
 */
export const transBufferGeometryMesh = (mesh: THREE.Mesh) => {
  if (/BufferGeometry/.test(mesh.geometry.type)) {
    const geo = new THREE.Geometry();
    geo.fromBufferGeometry(mesh.geometry as THREE.BufferGeometry);
    mesh.geometry = geo;
  }
  return mesh;
};

/**
 * 创建网格地板
 */
export const createGridGround = () => {
  const grid = new THREE.GridHelper(200, 20, 0x000000, 0x000000);
  if (!Array.isArray(grid.material)) {
    grid.material.opacity = 0.3;
    grid.material.transparent = true;
  }
  return grid;
};

/**
 * 显示加载过程
 * @param param0
 */
const addLoadingTips = ({
  tips,
  loaded,
  total,
  type,
}: {
  tips: string;
  loaded?: number;
  total?: number;
  type: 'start' | 'process' | 'endWithSuccess' | 'endWithError';
}) => {
  const loadingTips = document.getElementById('loadingTips');
  if (loadingTips) {
    document.body.removeChild(loadingTips);
  }
  if (!document.getElementById('loadingMask')) {
    const loadingMask = document.createElement('div');
    loadingMask.setAttribute('id', 'loadingMask');
    const loadingMaskStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      background: 'rgba(0,0,0,0.5)',
    };
    document.getElementById('root')!.style.filter = 'blur(1px)';
    Object.keys(loadingMaskStyle).forEach(key => {
      loadingMask.style[key] = loadingMaskStyle[key];
    });
    document.body.appendChild(loadingMask);
  }
  const newLoadingTips = document.createElement('div');
  newLoadingTips.setAttribute('id', 'loadingTips');
  const tipStyle = {
    position: 'fixed',
    width: '400px',
    bottom: '50px',
    left: '50px',
    background: 'rgba(0,0,0,0.2)',
    padding: '20px',
    color: '#fff',
  };
  Object.keys(tipStyle).forEach(key => {
    newLoadingTips.style[key] = tipStyle[key];
  });
  newLoadingTips.innerHTML = `
  <div style="width: 100%;">
    <div style="font-size: 14px; font-weight: 500; margin-bottom: 16px; overflow-x: hidden;">${tips}</div>
    <div style="width: 100%; height: 20px; background: rgba(255,255,255,0.3); margin-bottom: 16px;"><div style="width: ${(loaded! /
      total!) *
      100}%; height: 100%; background: rgba(255,255,255,0.7);"></div></div>
  </div>
  `;
  document.body.appendChild(newLoadingTips);
  if (['endWithSuccess', 'endWithError'].includes(type)) {
    setTimeout(() => {
      const loadingTips = document.getElementById('loadingTips');
      const loadingMask = document.getElementById('loadingMask');
      loadingTips && document.body.removeChild(loadingTips);
      loadingMask && document.body.removeChild(loadingMask);
      document.getElementById('root')!.style.filter = '';
    }, 500);
  }
};

/**
 * 模型加载监控
 */
const manager = new THREE.LoadingManager();
manager.onStart = (url, itemsLoaded, itemsTotal) => {
  addLoadingTips({
    tips:
      'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.',
    loaded: itemsLoaded,
    total: itemsTotal,
    type: 'start',
  });
};
manager.onLoad = () => {
  addLoadingTips({
    tips: 'Loading complete!',
    type: 'endWithSuccess',
  });
};
manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  addLoadingTips({
    tips: 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.',
    loaded: itemsLoaded,
    total: itemsTotal,
    type: 'start',
  });
};
manager.onError = url => {
  addLoadingTips({
    tips: 'There was an error loading ' + url,
    type: 'endWithError',
  });
};

/**
 * gltf 类型的对象加载
 * @param url
 * @param callBack
 */
const gltfLoader = new GLTFLoader(manager);
// Draco 解码库
const dracoLoader = new DRACOLoader();
/** GitHub中使用 */
dracoLoader.setDecoderPath('/myHome3D/draco/gltf/');
/** 开发环境使用 */
// dracoLoader.setDecoderPath('/draco/gltf/');
dracoLoader.setDecoderConfig({ type: 'js' });
dracoLoader.preload();

gltfLoader.setDRACOLoader(dracoLoader);
export const gltfObjectLoader = (url: string, callBack: (gltf: GLTF) => void) => {
  gltfLoader.load(url, (gltf: GLTF) => callBack(gltf));
};

export interface CreateWallWidthWIndowProps {
  width: number;
  height: number;
  insideIndex: number[];
  withRoot?: boolean;
  windowWidth?: number;
  windowHeight?: number;
  offsetX?: number;
  offsetY?: number;
  mapTexture: THREE.Texture;
  bumpMapTexture: THREE.Texture;
  windowGroup?: THREE.Group;
}
/**
 * 创建含自定义窗口或门的墙
 * @param param0
 */
export const createWallWidthWindow = ({
  width,
  height,
  insideIndex,
  withRoot = false,
  windowWidth = 1,
  windowHeight = 1,
  offsetX,
  offsetY,
  mapTexture,
  bumpMapTexture,
  windowGroup,
}: CreateWallWidthWIndowProps) => {
  const wallGroup = new THREE.Group();
  offsetX = offsetX === undefined ? (width - windowWidth) / 2 : offsetX;
  offsetY = offsetY === undefined ? (height - windowHeight) / 2 : offsetY;
  const wall_1 = createWall({
    width: windowWidth,
    height: offsetY,
    depth: 0.2,
    position: { x: offsetX, y: 0, z: 0 },
    insideIndex,
    withRoot,
    mapTexture,
    bumpMapTexture,
  });
  const wall_2 = createWall({
    width: windowWidth,
    height: height - windowHeight - offsetY,
    depth: 0.2,
    position: { x: offsetX, y: offsetY + windowHeight, z: 0 },
    insideIndex,
    withRoot: false,
    mapTexture,
    bumpMapTexture,
  });
  const wall_3 = createWall({
    width: offsetX,
    height,
    depth: 0.2,
    position: { x: 0, y: 0, z: 0 },
    insideIndex,
    withRoot,
    mapTexture,
    bumpMapTexture,
  });
  const wall_4 = createWall({
    width: width - offsetX - windowWidth,
    height,
    depth: 0.2,
    position: { x: offsetX + windowWidth, y: 0, z: 0 },
    insideIndex,
    withRoot,
    mapTexture,
    bumpMapTexture,
  });
  if (windowGroup) {
    const windowGroupClone = windowGroup.clone();
    windowGroupClone.position.set(
      offsetX + windowWidth / 2 - 0.01,
      offsetY + windowHeight / 2,
      0.13,
    );
    wallGroup.add(windowGroupClone);
  }
  wallGroup.add(wall_2, wall_3, wall_4);
  if (offsetY > 0) {
    wallGroup.add(wall_1);
  }
  return wallGroup;
};
