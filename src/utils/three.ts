import * as THREE from 'three';
import { TextGeometryParameters } from 'three/src/geometries/TextGeometry';
import { DomInfoType } from '@/interfaces/common';
// import { PositionType } from '@/components/DataTree/interfaces/common';

interface TextOptionProps extends TextGeometryParameters {
  text: string;
  color?: number;
}

let font: THREE.Font | null = null;
const fontLoader = new THREE.FontLoader();

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

interface TransPositionPropsType {
  obj: THREE.Mesh | THREE.Object3D;
  camera: THREE.Camera;
  domInfo: DomInfoType;
}

/** 从webgl坐标反向映射出屏幕坐标 */
export const toWindowPosition = (props: TransPositionPropsType) => {
  const { obj, camera, domInfo } = props;
  const { position } = obj;
  const mesh = new THREE.Mesh();
  let vector = mesh
    .localToWorld(new THREE.Vector3(position.x, position.y, position.z))
    .project(camera);
  var widthHalf = domInfo.width! / 2;
  var heightHalf = domInfo.height! / 2;
  vector.x = vector.x * widthHalf + widthHalf;
  vector.y = -(vector.y * heightHalf) + heightHalf;

  return {
    x: vector.x + domInfo.x!,
    y: vector.y + domInfo.y!,
  };
};

/**
 * 对Object3D设置目标属性
 * @param obj
 * @param params
 */
export const setObjectParams = (obj: THREE.Object3D, params: object) => {
  Object.keys(params).forEach(key => {
    obj[key] = params[key];
  });
};

/**
 * 递归对所有子Object3D设置目标属性
 * @param scene
 * @param params
 */
export const deepSetParamsToScene = (scene: THREE.Scene, params: object) => {
  setObjectParams(scene, params);
  const deepSet = (children: THREE.Object3D[]) => {
    if (children.length > 0) {
      children.forEach(item => {
        setObjectParams(item, params);
        deepSet(item.children);
      });
    }
  };
  deepSet(scene.children);
};
