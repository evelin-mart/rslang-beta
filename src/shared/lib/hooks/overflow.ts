import React from 'react';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { setBodyOverflow } from 'shared/lib/store/ui';

export const useOverflowObserver = () => {
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    const targetNode = document.body;
    const config = { attributeFilter: ['style'] };
    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        const body = mutation.target;
        if (body instanceof HTMLBodyElement) {

          const hasScrollBar = document.body.scrollHeight > window.innerHeight;
          // const isOverflow = /overflow:[ ]*hidden/.test(body.getAttribute('style') || '');
          const computedStyles = getComputedStyle(body);
          dispatch(setBodyOverflow(computedStyles.overflow === 'hidden' && hasScrollBar));
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    return () => {
      observer.disconnect();
    }
  }, [dispatch]);
}