import * as THREE from 'three';

export interface CustomLocation extends Location {
  query: {
    [x: string]: string;
  };
}

export interface PageMatchModel {
  isExact: boolean;
  params: object;
  path: string;
  url: string;
}

export interface PageBasicPropsModel {
  history: History;
  location: CustomLocation;
  match: PageMatchModel;
  children: React.ComponentType;
}

export interface MenuItemConfig {
  key: string;
  name: string;
  link?: string;
  icon: string;
  children?: MenuItemConfig[];
}

// for gl
export interface MixerType {
  update: (delta: number) => void;
}

export interface DomInfoType {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface GLTF {
  animations: THREE.AnimationClip[];
  scene: THREE.Scene;
  scenes: THREE.Scene[];
  cameras: THREE.Camera[];
  asset: object;
}

export interface SizeType {
  x: number;
  y: number;
  z: number;
}

export interface PositionType {
  x: number;
  y: number;
  z: number;
}

export interface ScaleType {
  x: number;
  y: number;
  z: number;
}

export interface CubeProps {
  size: SizeType;
  color?: number;
  material?: THREE.Material;
  position?: PositionType;
}

export interface LinkProps {
  startPosition: PositionType;
  endPosition: PositionType;
  color?: number;
  linewidth?: number;
}

export interface CylinderProps {
  radiusTop: number;
  radiusBottom: number;
  height: number;
  radialSegments: number;
  heightSegments?: number;
  openEnded?: boolean;
  thetaStart?: number;
  thetaLength?: number;
  color?: number;
  basePosition: PositionType;
}

export interface CylinderMeshProps {
  startPosition: PositionType;
  endPosition: PositionType;
  color?: number;
  startWidth?: number;
  endWidth?: number;
}

export interface TubeProps {
  startPosition: PositionType;
  endPosition: PositionType;
  segments?: number;
  radius: number;
  radiusSegments?: number;
  closed?: boolean;
  color?: number;
}
