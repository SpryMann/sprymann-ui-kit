import { RefObject, useRef, useState } from 'react';

import getRefValue from '../../helpers/getRefValue';
import getTouchEventData from '../../helpers/getTouchEventData';
import useStateRef from '../../hooks/useStateRef';

const MIN_SWIPE_REQUIRED = 40;

const useSlider = (): [
  number,
  boolean,
  (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => void,
  RefObject<HTMLDivElement>
] => {
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const onTouchMove = (event: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(event).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef);

    if (newOffsetX >= maxOffsetX) {
      newOffsetX = 0;
    }

    if (newOffsetX <= minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const onTouchEnd = () => {
    const containerWidth = getRefValue(containerWidthRef);
    const currentOffsetX = getRefValue(currentOffsetXRef);
    let newOffsetX = getRefValue(offsetXRef);
    const diff = currentOffsetX - newOffsetX;

    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (diff > 0) {
        newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
      }

      if (diff < 0) {
        newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
      }
    } else {
      newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
    }

    setIsSwiping(false);
    setOffsetX(newOffsetX);

    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  const onTouchStart = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsSwiping(true);
    currentOffsetXRef.current = getRefValue(offsetXRef);
    startXRef.current = getTouchEventData(event).clientX;

    const containerElement = getRefValue(containerRef);
    const containerWidth = containerElement.offsetWidth;
    containerWidthRef.current = containerWidth;
    minOffsetXRef.current = containerWidth - containerElement.scrollWidth;

    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };

  return [offsetX, isSwiping, onTouchStart, containerRef];
};

export default useSlider;
