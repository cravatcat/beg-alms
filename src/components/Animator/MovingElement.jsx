import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function MovingElement({ value, fromPos, toPos, elementRefs }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const fromElement = elementRefs.current[fromPos];
    const toElement = elementRefs.current[toPos];

    if (!fromElement || !toElement || !elementRef.current) return;

    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    const element = elementRef.current;

    // 设置初始位置（相对于视口）
    element.style.position = 'fixed';
    element.style.left = fromRect.left + 'px';
    element.style.top = fromRect.top + 'px';
    element.style.width = fromRect.width + 'px';
    element.style.height = fromRect.height + 'px';
    element.style.zIndex = '1000';
    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    element.style.pointerEvents = 'none';

    // 开始动画
    requestAnimationFrame(() => {
      element.style.left = toRect.left + 'px';
      element.style.top = toRect.top + 'px';
    });
  }, [fromPos, toPos, elementRefs]);

  // 使用 Portal 渲染到 body，完全避免影响页面布局
  return createPortal(
    <div
      ref={elementRef}
      className="bg-green-400 text-white font-bold rounded-lg flex items-center justify-center shadow-lg border-2 border-green-500"
    >
      {value}
    </div>,
    document.body
  );
}