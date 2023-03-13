import { RefObject, useRef, useState } from 'react';

const useStateRef = <T>(
  defaultValue: T
): [T, (value: T) => void, RefObject<T>] => {
  const ref = useRef(defaultValue);
  const [state, setState] = useState(defaultValue);
  const stateSetter = (value: T) => {
    ref.current = value;
    setState(value);
  };

  return [state, stateSetter, ref];
};

export default useStateRef;
