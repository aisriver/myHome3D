import * as THREE from 'three';
import { PositionType, DomInfoType, SizeType } from '@/interfaces/common';

export interface GetOffsetPositionProps {
  startPosition: PositionType; // 开始位置
  length: number; // 移动长度
  rate: number; // 相对y轴偏移角度
  maxNumber: number; // 新节点 最多拆分个数
  index: number; // 当前获取第几个节点的位置 从0开始
  sameHeight?: boolean; // 是否保持同级节点高度相同 默认true
}

/** 获取圆中另一个坐标的绝对值 */
export const getAbsZ = (r: number, x: number) => Math.sqrt(r * r - x * x);

/** 获取分布的偏移坐标 */
export const getOffsetPosition = (props: GetOffsetPositionProps) => {
  const { startPosition, length, rate, maxNumber, index, sameHeight = true } = props;
  let rl: number;
  let vl: number;
  // 统一分支高度
  if (sameHeight) {
    vl = length;
    rl = Math.tan(((2 * Math.PI) / 360) * rate) * vl;
  } else {
    // 统一分支长度
    rl = Math.sin(((2 * Math.PI) / 360) * rate) * length;
    vl = Math.cos(((2 * Math.PI) / 360) * rate) * length;
  }
  const p1 = { ...startPosition, y: startPosition.y + vl };
  const relativeRate = (360 / maxNumber) * index;
  let relativeX: number;
  let relativeZ: number;
  if (relativeRate >= 0 && relativeRate <= 180) {
    relativeX = rl - (relativeRate * rl) / 90;
    relativeZ = getAbsZ(rl, relativeX);
  }
  if (relativeRate > 180 && relativeRate <= 360) {
    relativeX = (relativeRate * rl) / 90 - 3 * rl;
    relativeZ = -getAbsZ(rl, relativeX);
  }
  return {
    ...p1,
    x: p1.x + relativeX!,
    z: p1.z + relativeZ!,
  };
};

/** 获取单位向量坐标 */
export const getUnitVectorPosition = (startPosition: PositionType, endPosition: PositionType) => {
  // 向量
  const l = {
    x: endPosition.x - startPosition.x,
    y: endPosition.y - startPosition.y,
    z: endPosition.z - startPosition.z,
  };
  // 单位向量
  const n = Math.sqrt(l.x * l.x + l.y * l.y + l.z * l.z);
  return {
    x: l.x / n,
    y: l.y / n,
    z: l.z / n,
  };
};

/** 获取任意方向的直行坐标 */
export const getStraightPosition = (
  startPosition: PositionType,
  endPosition: PositionType,
  length: number,
) => {
  const m = getUnitVectorPosition(startPosition, endPosition);
  // 直行坐标
  return {
    x: m.x * length + endPosition.x,
    y: m.y * length + endPosition.y,
    z: m.z * length + endPosition.z,
  };
};

export interface GetNodePositionPropsType {
  level: number;
  index: number;
  treeHeight: number;
  startPosition: PositionType;
  endPosition: PositionType;
  branchLength: number;
  nodeNum: number;
}

/** 获取当前节点的位置 */
export const getNodePosition = (props: GetNodePositionPropsType) => {
  const { level, index, startPosition, endPosition, branchLength, nodeNum } = props;
  // 分支越多角度越大
  let rate = nodeNum * 10 - 10;
  if (rate > 90) {
    rate = 90;
  }
  if (rate < 15) {
    rate = 15;
  }
  if (nodeNum === 1) {
    rate = 0;
  }
  return getOffsetPosition({
    startPosition: level === 2 ? startPosition : endPosition,
    length: branchLength,
    rate,
    maxNumber: nodeNum,
    index,
  });
};

/** 更改对象中心点 */
export const changeCenterPoint = (x: number, y: number, z: number, obj: THREE.Object3D) => {
  const wrapper = new THREE.Object3D();
  wrapper.position.set(x, y, z);
  wrapper.add(obj);
  obj.position.set(-x, -y, -z);
  return wrapper;
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
  const vector = mesh
    .localToWorld(new THREE.Vector3(position.x, position.y, position.z))
    .project(camera);
  const widthHalf = domInfo.width! / 2;
  const heightHalf = domInfo.height! / 2;
  vector.x = vector.x * widthHalf + widthHalf;
  vector.y = -(vector.y * heightHalf) + heightHalf;

  return {
    x: vector.x + domInfo.x!,
    y: vector.y + domInfo.y!,
  };
};

/**
 * 获取物体转换后的位置
 * @param position
 * @param size
 */
export const getObjectPositionBySize = (position: PositionType, size: SizeType) => {
  return {
    x: position.x + size.x / 2,
    y: position.y + size.y / 2,
    z: position.z + size.z / 2,
  };
};
