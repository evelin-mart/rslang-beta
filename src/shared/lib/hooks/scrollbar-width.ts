import * as React from 'react';

export const useScrollbarWidth = () => {
  const hasScrollBar = window.innerWidth > document.body.clientWidth;
  const didCompute = React.useRef(false);
  const widthRef = React.useRef(0);

  if (didCompute.current) return {
    hasScrollBar,
    scrollbarWidth: widthRef.current,
  };

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);

  didCompute.current = true;
  widthRef.current = scrollbarWidth;

  return {
    hasScrollBar,
    scrollbarWidth,
  };
};
