import { DomInfoType } from '@/interfaces/common';

/** 获取载体相对与窗口的坐标 宽高等信息 */
export const getDomInfo = (dom: HTMLElement) => {
  if (!dom) {
    return {};
  }
  function getScrollTop(obj: HTMLElement) {
    let tmp = obj.scrollTop;
    let val = obj.parentElement;
    while (val !== null) {
      tmp += val.scrollTop;
      val = val.parentElement;
    }
    return tmp;
  }
  function getScrollLeft(obj: HTMLElement) {
    let tmp = obj.scrollLeft;
    let val = obj.parentElement;
    while (val !== null) {
      tmp += val.scrollLeft;
      val = val.parentElement;
    }
    return tmp;
  }
  const domInfo: DomInfoType = {
    x: dom.offsetLeft - getScrollLeft(dom),
    y: dom.offsetTop - getScrollTop(dom),
    width: dom.clientWidth,
    height: dom.clientHeight,
  };
  return domInfo;
};

